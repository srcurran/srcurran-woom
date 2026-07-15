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
  // Tune the timing via the exit window below. Rotate / scale / translate are now
  // randomised PER CARD (see RANDOM); these are the shared enter magnitudes:
  enterParallax: 12, // % inner-media drift, eases to 0 at centre
  enterDim: 0, // scrim coverage on the way in

  // --- Exit: scrolling off the top ---
  exitStart: 0.1, // exit begins when the top hits this fraction
  exitEnd: -0.3, // exit completes by this fraction
  exitParallax: -12, // % inner-media drift at full exit
  exitDim: 0.55, // scrim coverage at full exit (a mix, not opacity)
};

// Per-card jitter — each card gets its OWN random rotate / translate / scale for
// its slide-in and slide-off, so the deck reads as hand-placed rather than
// mechanical. Edit the ranges to taste; regenerated fresh on every load.
const RANDOM = {
  rotate: [1, 2.5] as const, // deg magnitude (sign randomised per card)
  translate: [25, 75] as const, // px magnitude (sign randomised per card)
  scale: [0.875, 0.925] as const, // enter/exit scale (1 = flat at centre)
};
const rand = (min: number, max: number) => min + Math.random() * (max - min);
const randSigned = (min: number, max: number) =>
  rand(min, max) * (Math.random() < 0.5 ? -1 : 1);
const makeJitter = () => ({
  enterRot: randSigned(...RANDOM.rotate),
  exitRot: randSigned(...RANDOM.rotate),
  enterX: randSigned(...RANDOM.translate),
  exitX: randSigned(...RANDOM.translate),
  enterScale: rand(...RANDOM.scale),
  exitScale: rand(...RANDOM.scale),
});

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

const prefersReduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function initDeck(): void {
  const deck = document.querySelector<HTMLElement>("[data-deck]");
  const viewport = document.querySelector<HTMLElement>("[data-deck-viewport]");
  if (!deck || !viewport) return;

  // Home deck ([data-shuffle-after]): reorder the cards on each load so repeat
  // visitors get a fresh sequence. The leading block — the "Latest Work" opener
  // (data-index 0, which owns the first-load intro and reads as the header) plus
  // the anchored slides after it — is pinned; its size is the attribute value, so
  // only cards from that index onward are Fisher–Yates shuffled. Done before
  // `cards` is read (and before any ScrollTrigger wiring) so the rest of initDeck
  // sees final DOM order; the shuffled cards live below the fold, so the reorder
  // is never seen.
  if (viewport.dataset.shuffleAfter !== undefined) {
    const pin = Number(viewport.dataset.shuffleAfter) || 0;
    const rest = Array.from(
      viewport.querySelectorAll<HTMLElement>("[data-card]"),
    ).filter((c) => Number(c.dataset.index) >= pin);
    for (let i = rest.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [rest[i], rest[j]] = [rest[j], rest[i]];
    }
    for (const c of rest) viewport.appendChild(c);
  }

  const cards = Array.from(viewport.querySelectorAll<HTMLElement>("[data-card]"));
  if (cards.length === 0) return;

  const navLinks = Array.from(
    document.querySelectorAll<HTMLAnchorElement>("[data-nav-link]"),
  );
  const sideNav = document.querySelector<HTMLElement>("[data-side-nav]");
  // The contact closer — a hero-shell section at the very bottom, not a deck
  // card, so the scroll-spy + nav-click handlers below treat it as a special case.
  const contact = document.querySelector<HTMLElement>("#contact");

  // Deep-link target (e.g. /work#ohsee), captured now — before the scroll-spy
  // rewrites the hash to the focused section — and applied once the card
  // positions are known (end of initDeck).
  const initialHash = location.hash.slice(1);

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

  // The coverflow is a desktop experience: on tablet/phone (<= 960px) — and when
  // the user prefers reduced motion — the deck falls back to a plain static list
  // (no per-card transforms, no snap; see responsive.css). Scroll-driven scrubbed
  // transforms feel janky under touch, and a tight static stack reads cleaner.
  const animate = !prefersReduced() && window.innerWidth > 960;
  // The decision is made once here, so crossing the breakpoint needs a reload to
  // re-wire (or tear down) the per-card ScrollTriggers.
  window
    .matchMedia("(min-width: 961px)")
    .addEventListener("change", () => location.reload());

  if (animate) {
    for (const card of cards) {
      const inner = card.querySelector<HTMLElement>("[data-parallax]");
      const aperture = card.querySelector<HTMLElement>("[data-aperture]");
      const j = makeJitter(); // this card's random enter/exit rotate, x, scale
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
          // Rotate / scale / translate use this card's jitter; all resolve to
          // 0 / 1 / 0 at centre (multiplied by 1-inT or outT) so the centred card
          // stays flat regardless of its random values.
          const enterPart = j.enterScale + (1 - j.enterScale) * inT;
          const scale = enterPart - (1 - j.exitScale) * outT;
          const rotation = j.enterRot * (1 - inT) + j.exitRot * outT;
          const x = j.enterX * (1 - inT) + j.exitX * outT; // px, per-card
          const dim = STACK.enterDim * (1 - inT) + STACK.exitDim * outT;
          const drift = STACK.enterParallax * (1 - inT) + STACK.exitParallax * outT;
          // Focus: 1 when centred (primary), → 0 as the card enters/exits. Drives
          // --elev-k so a receding card's shadow eases down. Quantised to 0.01 so
          // the box-shadow repaint is skipped on frames where it wouldn't change.
          const focus = Math.round(inT * (1 - outT) * 100) / 100;

          gsap.set(card, { scale, rotation, x, "--dim": dim, "--focus": focus });
          if (inner) gsap.set(inner, { yPercent: drift });
          // Aperture: counter the FULL card scale so the content holds a fixed
          // size while the frame opens (enter) AND closes (exit) around it — the
          // card is the window, the content stays put both ways.
          if (aperture) gsap.set(aperture, { scale: 1 / scale });
        },
      });
    }
  }

  // Active section: About while we're still up in the hero, otherwise the card
  // nearest the viewport centre. The nav only shows when the centred content
  // leaves a wide enough left gutter for it. The content/card width grows with
  // viewport HEIGHT (--container-max → 54svh·16/9), so a tall window crowds the
  // nav even on a wide screen — width breakpoints can't capture that. Instead we
  // measure the gutter directly (the shared container's left edge) and:
  //  • gutter < RAIL_GUTTER  → hidden entirely (no room for even the dash rail).
  //  • on About, gutter ≥ LABEL_GUTTER → full labels; otherwise the slim rail.
  //  • in the deck → always the slim rail (when shown at all).
  const RAIL_GUTTER = 64; // px of clearance the edge-hugging dash rail needs
  const LABEL_GUTTER = 180; // px of clearance the expanded labels need
  const heroInner = document.querySelector<HTMLElement>(".hero__inner");
  let gutter = window.innerWidth;
  const measureGutter = () => {
    gutter = heroInner ? heroInner.getBoundingClientRect().left : window.innerWidth;
  };
  measureGutter();
  let lastSection = "";
  const syncNav = () => {
    if (!sideNav) return;
    const onAbout = lastSection === "about";
    sideNav.classList.toggle("is-hidden", gutter < RAIL_GUTTER);
    sideNav.classList.toggle("is-about", onAbout);
    sideNav.classList.toggle("is-collapsed", !onAbout || gutter < LABEL_GUTTER);
  };
  const setActive = (section: string) => {
    if (!section) return;
    if (section !== lastSection) {
      lastSection = section;
      setActiveNav(section, navLinks);
      document.dispatchEvent(
        new CustomEvent("section:change", { detail: { section } }),
      );
      // Keep the URL in sync so any project is directly linkable (replaceState
      // updates the address bar without scrolling or adding history entries).
      // About is the top of the page, so it clears back to a bare /work.
      const url = section === "about" ? location.pathname + location.search : `#${section}`;
      history.replaceState(null, "", url);
    }
    syncNav();
  };
  // Re-evaluate the gutter-dependent mode on resize (the container width tracks
  // both viewport width and height, so re-measure before syncing).
  window.addEventListener("resize", () => {
    measureGutter();
    syncNav();
  }, { passive: true });
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
    // Contact closer (centred like the hero, but it's a section not a card).
    if (contact) {
      const dist = Math.abs(sy - snapScrollFor(contact));
      if (dist < bestDist) {
        bestDist = dist;
        section = "contact";
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
  // Hover devices reveal the collapsed rail's labels on hover. Touch can't hover
  // reliably (a tap fires hover + click at once), so there the rail is tap-to-open:
  // the first tap reveals the labels, the next tap on a link navigates, and a tap
  // anywhere else collapses it again.
  const canHover = window.matchMedia("(hover: hover)").matches;

  for (const link of navLinks) {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      // Touch: the first tap only opens the rail — don't navigate until revealed.
      if (!canHover && sideNav && !sideNav.classList.contains("is-revealed")) {
        sideNav.classList.add("is-revealed");
        return;
      }
      const id = link.dataset.navLink;
      let y: number | null = null;
      if (id === "about") y = 0;
      else if (id === "contact") y = contact ? snapScrollFor(contact) : null;
      else {
        const target = cards.find((c) => c.dataset.section === id);
        y = target ? snapScrollFor(target) : null;
      }
      if (y !== null) glideTo(y);
      if (!canHover) sideNav?.classList.remove("is-revealed"); // collapse after the jump
    });
  }

  if (sideNav && canHover) {
    // Hover-reveal (desktop) — only the nav, not the deck (hovering a card
    // shouldn't reveal it).
    sideNav.addEventListener("pointerenter", () => sideNav.classList.add("is-revealed"));
    sideNav.addEventListener("pointerleave", () => sideNav.classList.remove("is-revealed"));
  } else if (sideNav) {
    // Touch: a tap outside the rail collapses it again.
    document.addEventListener("click", (e) => {
      if (!sideNav.contains(e.target as Node)) sideNav.classList.remove("is-revealed");
    });
  }

  // --- Keyboard navigation -------------------------------------------------
  // Up/Down → previous/next SLIDE; Left/Right → previous/next PROJECT. Both reuse
  // the same centred-scroll glide as a nav click. Slides step through the full
  // sequence (hero, every card, contact) by the snap point nearest the current
  // scroll; projects step section-to-section from the active section, landing on
  // each project's intro card — with the hero + contact closer as the end stops.
  const slideYs = (): number[] => {
    const ys = [0, ...cards.map((c) => snapScrollFor(c))];
    if (contact) ys.push(snapScrollFor(contact));
    return ys;
  };
  const projectKeys = (): string[] => {
    const keys = ["about"];
    const seen = new Set<string>();
    for (const c of cards) {
      const s = c.dataset.section ?? "";
      if (s && !seen.has(s)) {
        seen.add(s);
        keys.push(s);
      }
    }
    if (contact) keys.push("contact");
    return keys;
  };
  const yForKey = (key: string): number => {
    if (key === "about") return 0;
    if (key === "contact") return contact ? snapScrollFor(contact) : 0;
    const c = cards.find((card) => card.dataset.section === key);
    return c ? snapScrollFor(c) : 0;
  };
  const stepSlide = (dir: number) => {
    const ys = slideYs();
    const sy = window.scrollY;
    let i = 0;
    let best = Infinity;
    ys.forEach((y, idx) => {
      const d = Math.abs(sy - y);
      if (d < best) {
        best = d;
        i = idx;
      }
    });
    const next = Math.min(ys.length - 1, Math.max(0, i + dir));
    if (next !== i) glideTo(ys[next]);
  };
  const stepProject = (dir: number) => {
    const keys = projectKeys();
    let i = keys.indexOf(lastSection);
    if (i === -1) i = 0;
    const next = Math.min(keys.length - 1, Math.max(0, i + dir));
    if (next !== i) glideTo(yForKey(keys[next]));
  };
  window.addEventListener("keydown", (event) => {
    // Discrete presses only; let shortcuts (⌘/Ctrl/Alt) and typing through.
    if (event.repeat || event.metaKey || event.ctrlKey || event.altKey) return;
    const t = event.target as HTMLElement | null;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
    if (document.querySelector(".contact-menu:popover-open")) return; // don't hijack the open menu
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        stepSlide(1);
        break;
      case "ArrowUp":
        event.preventDefault();
        stepSlide(-1);
        break;
      case "ArrowRight":
        event.preventDefault();
        stepProject(1);
        break;
      case "ArrowLeft":
        event.preventDefault();
        stepProject(-1);
        break;
    }
  });

  ScrollTrigger.refresh();

  // Deep link: /work#ohsee (or any project / #contact) lands directly on that
  // section on load. Positions are known now that the deck has laid out and
  // refreshed. `about` is the top, so nothing to do there. Instant jump to the
  // section's snap point; the scroll-spy then syncs the nav + hash.
  if (initialHash && initialHash !== "about" && projectKeys().includes(initialHash)) {
    window.scrollTo(0, yForKey(initialHash));
  }
}

// Mark the active link and slide the active marker (.side-nav__list::before) to
// it via --marker-y — its centre (offsetTop, transform-independent) on the list.
function setActiveNav(sectionId: string, links: HTMLAnchorElement[]): void {
  let active: HTMLAnchorElement | null = null;
  for (const link of links) {
    const on = link.dataset.navLink === sectionId;
    link.classList.toggle("is-active", on);
    if (on) active = link;
  }
  if (active) {
    const list = active.closest<HTMLElement>(".side-nav__list");
    const dash = active.querySelector<HTMLElement>(".nav-link__dash");
    const dashH = dash?.offsetHeight ?? 0;
    // Marker TOP = the active dash's top, relative to the list (its offsetParent),
    // so the bar overlays that dash exactly. Pure px → clean transform slide.
    list?.style.setProperty(
      "--marker-y",
      `${active.offsetTop + (active.offsetHeight - dashH) / 2}px`,
    );
  }
}
