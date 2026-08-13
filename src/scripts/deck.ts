import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const STACK = {
  enterParallax: 12,
  enterDim: 0,
  exitStart: 0.1,
  exitEnd: -0.3,
  exitParallax: -12,
  exitDim: 0.55,
};

const RANDOM = {
  rotate: [1, 2.5] as const,
  translate: [25, 75] as const,
  scale: [0.875, 0.925] as const,
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

const COVERFLOW = "(min-width: 961px) and (min-height: 801px)";
const DESKTOP_LAYOUT = "(min-width: 961px)";

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
  const sideNav = document.querySelector<HTMLElement>("[data-side-nav]");

  const contact = document.querySelector<HTMLElement>("#contact");

  const sectionOrder = ((): string[] => {
    const keys = ["about"];
    for (const card of cards) {
      const section = card.dataset.section ?? "";
      if (section && !keys.includes(section)) keys.push(section);
    }
    if (contact) keys.push("contact");
    return keys;
  })();

  const initialHash = location.hash.slice(1);

  const scrollKey = `deck-scroll:${location.pathname}`;
  const navType = (
    performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined
  )?.type;

  const shouldRestore = navType === "reload" || navType === "back_forward";
  const saveScroll = () => {
    try {
      sessionStorage.setItem(scrollKey, String(window.scrollY));
    } catch {
    }
  };
  window.addEventListener("pagehide", saveScroll);
  window.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") saveScroll();
  });

  viewport.classList.add("is-ready");

  let spacing = 0.6;
  const computeSpacing = () => {
    if (cards.length > 1) {
      spacing = (cards[1].offsetTop - cards[0].offsetTop) / window.innerHeight;
    }
  };
  computeSpacing();
  window.addEventListener("resize", computeSpacing);

  const coverflow = window.matchMedia(COVERFLOW);
  const desktopLayout = window.matchMedia(DESKTOP_LAYOUT);
  const animate = !prefersReduced() && coverflow.matches;
  coverflow.addEventListener("change", () => location.reload());

  if (animate) {
    for (const card of cards) {
      const inner = card.querySelector<HTMLElement>("[data-parallax]");
      const aperture = card.querySelector<HTMLElement>("[data-aperture]");
      const j = makeJitter();
      gsap.set(card, { transformOrigin: "center center" });
      if (aperture) gsap.set(aperture, { transformOrigin: "center center" });
      ScrollTrigger.create({
        trigger: card,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const vh = window.innerHeight;
          const h = card.offsetHeight / vh;

          const top = 1 - self.progress * (1 + h);

          const flatTop = 0.5 - h / 2;
          const enterDone = Math.max(STACK.exitEnd + spacing, flatTop);
          const enterStart = enterDone + (STACK.exitStart - STACK.exitEnd);
          const inT = clamp((enterStart - top) / (enterStart - enterDone), 0, 1);
          const outT = clamp(
            (STACK.exitStart - top) / (STACK.exitStart - STACK.exitEnd),
            0,
            1,
          );

          const enterPart = j.enterScale + (1 - j.enterScale) * inT;
          const scale = enterPart - (1 - j.exitScale) * outT;
          const rotation = j.enterRot * (1 - inT) + j.exitRot * outT;
          const x = j.enterX * (1 - inT) + j.exitX * outT;
          const dim = STACK.enterDim * (1 - inT) + STACK.exitDim * outT;
          const drift = STACK.enterParallax * (1 - inT) + STACK.exitParallax * outT;

          const focus = Math.round(inT * (1 - outT) * 100) / 100;

          gsap.set(card, { scale, rotation, x, "--dim": dim, "--focus": focus });
          if (inner) gsap.set(inner, { yPercent: drift });
          if (aperture) gsap.set(aperture, { scale: 1 / scale });
        },
      });
    }
  }

  const INTERACTIVE = 'a[href], button, [role="button"], input, select, textarea, summary';

  const REGIONS: ReadonlyArray<readonly [string, string]> = [
    [".slide__chin", "caption"],
    [".slide__frame", "media"],
    [".slide__text, .slide__prose, .slide__results, .slide__meta, .slide__heading", "text"],
  ];

  const cardClicks = new Map<string, number>();
  let downX = 0;
  let downY = 0;
  viewport.addEventListener(
    "pointerdown",
    (e) => {
      downX = e.clientX;
      downY = e.clientY;
    },
    { passive: true },
  );
  viewport.addEventListener("click", (e) => {
    const target = e.target as Element | null;
    const card = target?.closest<HTMLElement>("[data-card]");
    if (!card) return;
    if (e.detail > 0 && Math.hypot(e.clientX - downX, e.clientY - downY) > 10) return;
    if (!(window.getSelection()?.isCollapsed ?? true)) return;

    const slide = card.dataset.slide ?? "";
    const count = (cardClicks.get(slide) ?? 0) + 1;
    cardClicks.set(slide, count);
    document.dispatchEvent(
      new CustomEvent("card:click", {
        detail: {
          index: Number(card.dataset.index ?? 0),
          section: card.dataset.section,
          slide,
          kind: card.dataset.kind,
          region: REGIONS.find(([sel]) => target?.closest(sel))?.[1] ?? "card",
          dead: !target?.closest(INTERACTIVE),
          count,
        },
      }),
    );
  });

  const RAIL_GUTTER = 64;
  const LABEL_GUTTER = 180;

  const DECK_LABEL_GUTTER = LABEL_GUTTER + RANDOM.translate[1];
  let gutter = window.innerWidth;
  const measureGutter = () => {
    gutter = (window.innerWidth - cards[0].offsetWidth) / 2;
  };
  measureGutter();
  let lastSection = "";
  let lastView = "";
  const syncNav = () => {
    const railHidden = gutter < RAIL_GUTTER;
    document.documentElement.classList.toggle("nav-rail-hidden", railHidden);
    const onAbout = lastSection === "about";
    const collapsed = gutter < (onAbout ? LABEL_GUTTER : DECK_LABEL_GUTTER);
    if (sideNav) {
      sideNav.classList.toggle("is-hidden", railHidden);
      sideNav.classList.toggle("is-about", onAbout);
      sideNav.classList.toggle("is-collapsed", collapsed);
    }
    const layout = desktopLayout.matches ? "desktop" : "mobile";
    const nav = railHidden ? "hidden" : collapsed ? "rail" : "labels";
    if (`${layout}-${nav}` !== lastView) {
      lastView = `${layout}-${nav}`;
      document.dispatchEvent(
        new CustomEvent("view:mode", {
          detail: { layout, nav, deck: animate ? "coverflow" : "static" },
        }),
      );
    }
  };
  syncNav();
  let furthest = -1;
  const setActive = (section: string, fromClick = false) => {
    if (!section) return;
    if (section !== lastSection) {
      lastSection = section;
      setActiveNav(section, navLinks);
      const rank = sectionOrder.indexOf(section);
      if (rank > furthest) {
        furthest = rank;
        document.dispatchEvent(new CustomEvent("view:furthest", { detail: { section } }));
      }
      if (fromClick) {
        const url = section === "about" ? location.pathname + location.search : `#${section}`;
        history.replaceState(null, "", url);
      }
    }
    syncNav();
  };

  window.addEventListener("resize", () => {
    measureGutter();
    syncNav();
  }, { passive: true });

  const absTop = (el: HTMLElement): number => {
    let y = 0;
    for (let n: HTMLElement | null = el; n; n = n.offsetParent as HTMLElement | null) {
      y += n.offsetTop;
    }
    return y;
  };

  const snapScrollFor = (card: HTMLElement): number =>
    absTop(card) + card.offsetHeight / 2 - 0.5 * window.innerHeight;

  let lastCard: HTMLElement | null = null;
  const updateActive = () => {
    const sy = window.scrollY;
    let bestDist = sy;
    let section = "about";
    let nearest: HTMLElement | null = null;
    for (const card of cards) {
      const dist = Math.abs(sy - snapScrollFor(card));
      if (dist < bestDist) {
        bestDist = dist;
        section = card.dataset.section ?? "";
        nearest = card;
      }
    }

    if (contact) {
      const dist = Math.abs(sy - snapScrollFor(contact));
      if (dist < bestDist) {
        bestDist = dist;
        section = "contact";
        nearest = null;
      }
    }

    if (nearest !== lastCard) {
      lastCard = nearest;
      if (nearest) {
        document.dispatchEvent(
          new CustomEvent("card:view", {
            detail: {
              index: Number(nearest.dataset.index ?? 0),
              section: nearest.dataset.section,
              slide: nearest.dataset.slide,
              kind: nearest.dataset.kind,
            },
          }),
        );
      }
    }
    setActive(section);
  };

  window.addEventListener("scroll", updateActive, { passive: true });
  updateActive();

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

  const canHover = window.matchMedia("(hover: hover)").matches;

  for (const link of navLinks) {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const inRail = sideNav?.contains(link) ?? false;
      if (!canHover && inRail && !sideNav!.classList.contains("is-revealed")) {
        sideNav!.classList.add("is-revealed");
        return;
      }

      link.closest<HTMLElement & { hidePopover(): void }>("[popover]")?.hidePopover();
      const id = link.dataset.navLink;
      let y: number | null = null;
      if (id === "about") y = 0;
      else if (id === "contact") y = contact ? snapScrollFor(contact) : null;
      else {
        const target = cards.find((c) => c.dataset.section === id);
        y = target ? snapScrollFor(target) : null;
      }
      if (y !== null) {
        glideTo(y);
        if (id) setActive(id, true);
      }
      if (!canHover) sideNav?.classList.remove("is-revealed");
    });
  }

  if (sideNav && canHover) {
    sideNav.addEventListener("pointerenter", () => sideNav.classList.add("is-revealed"));
    sideNav.addEventListener("pointerleave", () => sideNav.classList.remove("is-revealed"));
  } else if (sideNav) {
    document.addEventListener("click", (e) => {
      if (!sideNav.contains(e.target as Node)) sideNav.classList.remove("is-revealed");
    });
  }

  const slideYs = (): number[] => {
    const ys = [0, ...cards.map((c) => snapScrollFor(c))];
    if (contact) ys.push(snapScrollFor(contact));
    return ys;
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
    let i = sectionOrder.indexOf(lastSection);
    if (i === -1) i = 0;
    const next = Math.min(sectionOrder.length - 1, Math.max(0, i + dir));
    if (next !== i) glideTo(yForKey(sectionOrder[next]));
  };
  window.addEventListener("keydown", (event) => {
    if (event.repeat || event.metaKey || event.ctrlKey || event.altKey) return;
    const t = event.target as HTMLElement | null;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
    if (document.querySelector(".contact-menu:popover-open")) return;
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

  const savedScroll = (() => {
    try {
      return sessionStorage.getItem(scrollKey);
    } catch {
      return null;
    }
  })();
  if (shouldRestore && savedScroll !== null) {
    window.scrollTo(0, parseFloat(savedScroll));
  } else if (initialHash && initialHash !== "about" && sectionOrder.includes(initialHash)) {
    window.scrollTo(0, yForKey(initialHash));
  }
}

function setActiveNav(sectionId: string, links: HTMLAnchorElement[]): void {
  let active: HTMLAnchorElement | null = null;
  for (const link of links) {
    const on = link.dataset.navLink === sectionId;
    link.classList.toggle("is-active", on);
    if (on && !active && link.closest(".side-nav__list")) active = link;
  }
  if (active) {
    const list = active.closest<HTMLElement>(".side-nav__list");
    const dash = active.querySelector<HTMLElement>(".nav-link__dash");
    const dashH = dash?.offsetHeight ?? 0;

    list?.style.setProperty(
      "--marker-y",
      `${active.offsetTop + (active.offsetHeight - dashH) / 2}px`,
    );
  }
}
