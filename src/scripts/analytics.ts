type Gtag = (...args: unknown[]) => void;
type Umami = { track: (name: string, data?: Record<string, unknown>) => void };

/** Payloads dispatched by deck.ts as the deck is scrolled and clicked. */
interface CardViewDetail {
  index: number;
  section?: string;
}
interface CardClickDetail extends CardViewDetail {
  /** Slide id from the deck data (e.g. "foyer-1"). */
  slide?: string;
  /** Slide kind — bio | intro | mockup | results. */
  kind?: string;
  /** Part of the card clicked: media | caption | text | card. */
  region?: string;
  /** True when the click hit nothing interactive — the intent signal. */
  dead?: boolean;
  /** Clicks on this slide so far, this page load. */
  count?: number;
}

function track(event: string, params?: Record<string, unknown>): void {
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag === "function") gtag("event", event, params);

  const umami = (window as unknown as { umami?: Umami }).umami;
  if (umami?.track) umami.track(event, params);
}

function channelFor(href: string): string {
  if (href.startsWith("mailto:")) return "email";
  if (href.startsWith("tel:")) return "phone";
  if (href.includes("linkedin.com")) return "linkedin";
  if (href.includes("github.com")) return "github";
  if (href.includes("are.na")) return "are.na";
  return "other";
}

function trackContactClicks(): void {
  document.addEventListener("click", (e) => {
    const link = (e.target as Element | null)?.closest<HTMLAnchorElement>(
      ".contact-menu__link, .contact-end__link",
    );
    if (!link) return;
    track("contact_click", {
      channel: channelFor(link.getAttribute("href") ?? ""),
      location: link.classList.contains("contact-menu__link") ? "nav" : "footer",
    });
  });
}

function trackProjectViews(): void {
  const DWELL_MS = 1000;
  const NON_PROJECT = new Set(["about", "contact"]);
  let dwell: number | undefined;

  document.addEventListener("section:change", (e) => {
    const section = (e as CustomEvent<{ section: string }>).detail?.section;
    window.clearTimeout(dwell);
    if (!section || NON_PROJECT.has(section)) return;
    dwell = window.setTimeout(() => track("project_view", { project: section }), DWELL_MS);
  });
}

function trackExternalLinks(): void {
  document.addEventListener("click", (e) => {
    const link = (e.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
    if (!link) return;
    const href = link.getAttribute("href") ?? "";
    if (!href.startsWith("http")) return;

    const url = new URL(href);
    track("external_link_click", {
      domain: url.hostname,
      url: href,
    });
  });
}

function trackDeckInteractions(): void {
  document.addEventListener("card:view", (e) => {
    const detail = (e as CustomEvent<CardViewDetail>).detail;
    track("project_slide_viewed", {
      index: detail.index,
      project: detail.section,
    });
  });

  // Deck cards aren't links, so a click on one goes nowhere. Recording it tells us
  // whether people EXPECT it to: filter on `dead: true` for clicks that hit nothing
  // interactive, and read `region` (media vs. text) and `count` (they tried again)
  // for how strongly they wanted a detail view. A high dead-click rate on a slide
  // is the case for giving that card somewhere to go.
  document.addEventListener("card:click", (e) => {
    const detail = (e as CustomEvent<CardClickDetail>).detail;
    track("project_slide_clicked", {
      index: detail.index,
      project: detail.section,
      slide: detail.slide,
      kind: detail.kind,
      region: detail.region,
      dead: detail.dead,
      count: detail.count,
    });
  });
}

function trackNavigation(): void {
  document.addEventListener("click", (e) => {
    const link = (e.target as Element | null)?.closest<HTMLAnchorElement>("[data-nav-link]");
    if (!link) return;
    const section = link.getAttribute("data-nav-link") ?? "";
    track("nav_click", { section });
  });
}

function trackBrandClick(): void {
  document.addEventListener("click", (e) => {
    const link = (e.target as Element | null)?.closest<HTMLAnchorElement>(".brand");
    if (!link) return;
    track("brand_click");
  });
}

export function initAnalytics(): void {
  trackContactClicks();
  trackProjectViews();
  trackExternalLinks();
  trackDeckInteractions();
  trackNavigation();
  trackBrandClick();
}