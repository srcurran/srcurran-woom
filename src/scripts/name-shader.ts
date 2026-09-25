import { gsap } from "gsap";

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const FRAG = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uMask;
uniform float uTime;
uniform float uAspect;
uniform vec2 uPointer;
uniform vec3 uBase;
uniform vec3 uFlow;
uniform vec3 uSwirl;
uniform vec3 uGlint;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float sum = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 4; i++) {
    sum += amp * noise(p);
    p = p * 2.03 + vec2(1.7, 9.2);
    amp *= 0.5;
  }
  return sum;
}

void main() {
  float mask = texture2D(uMask, vUv).a;
  if (mask < 0.004) {
    gl_FragColor = vec4(0.0);
    return;
  }
  vec2 p = vec2(vUv.x * uAspect, vUv.y) * 1.4;
  vec2 lean = (uPointer - 0.5) * 0.6;
  vec2 q = vec2(
    fbm(p + lean + vec2(uTime * 0.11, 0.0)),
    fbm(p - lean + vec2(5.2, 1.3) - uTime * 0.08)
  );
  float f = fbm(p + 2.2 * q);
  vec3 col = mix(uBase, uFlow, smoothstep(0.25, 0.6, f));
  col = mix(col, uSwirl, smoothstep(0.45, 0.8, q.x) * 0.85);
  col = mix(col, uGlint, smoothstep(0.68, 0.9, f) * 0.6);
  gl_FragColor = vec4(col, mask);
}`;

const COLORS = {
  uBase: "--color-name-shader-base",
  uFlow: "--color-name-shader-flow",
  uSwirl: "--color-name-shader-swirl",
  uGlint: "--color-name-shader-glint",
} as const;

const prefersReduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.warn("[name-shader]", gl.getShaderInfoLog(sh));
    return null;
  }
  return sh;
}

function toRgb(probe: CanvasRenderingContext2D, color: string): [number, number, number] {
  probe.clearRect(0, 0, 1, 1);
  probe.fillStyle = color;
  probe.fillRect(0, 0, 1, 1);
  const [r, g, b] = probe.getImageData(0, 0, 1, 1).data;
  return [r / 255, g / 255, b / 255];
}

function setup(host: HTMLElement): void {
  const text = host.querySelector<HTMLElement>(".hero__name-text");
  const canvas = host.querySelector("canvas");
  if (!text || !canvas) return;

  const gl = canvas.getContext("webgl", { premultipliedAlpha: false });
  const maskCanvas = document.createElement("canvas");
  const mask = maskCanvas.getContext("2d");
  const probe = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
  if (!gl || !mask || !probe) return;

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

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(prog, "aPos");
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

  const u = (name: string) => gl.getUniformLocation(prog, name);
  const uTime = u("uTime");
  const uAspect = u("uAspect");
  const uPointer = u("uPointer");

  const style = getComputedStyle(host);
  for (const [uniform, token] of Object.entries(COLORS)) {
    gl.uniform3fv(u(uniform), toRgb(probe, style.getPropertyValue(token).trim()));
  }

  const pointer = { x: 0.5, y: 0.5 };
  const reduced = prefersReduced();
  let time = Math.random() * 100;

  const render = () => {
    gl.uniform1f(uTime, time);
    gl.uniform2f(uPointer, pointer.x, pointer.y);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };

  const drawMask = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.round(canvas.clientWidth * dpr);
    const h = Math.round(canvas.clientHeight * dpr);
    if (!w || !h) return false;

    maskCanvas.width = canvas.width = w;
    maskCanvas.height = canvas.height = h;
    gl.viewport(0, 0, w, h);

    const css = getComputedStyle(text);
    mask.font = `${css.fontStyle} ${css.fontWeight} ${css.fontSize} ${css.fontFamily}`;
    if ("letterSpacing" in mask) mask.letterSpacing = css.letterSpacing;
    mask.textBaseline = "alphabetic";

    const label = text.textContent ?? "";
    const { fontBoundingBoxAscent: ascent, fontBoundingBoxDescent: descent } =
      mask.measureText(label);
    const hostBox = host.getBoundingClientRect();
    const canvasBox = canvas.getBoundingClientRect();
    const baseline =
      hostBox.top - canvasBox.top + (hostBox.height - ascent - descent) / 2 + ascent;

    mask.clearRect(0, 0, w, h);
    mask.save();
    mask.scale(w / canvasBox.width, h / canvasBox.height);
    mask.fillText(label, hostBox.left - canvasBox.left, baseline);
    mask.restore();

    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, maskCanvas);
    gl.uniform1f(uAspect, w / h);
    return true;
  };

  const refresh = () => {
    if (!drawMask()) return;
    host.classList.add("is-shaded");
    render();
  };

  let visible = false;
  let frame = 0;
  let last = 0;
  const tick = (now: number) => {
    time += Math.min(now - last, 64) / 1000;
    last = now;
    render();
    frame = requestAnimationFrame(tick);
  };
  const play = () => {
    if (reduced || frame || !visible || document.hidden) return;
    last = performance.now();
    frame = requestAnimationFrame(tick);
  };
  const pause = () => {
    cancelAnimationFrame(frame);
    frame = 0;
  };

  document.fonts.ready.then(() => {
    refresh();
    new ResizeObserver(refresh).observe(host);
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) play();
      else pause();
    }).observe(host);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) pause();
      else play();
    });
  });

  if (reduced) return;
  const setX = gsap.quickTo(pointer, "x", { duration: 1.2, ease: "power3.out" });
  const setY = gsap.quickTo(pointer, "y", { duration: 1.2, ease: "power3.out" });
  window.addEventListener(
    "pointermove",
    (e) => {
      setX(e.clientX / window.innerWidth);
      setY(1 - e.clientY / window.innerHeight);
    },
    { passive: true },
  );
}

export function initNameShader(): void {
  document.querySelectorAll<HTMLElement>("[data-name-shader]").forEach(setup);
}
