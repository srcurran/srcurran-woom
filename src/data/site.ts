/**
 * Site content as data, rebuilt 1:1 from the Figma deck (srcurran.com-work).
 * Each Slide is one 16:9 card. Everything here is template-driven — edit copy,
 * swap an image src, reorder, or add a slide without touching components.
 *
 * Slide kinds:
 *   bio      — heading + serif paragraphs (light)
 *   intro    — project heading + serif paragraphs, device mockup bleeding right
 *   mockup   — full-bleed image of a designed slide (the visual case-study pages)
 *   results  — heading + serif list (use __like this__ for emphasis)
 */

export const site = {
  name: "Sean Curran",
  role: "Product Design-Engineer",
  email: "srcurran@gmail.com",
} as const;

/** About lives as page content (the hero), not as a deck slide. */
export const about = {
  heading: "How's it going?",
  paragraphs: [
    "I'm Sean. I come with 15 years of diverse design experience.",
    "I have designed at startups, design firms and digital agencies. I have worked on projects ranging from fashion to fintech, from 0→1 apps to landing pages.",
    "I live in beautiful Portland, Maine; by way of NYC, Chicago and SF.",
    "I am currently Staff Designer at Foyer Savings. Previously at Hawthorne, AKQA, Huge, Cuban Council.",
  ],
};

export interface NavSection {
  id: string;
  label: string;
}

export const navSections: NavSection[] = [
  { id: "about", label: "About" },
  { id: "foyer", label: "Foyer" },
  { id: "hawthorne", label: "Hawthorne" },
  { id: "app-omni", label: "App Omni" },
  { id: "neiman-marcus", label: "Neiman Marcus" },
  { id: "salesforce", label: "Salesforce" },
];

export type SlideKind = "bio" | "intro" | "mockup" | "results";
export type SlideTheme = "dark" | "light";

export interface SlideMedia {
  src: string;
  alt?: string;
  type?: "image" | "video";
  /** Bleed the device mockup off the right edge (project intros). */
  bleed?: boolean;
}

export interface Slide {
  id: string;
  section: string;
  kind: SlideKind;
  theme?: SlideTheme;
  heading?: string;
  /** Serif copy. Wrap a phrase in __underscores__ to emphasise it. */
  paragraphs?: string[];
  items?: string[];
  media?: SlideMedia[];
  /** Single-image mockups fill the card (cover); pin the crop to "top" or
   *  "center" (default). Ignored for multi-image mockups. */
  pin?: "top" | "center";
}

export const slides: Slide[] = [
  // --- Foyer -------------------------------------------------------------
  {
    id: "foyer-intro",
    section: "foyer",
    kind: "intro",
    theme: "dark",
    heading: "Foyer",
    paragraphs: [
      "I joined Foyer, the 401(k) for homeownership, as the founding product designer in mid-2023.",
      "Over the last 3 years I have helped bring to life an app that helps members plan and save for their first home.",
    ],
    media: [{ src: "/work/foyer-app.mp4", alt: "Foyer app on iPhone", bleed: true, type: "video" }],
  },
  {
    id: "foyer-1", section: "foyer", kind: "mockup", heading: "Onboarding",
    media: [
      { src: "/work/foyer-1-a.png", alt: "Where" },
      { src: "/work/foyer-1-b.png", alt: "When" },
      { src: "/work/foyer-1-c.png", alt: "Price" },
      { src: "/work/foyer-1-d.png", alt: "Concerns" },
    ],
  },
  {
    id: "foyer-2", section: "foyer", kind: "mockup", heading: "Foyer × Zillow",
    media: [
      { src: "/work/foyer-zillow-square.mp4", alt: "Foyer × Zillow landing", type: "video" },
      { src: "/work/foyer-2-b.png", alt: "Foyer × Zillow on iPhone" },
    ],
  },
  {
    id: "foyer-3", section: "foyer", kind: "mockup", heading: "Calculators",
    media: [
      { src: "/work/foyer-3-a.png", alt: "Calculator" },
      { src: "/work/foyer-3-b.png", alt: "Calculator" },
      { src: "/work/foyer-3-c.png", alt: "Calculator" },
      { src: "/work/foyer-3-d.png", alt: "Calculator" },
    ],
  },
  {
    id: "foyer-results",
    section: "foyer",
    kind: "results",
    theme: "light",
    heading: "Foyer results",
    items: [
      "0→1 product launch",
      "$6M seed round completed",
      "Optimized paid-tier conversion from 6% to 64%",
      "Optimized onboarding conversion from 21% to 39%",
      "Managed large projects: oversaw freelance copywriter, brand design, and a $300k engagement with Metalab",
      "Helped __hundreds of members__ reach homeownership",
    ],
  },

  // --- Hawthorne ---------------------------------------------------------
  {
    id: "hawthorne-intro",
    section: "hawthorne",
    kind: "intro",
    theme: "dark",
    heading: "Hawthorne",
    paragraphs: [
      "I was with Hawthorne, a D2C men's grooming startup, from 2020—2023. After nearly a decade of freelance agency/design firm work.",
      "It was exciting to unlock a new set of variables in the work: iterating on live design, managing internal bandwidth, & real time insights into customers/data.",
    ],
    media: [{ src: "/work/hawthorne-video.mp4", alt: "Hawthorne quiz result", bleed: true, type: "video" }],
  },
  { id: "hawthorne-1", section: "hawthorne", kind: "mockup", heading: "Quiz result concept sketches", media: [{ src: "/work/hawthorne-1.png", alt: "Quiz result concept sketches" }] },
  { id: "hawthorne-2", section: "hawthorne", kind: "mockup", heading: "Revised quiz results", media: [{ src: "/work/hawthorne-2.png", alt: "Revised quiz results" }] },
  { id: "hawthorne-3", section: "hawthorne", kind: "mockup", heading: "Website and CMS design", media: [{ src: "/work/hawthorne-3.png", alt: "Website and CMS design" }] },
  {
    id: "hawthorne-4", section: "hawthorne", kind: "mockup", heading: "Ecomm design",
    media: [
      { src: "/work/hawthorne-4-a.png", alt: "Ecomm mobile" },
      { src: "/work/hawthorne-4-b.png", alt: "Ecomm desktop" },
    ],
  },
  {
    id: "hawthorne-results",
    section: "hawthorne",
    kind: "results",
    theme: "light",
    heading: "Hawthorne results",
    items: [
      "Launch of direct-buy experience, creating an entirely new surface for consumers to buy products",
      "Redesigned the core quiz product recommendation experience",
      "Defined key site metric of “average session value” which analyzed basket size and conversion rates across all sessions",
      "Supported launches of new product lines and offerings; many selling out within days",
      "Co-led a re-platforming move to headless Shopify with the lead engineer",
    ],
  },

  // --- App Omni ----------------------------------------------------------
  {
    id: "app-omni-intro",
    section: "app-omni",
    kind: "intro",
    theme: "dark",
    heading: "App Omni",
    paragraphs: [
      "I have had several short consulting engagements with App Omni (via Savage Bureau) to provide support and thought-partnership to their design team.",
      "Projects included application-wide audits and single-feature deep dives.",
      "With SaaS application security being a deeply complex product: I promoted consistent and adaptable solutions.",
    ],
    media: [{ src: "/work/app-omni-intro.png", alt: "App Omni interface", bleed: true }],
  },
  // NOTE: Figma header here reads "Website and CMS design" — a copy-paste from
  // Hawthorne (wrong for App Omni). Corrected to match the actual content.
  {
    id: "app-omni-1", section: "app-omni", kind: "mockup", heading: "Multi-stage filtering",
    media: [
      { src: "/work/app-omni-1-a.mp4", alt: "Filtering UI", type: "video" },
      { src: "/work/app-omni-1-b.png", alt: "Filter detail" },
    ],
  },
  {
    id: "app-omni-results",
    section: "app-omni",
    kind: "results",
    theme: "light",
    heading: "App Omni results",
    items: [
      "Provided a recommended multi-stage filtering system built on top of work done by the in-house product team",
      "Clarified technical constraints of un-nested and-or statements, using pet types and colors to illustrate the ambiguity",
      "Supported the in-house team with several site-wide audits on topics like: table design, search and filtering",
    ],
  },

  // --- Neiman Marcus -----------------------------------------------------
  {
    id: "neiman-intro",
    section: "neiman-marcus",
    kind: "intro",
    theme: "dark",
    heading: "Neiman Marcus",
    paragraphs: [
      "As part of a larger partnership between Said Differently and Neiman Marcus, I was tapped to redesign the checkout flow and store finder, as well as present high level recommendations for key pages (listings page, detail page).",
    ],
    media: [{ src: "/work/neiman-phone.png", alt: "Neiman Marcus checkout", bleed: true }],
  },
  { id: "neiman-1", section: "neiman-marcus", kind: "mockup", heading: "Checkout design", media: [{ src: "/work/neiman-1.mp4", alt: "Neiman Marcus checkout design", type: "video" }] },
  {
    id: "neiman-results",
    section: "neiman-marcus",
    kind: "results",
    theme: "light",
    heading: "Neiman Marcus results",
    items: [
      "Design launched after out-performing the existing checkout flow in performance testing",
      "Discovery and research led to a store finder experience that went beyond a simple map with pins, celebrating what makes each location unique",
    ],
  },

  // --- Salesforce --------------------------------------------------------
  {
    id: "salesforce-intro",
    section: "salesforce",
    kind: "intro",
    theme: "dark",
    heading: "Salesforce",
    // NOTE: the Figma intro slide reuses the Neiman Marcus paragraph (a
    // copy-paste placeholder). Below is interim copy derived from the results —
    // replace with the real Salesforce intro.
    paragraphs: [
      "An internal events application for Salesforce, built to the Lightning design system and localized for a global audience across seven languages.",
    ],
    media: [{ src: "/work/salesforce-phone.png", alt: "Salesforce events app", bleed: true }],
  },
  { id: "salesforce-1", section: "salesforce", kind: "mockup", heading: "Event calendar approaches", media: [{ src: "/work/salesforce-1.png", alt: "Event calendar approaches" }] },
  { id: "salesforce-2", section: "salesforce", kind: "mockup", heading: "Event calendar detail", media: [{ src: "/work/salesforce-2.png", alt: "Event calendar detail" }] },
  { id: "salesforce-3", section: "salesforce", kind: "mockup", heading: "Event calendar index", media: [{ src: "/work/salesforce-3.png", alt: "Event calendar index" }] },
  {
    id: "salesforce-results",
    section: "salesforce",
    kind: "results",
    theme: "light",
    heading: "Salesforce results",
    items: [
      "Got quick alignment on shape of project through “Land Rover” vs. “Winnebago” concepts",
      "Built to the SF Lightning design system specifications",
      "Engagement was extended an additional year: allowing us to continue working on this app to refine and add features",
      "Designed for internationalization, with the events and UI available in seven different languages (including Japanese and German)",
      "Customer interviews helped us understand needs in a rapidly changing time (mid-2020)",
    ],
  },
];

export interface FooterLink {
  label: string;
  href: string;
}

export const footerLinks: FooterLink[] = [
  { label: "Email", href: `mailto:${site.email}` },
  { label: "LinkedIn", href: "#" },
  { label: "Read.cv", href: "#" },
  { label: "GitHub", href: "#" },
];

/** Contact methods shown in the top-nav "Contact" menu. */
export interface ContactLink {
  label: string;
  href: string;
  /** Opens in a new tab (off-site links, not mailto/tel). */
  external?: boolean;
}

export const contactLinks: ContactLink[] = [
  { label: "srcurran@gmail.com", href: `mailto:${site.email}` },
  { label: "207-572-0916", href: "tel:+12075720916" },
  { label: "linkedin.com/in/srcurran", href: "https://www.linkedin.com/in/srcurran", external: true },
  { label: "github.com/srcurran", href: "https://github.com/srcurran", external: true },
  { label: "are.na/sean-curran/channels", href: "https://www.are.na/sean-curran/channels", external: true },
];
