/**
 * Lenticular cursor shader — renders an image through a WebGL fragment shader
 * that refracts it across angled "lens" strips with chromatic dispersion. The
 * distortion STRENGTH tracks the cursor's X over the image: left edge = -50,
 * centre = 0, right edge = +50 (eased via GSAP). Falls back to the plain <img>
 * if WebGL is unavailable or the image hasn't loaded.
 *
 * Markup: <figure data-lenticular><img …/><canvas/></figure>. The canvas mirrors
 * the <img>'s object-fit: cover via a UV transform, so it lines up exactly.
 */
import { gsap } from "gsap";

const VERT = `
attribute vec2 aPos;
attribute vec2 aUv;
varying vec2 vUv;
void main() {
  vUv = aUv;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const FRAG = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uTex;
uniform float uStrength;   // -1..1 (cursor X mapped from -50..50)
uniform float uFreq;       // lens strips along the axis
uniform float uAngle;      // lens angle (radians)
uniform float uDisp;       // chromatic dispersion 0..1
uniform float uAmp;        // base displacement amplitude
uniform vec2  uUvScale;    // object-fit: cover transform
uniform vec2  uUvOffset;
void main() {
  vec2 base = vUv * uUvScale + uUvOffset;          // cover crop
  vec2 dir = vec2(cos(uAngle), sin(uAngle));        // lens axis
  float t = dot(vUv - 0.5, dir);                    // position along the axis
  float wave = sin(t * uFreq * 6.28318530718);      // lens slope (wavy refraction)
  vec2 d = dir * wave * uStrength * uAmp;            // displacement, scaled by strength
  float r = texture2D(uTex, base + d * (1.0 + uDisp)).r;
  float g = texture2D(uTex, base + d).g;
  float b = texture2D(uTex, base + d * (1.0 - uDisp)).b;
  gl_FragColor = vec4(r, g, b, 1.0);
}`;

// The lens look — tweak freely.
const LENS = { freq: 14, angle: Math.PI / 4, disp: 0.35, amp: 0.06 };

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.warn("[lenticular]", gl.getShaderInfoLog(sh));
    return null;
  }
  return sh;
}

function setup(figure: HTMLElement): void {
  const img = figure.querySelector("img");
  const canvas = figure.querySelector("canvas");
  if (!img || !canvas) return;

  const gl = canvas.getContext("webgl", { antialias: true, premultipliedAlpha: false });
  if (!gl) return; // graceful fallback: the <img> shows

  const vs = compile(gl, gl.VERTEX_SHADER, VERT);
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) return;
  const prog = gl.createProgram();
  if (!prog) return;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
  gl.useProgram(prog);

  // Fullscreen quad (triangle strip): x, y, u, v interleaved.
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    // prettier-ignore
    new Float32Array([
      -1, -1, 0, 0,
       1, -1, 1, 0,
      -1,  1, 0, 1,
       1,  1, 1, 1,
    ]),
    gl.STATIC_DRAW,
  );
  const aPos = gl.getAttribLocation(prog, "aPos");
  const aUv = gl.getAttribLocation(prog, "aUv");
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 16, 0);
  gl.enableVertexAttribArray(aUv);
  gl.vertexAttribPointer(aUv, 2, gl.FLOAT, false, 16, 8);

  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

  const u = (name: string) => gl.getUniformLocation(prog, name);
  const uStrength = u("uStrength");
  const uUvScale = u("uUvScale");
  const uUvOffset = u("uUvOffset");
  gl.uniform1f(u("uFreq"), LENS.freq);
  gl.uniform1f(u("uAngle"), LENS.angle);
  gl.uniform1f(u("uDisp"), LENS.disp);
  gl.uniform1f(u("uAmp"), LENS.amp);

  const state = { strength: 0 };
  const render = () => {
    gl.uniform1f(uStrength, state.strength / 50);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };

  // Match the <img>'s object-fit: cover by cropping the texture's UVs.
  const setCover = () => {
    const ia = img.naturalWidth / img.naturalHeight;
    const ca = canvas.width / canvas.height;
    let sx = 1;
    let sy = 1;
    if (ia > ca) sx = ca / ia; // image wider than box → crop sides
    else sy = ia / ca; //          image taller than box → crop top/bottom
    gl.uniform2f(uUvScale, sx, sy);
    gl.uniform2f(uUvOffset, (1 - sx) / 2, (1 - sy) / 2);
  };

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.round(canvas.clientWidth * dpr);
    const h = Math.round(canvas.clientHeight * dpr);
    if (!w || !h) return;
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    }
    setCover();
    render();
  };

  const start = () => {
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    figure.classList.add("is-shaded"); // CSS fades the canvas in over the <img>
    resize();
  };

  if (img.complete && img.naturalWidth) start();
  else img.addEventListener("load", start, { once: true });
  new ResizeObserver(resize).observe(canvas);

  const setStrength = gsap.quickTo(state, "strength", {
    duration: 0.3,
    ease: "power2.out",
    onUpdate: render,
  });
  figure.addEventListener("pointermove", (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0 (left) .. 1 (right)
    setStrength(Math.min(1, Math.max(0, x)) * 100 - 50); // -50 .. 50
  });
  figure.addEventListener("pointerleave", () => setStrength(0));
}

export function initLenticular(): void {
  document.querySelectorAll<HTMLElement>("[data-lenticular]").forEach(setup);
}
