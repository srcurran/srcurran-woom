/**
 * The deck — a vertical column of spaced cards. As a card rises it zooms in and
 * holds at full size; once its TOP crosses `exitStart` it animates OUT —
 * shrinking, rotating, sliding, and dimming (via a scrim) to hand focus to the
 * card below. Native CSS scroll-snap (deck.css) makes the deck sticky.
 *
 * Tunables live in STACK below, split into symmetric enter/exit groups.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// All thresholds are the card TOP's position as a fraction of the viewport
// height (1 = bottom edge, 0 = top edge). Each enter/exit value is the amount
// at the far end of that phase (start of enter / end of exit); it eases to the
// neutral centred state (scale 1, no rotation/offset/dim).
const STACK = {
  // --- Enter: rising from the bottom into the centre ---
  // Enter TIMING is derived at runtime, not set here: the enter window = the exit
  // window shifted by the card-to-card spacing (see `spacing` in initDeck). Since
  // adjacent cards sit exactly `spacing` apart, this makes an incoming card GROW
  // into the centre over the same scroll span its predecessor SHRINKS off the top
  // — a balanced hand-off, so neither card resolves first to grab the eye, on any
  // viewport. (A fixed window can't: spacing changes with the vh-clamped gap.)
  // Tune the timing via the exit window below; these are just the enter MAGNITUDES:
  enterRot: 6, // deg, eases to 0 at centre
  enterScale: 0.85, // grows to 1 at centre
  enterParallax: 12, // % inner-media drift, eases to 0 at centre
  enterDim: 0, // scrim coverage on the way in
  enterX: 0, // horizontal offset on the way in (fraction of vw)

  // --- Exit: scrolling off the top ---
  exitStart: 0.1, // exit begins when the top hits this fraction
  exitEnd: -0.3, // exit completes by this fraction
  exitRot: -3, // deg at full exit
  exitScale: 0.85, // shrinks to this at full exit
  exitParallax: -12, // % inner-media drift at full exit
  exitDim: 0.55, // scrim coverage at full exit (a mix, not opacity)
  exitX: 0.08, // horizontal slide at full exit (fraction of vw, + = right)
};

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

const prefersReduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function initDeck(): void {
  const deck = document.querySelector<HTMLElement>("[data-deck]");
  const viewport = document.querySelector<HTMLElement>("[data-deck-viewport]");
  if (!deck || !viewport) return;

  const cards = Array.from(viewport.querySelectorAll<HTMLElement>("[data-card]"));
  if (cards.length === 0) return;

  const navLinks = Array.from(
    document.querySelectorAll<HTMLAnchorElement>("[data-nav-link]"),
  );
  const indicator = document.querySelector<HTMLElement>("[data-nav-indicator]");
  const sideNav = document.querySelector<HTMLElement>("[data-side-nav]");

  viewport.classList.add("is-ready");

  // Card-to-card spacing in viewport heights (card height + the deck gap). The
  // enter window is derived from this so each card grows in over the SAME scroll
  // span its predecessor exits — a balanced hand-off (see STACK). Recomputed on
  // resize since it tracks both the card height and the vh-clamped gap.
  let spacing = 0.6;
  const computeSpacing = () => {
    if (cards.length > 1) {
      spacing = (cards[1].offsetTop - cards[0].offsetTop) / window.innerHeight;
    }
  };
  computeSpacing();
  window.addEventListener("resize", computeSpacing);

  // Animate at every width — the centred + scaled active card (with dimmed,
  // shrunk neighbours) is exactly what makes the deck legible on mobile too. It
  // falls back to a plain static list only when the user prefers reduced motion.
  const animate = !prefersReduced();

  if (animate) {
    for (const card of cards) {
      const inner = card.querySelector<HTMLElement>("[data-parallax]");
      const aperture = card.querySelector<HTMLElement>("[data-aperture]");
      gsap.set(card, { transformOrigin: "center center" });
      if (aperture) gsap.set(aperture, { transformOrigin: "center center" });

      ScrollTrigger.create({
        trigger: card,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const vh = window.innerHeight;
          const h = card.offsetHeight / vh; // untransformed height, no feedback
          // The card TOP's position as a fraction of viewport height, derived
          // from scroll progress (not the live rect, to avoid transform feedback).
          const top = 1 - self.progress * (1 + h);

          // Enter window = exit window shifted by the card spacing, so each card
          // enters in lockstep with its predecessor's exit. BUT a centred card
          // must read as flat — `inT` has to reach 1 by the centred top. When
          // cards are short relative to the viewport (mobile), the lockstep
          // `enterDone` lands BELOW centre, so the active card never flattens
          // (stays tilted + scaled); clamp `enterDone` up to the centred top and
          // keep the enter span equal to the exit span. exit 0→1 as the top
          // crosses `exitStart` toward `exitEnd`.
          const flatTop = 0.5 - h / 2; // card TOP fraction when centred
          const enterDone = Math.max(STACK.exitEnd + spacing, flatTop);
          const enterStart = enterDone + (STACK.exitStart - STACK.exitEnd);
          const inT = clamp((enterStart - top) / (enterStart - enterDone), 0, 1);
          const outT = clamp(
            (STACK.exitStart - top) / (STACK.exitStart - STACK.exitEnd),
            0,
            1,
          );

          // Scale: enterScale → 1 (enter), then 1 → exitScale (exit shrink).
          const enterPart = STACK.enterScale + (1 - STACK.enterScale) * inT;
          const scale = enterPart - (1 - STACK.exitScale) * outT;
          const rotation = STACK.enterRot * (1 - inT) + STACK.exitRot * outT;
          const x =
            (STACK.enterX * (1 - inT) + STACK.exitX * outT) * window.innerWidth;
          const dim = STACK.enterDim * (1 - inT) + STACK.exitDim * outT;
          const drift = STACK.enterParallax * (1 - inT) + STACK.exitParallax * outT;

          gsap.set(card, { scale, rotation, x, "--dim": dim });
          if (inner) gsap.set(inner, { yPercent: drift });
          // Aperture: counter ONLY the enter zoom so mockup content holds a fixed
          // size on the way in; on exit it shrinks with the card.
          if (aperture) gsap.set(aperture, { scale: 1 / enterPart });
        },
      });
    }
  }

  // Active section: About while we're still up in the hero, otherwise the card
  // nearest the viewport centre.
  let lastSection = "";
  const setActive = (section: string) => {
    if (!section) return;
    // Toggle collapsed/visible FIRST: on mobile the nav is display:none on About,
    // so the indicator must be positioned AFTER the nav is shown — otherwise
    // offsetTop reads 0 and the bar lands at the top, overlapping a tick.
    sideNav?.classList.toggle("is-collapsed", section !== "about");
    if (section !== lastSection) {
      lastSection = section;
      setActiveNav(section, navLinks, indicator);
    }
  };
  // Document-absolute, untransformed top (avoids transform feedback).
  const absTop = (el: HTMLElement): number => {
    let y = 0;
    for (let n: HTMLElement | null = el; n; n = n.offsetParent as HTMLElement | null) {
      y += n.offsetTop;
    }
    return y;
  };
  // Scroll position (px) that centres a card (its centre at 50vh).
  const snapScrollFor = (card: HTMLElement): number =>
    absTop(card) + card.offsetHeight / 2 - 0.5 * window.innerHeight;

  // Active section = the snap point nearest the current scroll. Candidates are
  // the hero (scroll 0 → "about") and each card's centred position. Mandatory
  // snap means we only ever REST on one of these, so "nearest" is the section in
  // focus — and it flips off About the instant the first card's snap is closer
  // than the hero's, which is what makes the nav collapse promptly.
  const updateActive = () => {
    const sy = window.scrollY;
    let bestDist = sy; // distance to the hero snap (scroll 0)
    let section = "about";
    for (const card of cards) {
      const dist = Math.abs(sy - snapScrollFor(card));
      if (dist < bestDist) {
        bestDist = dist;
        section = card.dataset.section ?? "";
      }
    }
    setActive(section);
  };

  // Stickiness comes from native CSS scroll-snap; we just track scroll to keep
  // the active-nav state in sync. A plain scroll listener is more reliable here
  // than a ScrollTrigger, which can miss the discrete jumps mandatory snap makes.
  window.addEventListener("scroll", updateActive, { passive: true });
  updateActive();

  // Nav click → glide there. Mandatory scroll-snap would fight a smooth
  // programmatic scroll, so suspend it for the duration of the glide.
  const root = document.documentElement;
  const glideTo = (y: number) => {
    root.style.scrollSnapType = "none";
    gsap.to(window, {
      scrollTo: y,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => root.style.removeProperty("scroll-snap-type"),
    });
  };
  for (const link of navLinks) {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const id = link.dataset.navLink;
      if (id === "about") {
        glideTo(0);
        return;
      }
      const target = cards.find((c) => c.dataset.section === id);
      if (target) glideTo(snapScrollFor(target));
    });
  }

  // Hovering the nav itself brings the collapsed labels back up — only the nav,
  // not the deck (hovering a card shouldn't reveal it).
  if (sideNav) {
    sideNav.addEventListener("pointerenter", () => sideNav.classList.add("is-revealed"));
    sideNav.addEventListener("pointerleave", () => sideNav.classList.remove("is-revealed"));
  }

  ScrollTrigger.refresh();
}

function setActiveNav(
  sectionId: string,
  links: HTMLAnchorElement[],
  indicator: HTMLElement | null,
): void {
  let active: HTMLElement | undefined;
  for (const link of links) {
    const on = link.dataset.navLink === sectionId;
    link.classList.toggle("is-active", on);
    if (on) active = link;
  }
  if (!active || !indicator) return;

  const mid = active.offsetTop + active.offsetHeight / 2 - indicator.offsetHeight / 2;
  indicator.style.transform = `translateY(${mid}px)`;
  indicator.classList.add("is-visible");
}
