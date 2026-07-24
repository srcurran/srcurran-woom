type Gtag = (...args: unknown[]) => void;
type Umami = { track: (name: string, data?: Record<string, unknown>) => void };

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
    const detail = (e as CustomEvent<{ index: number; section?: string }>).detail;
    track("project_slide_viewed", {
      index: detail.index,
      project: detail.section,
    });
  });

  document.addEventListener("card:click", (e) => {
    const detail = (e as CustomEvent<{ index: number; section?: string }>).detail;
    track("project_slide_clicked", {
      index: detail.index,
      project: detail.section,
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