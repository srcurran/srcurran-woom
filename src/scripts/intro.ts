/**
 * First-load intro — one timeline that settles the chrome and hero copy into
 * place instead of letting them pop in: the headline rises + fades, the bio
 * paragraphs follow in a gentle stagger, and the top nav + side nav ease in
 * (the side nav slides from the left rather than jumping into view).
 *
 * No-FOUC: a `.js` + motion-ok CSS guard (deck.css) hides the targets before
 * paint; this clears them as it animates. Reduced motion / no-JS shows
 * everything immediately (the guard never hides them), so we just bail.
 */
import { gsap } from "gsap";

const prefersReduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function initIntro(): void {
  if (prefersReduced()) return;

  const headline = document.querySelector<HTMLElement>(".hero__headline");
  const bio = gsap.utils.toArray<HTMLElement>(".hero__bio p");
  const header = document.querySelector<HTMLElement>(".site-header");
  const sideNav = document.querySelector<HTMLElement>("[data-side-nav]");

  const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.9 } });

  if (headline) {
    tl.fromTo(headline, { opacity: 0, y: 24 }, { opacity: 1, y: 0 }, 0);
  }
  if (bio.length) {
    tl.fromTo(
      bio,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, stagger: 0.12, duration: 0.8 },
      0.25,
    );
  }
  // The chrome eases in alongside the copy. clearProps drops the leftover
  // transform so it can't fight the side nav's CSS `translate` centring.
  if (header) {
    tl.fromTo(
      header,
      { opacity: 0, y: -12 },
      { opacity: 1, y: 0, duration: 0.8, clearProps: "transform" },
      0.15,
    );
  }
  if (sideNav) {
    tl.fromTo(
      sideNav,
      { opacity: 0, x: -16 },
      { opacity: 1, x: 0, duration: 0.8, clearProps: "transform" },
      0.35,
    );
  }
}
