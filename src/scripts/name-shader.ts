import { mountLens } from "./lenticular";

const TEXT_LENS = { amp: 0.02 };
const WIGGLE_DELAY = 0.6;

const greetsWithWiggle = () =>
  document.documentElement.classList.contains("play-intro") &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setup(host: HTMLElement): void {
  const text = host.querySelector<HTMLElement>(".hero__name-text");
  const canvas = host.querySelector("canvas");
  const plate = document.createElement("canvas");
  const ctx = plate.getContext("2d");
  if (!text || !canvas || !ctx) return;

  const paint = (width: number, height: number) => {
    plate.width = width;
    plate.height = height;

    const css = getComputedStyle(text);
    ctx.font = `${css.fontStyle} ${css.fontWeight} ${css.fontSize} ${css.fontFamily}`;
    if ("letterSpacing" in ctx) ctx.letterSpacing = css.letterSpacing;
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = getComputedStyle(host).color;

    const label = text.textContent ?? "";
    const { fontBoundingBoxAscent: ascent, fontBoundingBoxDescent: descent } =
      ctx.measureText(label);
    const hostBox = host.getBoundingClientRect();
    const canvasBox = canvas.getBoundingClientRect();
    const baseline =
      hostBox.top - canvasBox.top + (hostBox.height - ascent - descent) / 2 + ascent;

    ctx.scale(width / canvasBox.width, height / canvasBox.height);
    ctx.fillText(label, hostBox.left - canvasBox.left, baseline);
    return { image: plate, width, height };
  };

  document.fonts.ready.then(() => {
    const lens = mountLens(host, canvas, paint, TEXT_LENS);
    if (!lens) return;
    lens.refresh();
    if (greetsWithWiggle()) lens.wiggle(WIGGLE_DELAY);
  });
}

export function initNameShader(): void {
  document.querySelectorAll<HTMLElement>("[data-name-shader]").forEach(setup);
}
