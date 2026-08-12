import { site } from "../data/meta";

type Umami = { track: (name: string, data?: Record<string, unknown>) => void };
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

const CONTACT_LINKS = ".contact-menu__link, .contact-end__link";

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
    const link = (e.target as Element | null)?.closest<HTMLAnchorElement>(CONTACT_LINKS);
    if (!link) return;
    track(eventName("click", "contact", channelFor(link.getAttribute("href") ?? "")), {
      location: link.classList.contains("contact-menu__link") ? "nav" : "footer",
    });
  });
}

function trackExternalLinks(): void {
  document.addEventListener("click", (e) => {
    const link = (e.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
    if (!link) return;
    const href = link.getAttribute("href") ?? "";
    if (!href.startsWith("http")) return;
    if (link.closest(CONTACT_LINKS)) return;

    const url = new URL(href);
    track(eventName("click", "link", channelFor(href)), {
      domain: url.hostname,
      url: href,
    });
  });
}

function trackDeckInteractions(): void {
  const DWELL_MS = 2000;
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
    track(eventName(action, detail.kind ?? "slide", detail.section), {
      slide: detail.slide,
      index: detail.index,
      region: detail.region,
      count: detail.count,
    });
  });
}

function trackNavigation(): void {
  document.addEventListener("click", (e) => {
    const target = e.target as Element | null;

    const link = target?.closest<HTMLAnchorElement>("[data-nav-link]");
    if (link) {
      track(eventName("click", "nav", link.getAttribute("data-nav-link") ?? ""));
      return;
    }

    if (target?.closest(".brand")) track(eventName("click", "nav", site.name));
  });
}

function trackLogoClicks(): void {
  document.addEventListener("click", (e) => {
    const mark = (e.target as Element | null)?.closest<HTMLElement>("[data-logo]");
    if (!mark) return;

    const dead = !mark.closest("a[href], button");
    track(eventName(dead ? "dead_click" : "click", "logo", mark.dataset.logo ?? ""));
  });
}

export function initAnalytics(): void {
  trackContactClicks();
  trackExternalLinks();
  trackDeckInteractions();
  trackNavigation();
  trackLogoClicks();
}
