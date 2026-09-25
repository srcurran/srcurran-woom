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
  vec4 r = texture2D(uTex, base + d * (1.0 + uDisp));
  vec4 g = texture2D(uTex, base + d);
  vec4 b = texture2D(uTex, base + d * (1.0 - uDisp));
  gl_FragColor = vec4(r.r, g.g, b.b, max(r.a, max(g.a, b.a)));
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

export interface LensSource {
  image: TexImageSource;
  width: number;
  height: number;
}

export interface LensHandle {
  refresh: () => void;
  wiggle: (delay?: number) => void;
}

export function mountLens(
  host: HTMLElement,
  canvas: HTMLCanvasElement,
  paint: (width: number, height: number) => LensSource | null,
  tuning: Partial<typeof LENS> = {},
): LensHandle | null {
  const lens = { ...LENS, ...tuning };
  const gl = canvas.getContext("webgl", { antialias: true, premultipliedAlpha: false });
  if (!gl) return null;

  const vs = compile(gl, gl.VERTEX_SHADER, VERT);
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) return null;
  const prog = gl.createProgram();
  if (!prog) return null;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
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
  gl.uniform1f(u("uFreq"), lens.freq);
  gl.uniform1f(u("uDisp"), lens.disp);
  gl.uniform1f(u("uAmp"), lens.amp);

  const state = { strength: 0, angle: lens.angle };
  const render = () => {
    gl.uniform1f(uStrength, state.strength / 50);
    gl.uniform1f(uAngle, state.angle);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };

  const setCover = (source: LensSource) => {
    const ia = source.width / source.height;
    const ca = canvas.width / canvas.height;
    let sx = 1;
    let sy = 1;
    if (ia > ca) sx = ca / ia;
    else sy = ia / ca;
    gl.uniform2f(uUvScale, sx, sy);
    gl.uniform2f(uUvOffset, (1 - sx) / 2, (1 - sy) / 2);
  };

  const refresh = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.round(canvas.clientWidth * dpr);
    const h = Math.round(canvas.clientHeight * dpr);
    if (!w || !h) return;
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    }
    const source = paint(w, h);
    if (!source) return;
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source.image);
    setCover(source);
    host.classList.add("is-shaded");
    render();
  };

  new ResizeObserver(refresh).observe(canvas);

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
  let wiggling: gsap.core.Timeline | null = null;
  const wiggle = (delay = 0) => {
    wiggling?.kill();
    wiggling = gsap
      .timeline({ delay, defaults: { ease: "sine.inOut" }, onUpdate: render })
      .to(state, { strength: 70, duration: 0.35, ease: "power2.out" }, 0)
      .to(state, { keyframes: { angle: [0.9, -0.9, 0.5, -0.3, lens.angle] }, duration: 1.4 }, 0)
      .to(state, { strength: 0, duration: 0.5, ease: "power2.inOut" }, 0.95);
  };

  host.addEventListener("pointermove", (e) => {
    wiggling?.kill();
    wiggling = null;
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
  host.addEventListener("pointerleave", () => {
    setStrength(0);
    setAngle(lens.angle);
  });

  return { refresh, wiggle };
}

function setup(figure: HTMLElement): void {
  const img = figure.querySelector("img");
  const canvas = figure.querySelector("canvas");
  if (!img || !canvas) return;

  const lens = mountLens(figure, canvas, () =>
    img.complete && img.naturalWidth
      ? { image: img, width: img.naturalWidth, height: img.naturalHeight }
      : null,
  );
  if (!lens) return;
  lens.refresh();
  img.addEventListener("load", lens.refresh, { once: true });
}

export function initLenticular(): void {
  document.querySelectorAll<HTMLElement>("[data-lenticular]").forEach(setup);
}
