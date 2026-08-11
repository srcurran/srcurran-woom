import { site } from "../data/meta";

type Umami = { track: (name: string, data?: Record<string, unknown>) => void };
type Clarity = (...args: unknown[]) => void;

/** Payloads dispatched by deck.ts as the deck is scrolled and clicked. */
interface CardViewDetail {
  index: number;
  section?: string;
  /** Slide id from the deck data (e.g. "foyer-1"). */
  slide?: string;
  /** Slide kind — bio | intro | mockup | results. */
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

/** Contact links are tracked as contacts, never as generic outbound links —
 *  shared so the two handlers can't drift into double-counting one click. */
const CONTACT_LINKS = ".contact-menu__link, .contact-end__link";

/**
 * `action-thing--detail` — e.g. `view-results--foyer`, `dead_click-mockup--ohsee`.
 *
 * Three separators, three jobs: `-` joins the two halves of the name, `--` fences
 * off the detail, and `_` is reserved for the words inside a single phrase. So a
 * multi-word section stays legible as one token (`neiman_marcus`), and no reader
 * has to guess whether a dash is structure or spelling.
 *
 * The detail belongs in the NAME, not in a property, because Clarity's `event`
 * call takes a name and nothing else. Its custom tags are scoped to the whole
 * SESSION, so someone who saw two projects and dead-clicked once leaves
 * `project: [foyer, ohsee]` and `dead: [true, false]` behind as unordered sets —
 * enough to know a dead click happened somewhere in the visit, never enough to
 * know which card it landed on. A concrete name is the only thing that filters
 * recordings down to the actual moment.
 *
 * Keeping the vocabulary bounded is what makes this work: `thing` is the slide
 * kind (4 of them) and `detail` is the section (8), so the name space stays
 * legible instead of growing per slide. Anything higher-cardinality — slide id,
 * click region, index — stays in `params`, which Umami stores per event and can
 * break down on.
 */
function eventName(action: string, thing: string, detail?: string): string {
  const head = `${action}-${thing}`;
  return detail ? `${head}--${phrase(detail)}` : head;
}

/** Any label → one lower-case phrase. Kebab ids, spaced names, and the odd
 *  punctuated mark ("R/GA", "are.na") all land on `_` as the word join. */
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
    // LinkedIn in the contact menu is a contact, not an outbound link. It's both
    // by markup, so without this the same click lands twice under two names.
    if (link.closest(CONTACT_LINKS)) return;

    const url = new URL(href);
    track(eventName("click", "link", channelFor(href)), {
      domain: url.hostname,
      url: href,
    });
  });
}

function trackDeckInteractions(): void {
  // A card has to hold the centre for a beat before it counts as read. Without
  // the gate, one flick through the deck fires a view for every card it passes
  // and a scroll-through is indistinguishable from someone actually reading —
  // the same reason the old section-level view was debounced. Gating the card
  // view instead means there's exactly one view event, and it's the descriptive
  // one: `view-results--foyer` is "they reached the end of the Foyer story".
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

  // Deck cards aren't links, so a click on one goes nowhere. Recording it tells us
  // whether people EXPECT it to — which is why dead-ness is the ACTION half of the
  // name (`dead_click-mockup--ohsee`) rather than a property: that name is a Clarity
  // filter, so it plays back the sessions where someone clicked a card that wasn't
  // going anywhere. `region` (media vs. text) and `count` (they tried again) stay in
  // params for how strongly they wanted it. A high dead-click rate on a slide is the
  // case for giving that card somewhere to go.
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

    // The wordmark is a nav item too — it goes home, same as any section link,
    // so it reads as one under the same name rather than an event of its own.
    if (target?.closest(".brand")) track(eventName("click", "nav", site.name));
  });
}

function trackLogoClicks(): void {
  document.addEventListener("click", (e) => {
    const mark = (e.target as Element | null)?.closest<HTMLElement>("[data-logo]");
    if (!mark) return;
    // The strip is marks on the page, not links — so every click is a dead one,
    // and that's the point: a client logo people keep clicking is a request for
    // a case study behind it. Same dead/live test as the cards, so if a mark ever
    // does get a link this starts reporting `click-logo--…` with no edit here.
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
