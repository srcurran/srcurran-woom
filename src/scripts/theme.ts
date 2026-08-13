const FADE = { from: 0.82, to: 0.1 };
const STEPS = 60;

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

const ramp = (distance: number, from: number, to: number): number => {
  const t = clamp((from - distance) / (from - to), 0, 1);
  return Math.round(t * t * (3 - 2 * t) * STEPS) / STEPS;
};

export function initTheme(): void {
  const deck = document.querySelector<HTMLElement>("[data-deck]");
  if (!deck) return;

  const contact = document.querySelector<HTMLElement>("#contact");
  const root = document.documentElement;

  let lastDeck = -1;
  let lastClose = -1;
  const update = () => {
    const vh = window.innerHeight;
    const from = FADE.from * vh;
    const to = FADE.to * vh;
    const onDeck = ramp(deck.getBoundingClientRect().top, from, to);
    const onClose = contact
      ? ramp(contact.getBoundingClientRect().top, from, to)
      : 0;

    if (onDeck === lastDeck && onClose === lastClose) return;
    lastDeck = onDeck;
    lastClose = onClose;
    root.style.setProperty("--theme-deck", String(onDeck));
    root.style.setProperty("--theme-close", String(onClose));
  };

  let queued = false;
  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      update();
    });
  };

  update();
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
}
