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

function trackPageView(): void {
  const path = window.location.pathname;
  const pageName = path === "/" ? "home" : path.substring(1);
  track("page_view", { page_path: path, page_title: pageName });
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

function trackCardVisibility(): void {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target instanceof HTMLElement) {
          const cardTitle = entry.target.getAttribute("data-card-title");
          if (cardTitle) {
            track("card_view", { card: cardTitle });
            observer.unobserve(entry.target);
          }
        }
      });
    },
    { threshold: 0.25 }
  );

  document.querySelectorAll("[data-card-title]").forEach((card) => {
    observer.observe(card);
  });
}

function trackScrollDepth(): void {
  const thresholds = { 25: false, 50: false, 75: false, 100: false };

  const checkScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    const scrollPercent = Math.round(((scrollTop + windowHeight) / documentHeight) * 100);

    (Object.keys(thresholds) as unknown as (keyof typeof thresholds)[]).forEach(
      (threshold) => {
        if (scrollPercent >= threshold && !thresholds[threshold]) {
          thresholds[threshold] = true;
          track("scroll_depth", { depth_percent: threshold });
        }
      }
    );
  };

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(checkScroll);
      ticking = true;
      setTimeout(() => {
        ticking = false;
      }, 100);
    }
  });
}

function trackProjectViews(): void {
  const DWELL_MS = 1000;
  const NON_PROJECT = new Set(["about", "contact"]);
  let dwell: number | undefined;

  document.addEventListener("section:change", (e) => {
    const section = (e as CustomEvent<{ section: string }>).detail?.section;
    const sectionElement = section
      ? document.querySelector(`[data-section="${section}"]`)
      : null;

    window.clearTimeout(dwell);

    if (!section || NON_PROJECT.has(section)) return;

    dwell = window.setTimeout(() => {
      track("project_view", {
        project: section,
        is_visible: true,
      });
    }, DWELL_MS);
  });
}

function trackTimeOnPage(): void {
  let sessionStart = Date.now();

  window.addEventListener("beforeunload", () => {
    const timeOnPage = Math.round((Date.now() - sessionStart) / 1000);
    if (timeOnPage > 0) {
      track("page_engagement", {
        time_on_page_seconds: timeOnPage,
      });
    }
  });
}

export function initAnalytics(): void {
  trackPageView();
  trackContactClicks();
  trackCardVisibility();
  trackScrollDepth();
  trackProjectViews();
  trackTimeOnPage();
}