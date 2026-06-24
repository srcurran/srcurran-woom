/** Top header: tint + hairline border once the page leaves the very top. */
export function initHeader(): void {
  const header = document.querySelector<HTMLElement>(".site-header");
  if (!header) return;

  // Desktop: tint once we've left the hero (~0.6vh). Mobile: tint almost
  // immediately — the tall hero copy scrolls up under the bar there, so it needs
  // a solid backdrop early to keep from colliding with the brand/contact.
  const update = () => {
    const threshold = window.innerWidth < 760 ? 8 : window.innerHeight * 0.6;
    header.classList.toggle("is-scrolled", window.scrollY > threshold);
  };
  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update, { passive: true });
}
