const PHONE_MAX = 760;

export function initHeader(): void {
  const header = document.querySelector<HTMLElement>(".site-header");
  if (!header) return;

  const update = () => {
    const threshold = window.innerWidth <= PHONE_MAX ? 8 : window.innerHeight * 0.6;
    header.classList.toggle("is-scrolled", window.scrollY > threshold);
  };
  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update, { passive: true });
}
