import { gsap } from "gsap";

const prefersReduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function initIntro(): void {
  if (prefersReduced()) return;
  if (!document.documentElement.classList.contains("play-intro")) return;

  const headline = document.querySelector<HTMLElement>("[data-hero] .hero__headline");
  const bio = gsap.utils.toArray<HTMLElement>("[data-hero] .hero__bio p");
  const header = document.querySelector<HTMLElement>(".site-header");
  const sideNav = document.querySelector<HTMLElement>("[data-side-nav]");

  const firstCard = document.querySelector<HTMLElement>('[data-card][data-index="0"]');

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

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

  tl.addLabel("card");
  if (firstCard) {
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
