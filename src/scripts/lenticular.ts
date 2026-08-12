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
uniform float uStrength;   // 0..2 (0 at the edges, peaks dead-centre)
uniform float uFreq;       // lens strips along the axis
uniform float uAngle;      // lens angle in radians (cursor X: +π/2 left .. 0 centre .. −π/2 right)
uniform float uDisp;       // chromatic dispersion 0..1
uniform float uAmp;        // base displacement amplitude
uniform vec2  uUvScale;    // object-fit: cover transform
uniform vec2  uUvOffset;
void main() {
  vec2 base = vUv * uUvScale + uUvOffset;
  vec2 dir = vec2(cos(uAngle), sin(uAngle));
  float t = dot(vUv - 0.5, dir);
  float wave = sin(t * uFreq * 6.28318530718);
  vec2 d = dir * wave * uStrength * uAmp;
  float r = texture2D(uTex, base + d * (1.0 + uDisp)).r;
  float g = texture2D(uTex, base + d).g;
  float b = texture2D(uTex, base + d * (1.0 - uDisp)).b;
  gl_FragColor = vec4(r, g, b, 1.0);
}`;

const LENS = { freq: 3, angle: 0, disp: .1, amp: .1 };

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
  if (!gl) return;

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

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(
    gl.ARRAY_BUFFER,

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
  const uAngle = u("uAngle");
  const uUvScale = u("uUvScale");
  const uUvOffset = u("uUvOffset");
  gl.uniform1f(u("uFreq"), LENS.freq);
  gl.uniform1f(u("uDisp"), LENS.disp);
  gl.uniform1f(u("uAmp"), LENS.amp);

  const state = { strength: 0, angle: LENS.angle };
  const render = () => {
    gl.uniform1f(uStrength, state.strength / 50);
    gl.uniform1f(uAngle, state.angle);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };

  const setCover = () => {
    const ia = img.naturalWidth / img.naturalHeight;
    const ca = canvas.width / canvas.height;
    let sx = 1;
    let sy = 1;
    if (ia > ca) sx = ca / ia;
    else sy = ia / ca;
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
    figure.classList.add("is-shaded");
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
  const setAngle = gsap.quickTo(state, "angle", {
    duration: 0.3,
    ease: "power2.out",
    onUpdate: render,
  });
  figure.addEventListener("pointermove", (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const cx = Math.min(1, Math.max(0, x));
    const cy = Math.min(1, Math.max(0, y));
    const fx = 1 - Math.abs(cx * 2 - 1);
    const fy = 1 - Math.abs(cy * 2 - 1);
    setStrength(fx * fy * 100);
    setAngle((0.5 - cx) * Math.PI);
  });
  figure.addEventListener("pointerleave", () => {
    setStrength(0);
    setAngle(LENS.angle);
  });
}

export function initLenticular(): void {
  document.querySelectorAll<HTMLElement>("[data-lenticular]").forEach(setup);
}
