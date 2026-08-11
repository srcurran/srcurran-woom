import { site } from "../data/meta";

type Umami = { track: (name: string, data?: Record<string, unknown>) => void };
type Clarity = (...args: unknown[]) => void;

/** Payloads dispatched by deck.ts as the deck is scrolled and clicked. */
interface CardViewDetail {
  index: number;
  section?: string;
  /** Slide id from the deck data (e.g. "foyer-1"). */
  slide?: string;
  /** bio | intro | mockup | results */
  kind?: string;
}
interface CardClickDetail extends CardViewDetail {
  /** Part of the card clicked: media | caption | text | card. */
  region?: string;
  /** True when the click hit nothing interactive — the intent signal. */
  dead?: boolean;
  /** Clicks on this slide so far, this page load. */
  count?: number;
}

const CONTACT_LINKS = ".contact-menu__link, .contact-end__link";

/**
 * `action-thing--detail`, e.g. `view-results--foyer`. `-` joins the halves, `--`
 * fences the detail, `_` joins words within one phrase (`neiman_marcus`).
 *
 * Detail goes in the name because Clarity's `event` takes a name and nothing else
 * and its tags are session-scoped: a tag says a dead click happened somewhere in
 * the visit, never which card. Higher-cardinality detail rides in `params`.
 */
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
    // A contact link is also an outbound one; without this the click lands twice.
    if (link.closest(CONTACT_LINKS)) return;

    const url = new URL(href);
    track(eventName("click", "link", channelFor(href)), {
      domain: url.hostname,
      url: href,
    });
  });
}

function trackDeckInteractions(): void {
  // Gate the view on dwell, so flicking past a card doesn't count as reading it.
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

  // Cards aren't links, so dead-ness is the action half of the name rather than a
  // param — that makes "clicked a card that went nowhere" a Clarity filter.
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

    // The wordmark goes home, so it reads as one more nav link.
    if (target?.closest(".brand")) track(eventName("click", "nav", site.name));
  });
}

function trackLogoClicks(): void {
  document.addEventListener("click", (e) => {
    const mark = (e.target as Element | null)?.closest<HTMLElement>("[data-logo]");
    if (!mark) return;
    // Marks aren't links today, so these land as dead_click — one people keep
    // clicking is the case for putting a case study behind it.
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
