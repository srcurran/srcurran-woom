type Gtag = (...args: unknown[]) => void;

function track(event: string, params?: Record<string, unknown>): void {
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag === "function") gtag("event", event, params);
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

export function initAnalytics(): void {
  trackContactClicks();
  trackProjectViews();
}