import { site } from "../data/meta";

type Umami = {
  track: (name: string, data?: Record<string, unknown>) => void;
  identify?: (data: Record<string, unknown>) => void;
};
type Clarity = (...args: unknown[]) => void;

interface CardViewDetail {
  index: number;
  section?: string;
  slide?: string;
  kind?: string;
}
interface CardClickDetail extends CardViewDetail {
  region?: string;
  dead?: boolean;
  count?: number;
}
interface ViewModeDetail {
  layout: string;
  nav: string;
  deck: string;
}

const CONTACT_LINKS = ".contact-menu__link, .contact-end__link";
const HERO_LINKS = "[data-hero] a[href]";
const ROLE_LINKS = "[data-role-link]";

const DWELL_MS = 2000;
const SETTLE_MS = 300;

const ENGAGEMENT = ["browsed", "explored", "clicked_out", "contacted"] as const;
type Engagement = (typeof ENGAGEMENT)[number];
let engagementRank = -1;

const DESKTOP_VIEWS: Record<string, string> = {
  labels: "desktop-labels",
  rail: "desktop-rail",
  hidden: "desktop-no-nav",
};

function eventName(action: string, thing: string, detail?: string): string {
  const head = `${action}-${thing}`;
  return detail ? `${head}--${phrase(detail)}` : head;
}

function phrase(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function track(event: string, params?: Record<string, unknown>): void {
  const umami = (window as unknown as { umami?: Umami }).umami;
  if (umami?.track) umami.track(event, params);

  const clarity = (window as unknown as { clarity?: Clarity }).clarity;
  if (typeof clarity === "function") clarity("event", event);
}

function describeSession(data: Record<string, string>): void {
  const umami = (window as unknown as { umami?: Umami }).umami;
  umami?.identify?.(data);

  const clarity = (window as unknown as { clarity?: Clarity }).clarity;
  if (typeof clarity === "function") {
    for (const [key, value] of Object.entries(data)) clarity("set", key, value);
  }
}

function engage(level: Engagement): void {
  const rank = ENGAGEMENT.indexOf(level);
  if (rank <= engagementRank) return;
  engagementRank = rank;
  describeSession({ engagement: level });
}

function channelFor(href: string): string {
  if (href.startsWith("mailto:")) return "email";
  if (href.startsWith("tel:")) return "phone";
  if (href.includes("linkedin.com")) return "linkedin";
  if (href.includes("github.com")) return "github";
  if (href.includes("are.na")) return "are.na";
  return "other";
}

function clickAction(href: string): string {
  if (href.startsWith("http")) return "external_click";
  if (href.startsWith("mailto:")) return "mailto_click";
  if (href.startsWith("tel:")) return "tel_click";
  return "click";
}

function trackContactClicks(): void {
  document.addEventListener("click", (e) => {
    const link = (e.target as Element | null)?.closest<HTMLAnchorElement>(CONTACT_LINKS);
    if (!link) return;
    const href = link.getAttribute("href") ?? "";
    engage("contacted");
    track(eventName(clickAction(href), "contact", channelFor(href)), {
      location: link.classList.contains("contact-menu__link") ? "nav" : "footer",
    });
  });
}

function trackHeroLinks(): void {
  document.addEventListener("click", (e) => {
    const link = (e.target as Element | null)?.closest<HTMLAnchorElement>(HERO_LINKS);
    if (!link) return;
    const href = link.getAttribute("href") ?? "";
    engage(href.startsWith("http") ? "clicked_out" : "explored");
    track(eventName(clickAction(href), "hero", link.textContent ?? ""), {
      url: href,
    });
  });
}

function trackExternalLinks(): void {
  document.addEventListener("click", (e) => {
    const link = (e.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
    if (!link) return;
    const href = link.getAttribute("href") ?? "";
    if (!href.startsWith("http")) return;
    if (link.closest(`${CONTACT_LINKS}, ${HERO_LINKS}, ${ROLE_LINKS}`)) return;

    const url = new URL(href);
    engage("clicked_out");
    track(eventName("click", "link", channelFor(href)), {
      domain: url.hostname,
      url: href,
    });
  });
}

function onPopoverOpen(popover: HTMLElement, handler: () => void): void {
  popover.addEventListener("toggle", (e) => {
    if ((e as ToggleEvent).newState !== "open") return;
    engage("explored");
    handler();
  });
}

function trackPopovers(): void {
  document.querySelectorAll<HTMLElement>("[data-role-details]").forEach((popover) => {
    onPopoverOpen(popover, () =>
      track(eventName("open", "role_details", popover.dataset.roleDetails ?? "")),
    );
  });

  const contactMenu = document.querySelector<HTMLElement>("[data-contact-menu]");
  if (contactMenu) onPopoverOpen(contactMenu, () => track(eventName("open", "contact_menu")));
}

function trackRoleLinks(): void {
  document.addEventListener("click", (e) => {
    const link = (e.target as Element | null)?.closest<HTMLAnchorElement>(ROLE_LINKS);
    if (!link) return;
    const href = link.getAttribute("href") ?? "";
    const popover = link.closest<HTMLElement>("[data-role-details]");
    const section =
      popover?.dataset.roleDetails ?? link.closest<HTMLElement>("[data-card]")?.dataset.section;
    engage(href.startsWith("http") ? "clicked_out" : "explored");
    track(eventName(clickAction(href), "role_link", section), {
      url: href,
      location: popover ? "popup" : "deck",
    });
  });
}

function trackDeckInteractions(): void {
  let dwell: number | undefined;

  document.addEventListener("card:view", (e) => {
    const detail = (e as CustomEvent<CardViewDetail>).detail;
    window.clearTimeout(dwell);
    dwell = window.setTimeout(() => {
      track(eventName("view", detail.kind ?? "slide", detail.section), {
        slide: detail.slide,
        index: detail.index,
      });
    }, DWELL_MS);
  });

  document.addEventListener("card:click", (e) => {
    const detail = (e as CustomEvent<CardClickDetail>).detail;
    const action = detail.dead ? "dead_click" : "click";
    if (!detail.dead) engage("explored");
    track(eventName(action, detail.kind ?? "slide", detail.section), {
      slide: detail.slide,
      index: detail.index,
      region: detail.region,
      count: detail.count,
    });
  });
}

function trackViewMode(): void {
  let sent = "";
  let settle: number | undefined;

  document.addEventListener("view:mode", (e) => {
    const detail = (e as CustomEvent<ViewModeDetail>).detail;
    const view =
      detail.layout === "desktop" ? (DESKTOP_VIEWS[detail.nav] ?? detail.nav) : "mobile";
    window.clearTimeout(settle);
    settle = window.setTimeout(() => {
      if (view === sent) return;
      sent = view;
      describeSession({ view, deck: detail.deck });
    }, SETTLE_MS);
  });
}

function trackFurthest(): void {
  let sent = "";
  let dwell: number | undefined;

  document.addEventListener("view:furthest", (e) => {
    const { section } = (e as CustomEvent<{ section: string }>).detail;
    window.clearTimeout(dwell);
    dwell = window.setTimeout(() => {
      if (section === sent) return;
      sent = section;
      describeSession({ furthest: section });
    }, DWELL_MS);
  });
}

function trackNavigation(): void {
  document.addEventListener("click", (e) => {
    const target = e.target as Element | null;

    const link = target?.closest<HTMLAnchorElement>("[data-nav-link]");
    if (link) {
      engage("explored");
      track(eventName("click", "nav", link.getAttribute("data-nav-link") ?? ""));
      return;
    }

    if (!target?.closest(".brand")) return;
    engage("explored");
    track(eventName("click", "nav", site.name));
  });
}

function trackLogoClicks(): void {
  document.addEventListener("click", (e) => {
    const mark = (e.target as Element | null)?.closest<HTMLElement>("[data-logo]");
    if (!mark) return;

    const dead = !mark.closest("a[href], button");
    if (!dead) engage("explored");
    track(eventName(dead ? "dead_click" : "click", "logo", mark.dataset.logo ?? ""));
  });
}

function trackNamedVisit(): void {
  const name = document.querySelector<HTMLElement>("[data-hero-named]")?.dataset.heroNamed;
  if (!name) return;
  track(eventName("view", "named_url"), { name });
  describeSession({ named: name });
}

function trackReferrer(): void {
  if (!document.referrer) {
    describeSession({ referrer: "direct" });
    return;
  }
  const { hostname } = new URL(document.referrer);
  if (hostname === location.hostname) return;
  describeSession({ referrer: hostname.replace(/^www\./, "") });
}

function trackShaderUse(): void {
  document.addEventListener("lenticular:engage", (e) => {
    const { image } = (e as CustomEvent<{ image: string }>).detail;
    engage("explored");
    track(eventName("use", "image_shader"), { image });
  });
}

export function initAnalytics(): void {
  engage("browsed");
  trackViewMode();
  trackFurthest();
  trackContactClicks();
  trackHeroLinks();
  trackExternalLinks();
  trackRoleLinks();
  trackPopovers();
  trackDeckInteractions();
  trackNavigation();
  trackLogoClicks();
  trackNamedVisit();
  trackReferrer();
  trackShaderUse();
}
