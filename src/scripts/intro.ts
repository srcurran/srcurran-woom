/**
 * First-load intro — one timeline staged in three beats so the page assembles
 * itself instead of popping in all at once:
 *   1. the hero copy (headline + bio paragraphs) rises + fades in;
 *   2. once it has settled, the top nav + side nav ease in;
 *   3. then the first deck card pokes up from the bottom of the viewport.
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

  // Scope to the top hero only ([data-hero]) — the contact closer reuses the
  // same .hero classes but should not be animated/hidden on first load.
  const headline = document.querySelector<HTMLElement>("[data-hero] .hero__headline");
  const bio = gsap.utils.toArray<HTMLElement>("[data-hero] .hero__bio p");
  const header = document.querySelector<HTMLElement>(".site-header");
  const sideNav = document.querySelector<HTMLElement>("[data-side-nav]");
  // The first deck card peeking under the hero. Opacity only — its transform is
  // owned by the per-card ScrollTrigger, so we never touch it here.
  const firstCard = document.querySelector<HTMLElement>('[data-card][data-index="0"]');

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  // --- Beat 1: the hero copy comes in first. ---
  if (headline) {
    tl.fromTo(headline, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7 }, 0);
  }
  if (bio.length) {
    tl.fromTo(
      bio,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, stagger: 0.07, duration: 0.5 },
      0.12,
    );
  }

  // --- Beat 2: once the copy has settled, the top + side nav ease in. ---
  tl.addLabel("navs");
  if (header) {
    tl.fromTo(
      header,
      { opacity: 0, y: -12 },
      { opacity: 1, y: 0, duration: 0.6, clearProps: "transform" },
      "navs",
    );
  }
  if (sideNav) {
    tl.fromTo(
      sideNav,
      { opacity: 0, x: -16 },
      { opacity: 1, x: 0, duration: 0.6, clearProps: "transform" },
      "navs+=0.08",
    );
  }

  // --- Beat 3: with the nav in, the first card pokes up from the bottom. ---
  // Rise (y) + fade only — its scale/rotation/x are owned by the per-card
  // ScrollTrigger, which never touches y, so the two compose without fighting.
  tl.addLabel("card");
  if (firstCard) {
    // Enter like a bottom-of-deck card: rise + settle rotation/scale, not a flat
    // slide. `from` with RELATIVE rotation/scale auto-targets whatever transform
    // the per-card ScrollTrigger already holds the card at (its scroll-0 enter
    // state), so it lands exactly there and hands off without a jump.
    // immediateRender:false defers reading that until beat 3 — after the deck has
    // initialised. Opacity is a separate fromTo (the CSS guard pins it at 0, so
    // `from` couldn't fade it). y ≈ the resting peek, so it rises from the fold.
    tl.from(
      firstCard,
      { y: 120, rotation: "+=6", scale: "-=0.1", duration: 0.7, immediateRender: false },
      "card",
    ).fromTo(
      firstCard,
      { opacity: 0 },
      { opacity: 1, duration: 0.7, immediateRender: false },
      "card",
    );
  }
}
