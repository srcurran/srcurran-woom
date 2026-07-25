/**
 * The deck as data, rebuilt 1:1 from the Figma deck (srcurran.com-work). Each
 * Slide is one 16:9 card. Everything here is template-driven — edit copy, swap an
 * image src, reorder, or add a slide without touching components.
 *
 * Slide kinds:
 *   bio      — heading + serif paragraphs (light)
 *   intro    — project heading + serif paragraphs, device mockup bleeding right
 *   mockup   — full-bleed image of a designed slide (the visual case-study pages)
 *   results  — heading + serif list (use __like this__ for emphasis)
 *
 * The logos aren't a slide — they sit on the page below the deck as an "as seen
 * in" strip (see components/LogoStrip.astro, data in ./logos).
 */

export type SlideKind = "bio" | "intro" | "mockup" | "results";
export type SlideTheme = "dark" | "light";

export interface SlideMedia {
  src: string;
  alt?: string;
  type?: "image" | "video";
  /** Bleed the device mockup off the right edge (project intros). */
  bleed?: boolean;
  phoneBorder?: boolean;
  /** Round the asset's corners (cqw, scales with the card) — e.g. a phone-screen
   *  recording that needs its own rounding. */
  rounded?: boolean;
  /** Overlay the iPhone bezel (public/work/phone-mask.png) on top of the asset so
   *  raw screen guts (a video, or a bezel-less screenshot) match the screenshots
   *  that have the frame baked in. The asset shows through the transparent glass. */
  phoneFrame?: boolean;
}

/** One credit row on a project title card — a label and its value. */
export interface SlideMetaRow {
  label: string;
  value: string;
}

export interface Slide {
  id: string;
  section: string;
  kind: SlideKind;
  theme?: SlideTheme;
  heading?: string;
  /** Serif copy. Wrap a phrase in __underscores__ to emphasise it. */
  paragraphs?: string[];
  /** Credits pinned to the bottom of a title card (role / responsibilities /
   *  team). Omit and the card renders as before. */
  meta?: SlideMetaRow[];
  /** Disciplines shown in a work (mockup) card's bottom caption, beneath its
   *  heading — a comma-separated list of what this piece involved (e.g. "user
   *  flow, design, development"). Omit and the caption shows just the heading. */
  tasks?: string;
  items?: string[];
  media?: SlideMedia[];
  /** Single-image mockups fill the card (cover); pin the crop to "top" or
   *  "center" (default). Ignored for multi-image mockups. */
  pin?: "top" | "center";
  /** Force a single-image mockup to "contain" (centred + padded) instead of the
   *  default cover-fill — e.g. a device shown on its own slide. */
  fit?: "cover" | "contain";
  /** Any CSS `background` value painted behind the card content, overriding the
   *  default light/dark fill — e.g. a gradient behind a contained device mockup. */
  background?: string;
  /** Position of this slide on the home (index) page deck, 1-based. Absent → the
   *  slide does NOT appear on the home deck. Present slides render in ascending
   *  `onIndex` order (so 1 leads, then 2, …). Duplicate numbers aren't guarded
   *  against — just don't reuse one. */
  onIndex?: number;
  /** Show this slide ONLY on the home (index) page, never in the full /work deck
   *  (e.g. the index-only "Latest Work" opener). Implies it's excluded from /work. */
  indexOnly?: boolean;
}

export const slides: Slide[] = [
  // --- Index opener (home page only) -------------------------------------
  // A title card that leads the home-page deck (onIndex: 1). `indexOnly` keeps it
  // out of the full /work deck; being first, it's data-index 0 — so it owns the
  // first-load intro animation.
  {
    id: "index-latest",
    section: "latest",
    kind: "intro",
    theme: "dark",
    heading: "Latest work",
    paragraphs: [
      "A potpourri of recent work that I have designed, animated and developed (or at least helped develop).",
      "Full portfolio available upon request.",
    ],
    onIndex: 1,
    indexOnly: true,
  },
  // --- Foyer -------------------------------------------------------------
  {
    id: "foyer-intro",
    section: "foyer",
    kind: "intro",
    theme: "dark",
    heading: "Foyer",
    meta: [{ label: "Role", value: "Staff (Founding) Product Designer" }],
    paragraphs: [
      "I joined Foyer, the 401(k) for homeownership, as the founding product designer in mid-2023.",
      "As the founding designer I brought the app to life. As a design-engineer I work in code and Figma. As the de facto product owner I prioritized features and drove outcomes. As the sole designer I have owned design end-to-end.",
    ],
  },
  {
    id: "foyer-device", section: "foyer", kind: "mockup", fit: "contain", onIndex: 2,
    heading: "Welcome screen", tasks: "Animation • design • development",
    // Soft lavender→peach gradient (from the Figma frame) behind the device.
    background: "linear-gradient(to top right, #f2ebf5, #f9f0eb 55%, #fbefe9)",
    media: [{ src: "/work/foyer-app.mp4", alt: "Foyer app", type: "video", phoneBorder: true  }],
  },
  {
    id: "foyer-1", section: "foyer", kind: "mockup", heading: "Onboarding", onIndex: 5,
    tasks: "User flow • performance optimization • design • interaction patterns • component development",
    media: [
      { src: "/work/foyer-1-a.png", alt: "Where" },
      { src: "/work/foyer-1-c.png", alt: "Price" },
      { src: "/work/foyer-1-d.png", alt: "Concerns" },
      { src: "/work/foyer-home-goal.mp4", alt: "Homegoal", type: "video", phoneFrame: true },
    ],
  },
  {
    id: "foyer-2", section: "foyer", kind: "mockup", heading: "Foyer × Zillow",
    tasks: "Partnership concepting • design • hero animation • content",
    media: [
      { src: "/work/foyer-zillow-square.mp4", alt: "Foyer × Zillow landing", type: "video" },
      { src: "/work/foyer-2-b.png", alt: "Foyer × Zillow on iPhone" },
    ],
  },
  {
    id: "foyer-3", section: "foyer", kind: "mockup", heading: "Tools and calculators",
    tasks: "Interaction patterns • design • content • development",
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
      "Optimized onboarding conversion from 21% to 39%",
      "Increased paid-tier conversion from 6% at launch, to 64% of depositors",
      "De facto product owner with engineering partner",
      "Managed large projects: oversaw freelance copywriter, brand design, and an engagement with Metalab",
      "Helped <i>hundreds of members</i> reach homeownership",
    ],
  },
//--- Ohsee --------
  {
    id: "ohsee-intro",
    section: "ohsee",
    kind: "intro",
    theme: "dark",
    heading: "Ohsee QA",
    meta: [{ label: "Role", value: "Personal Project (Designed & Developed)" }],
    paragraphs: [
      "Designing in code increases the risk of introducing visual bugs. I looked for a product for visual regression testing, but nothing that existed did what I needed.",
      "So I made my own.",
      "Working code-first, I built and refined a visual QA tool.",
    ],
  },
  {
    id: "ohsee-pages", section: "ohsee", kind: "mockup",
    heading: "Visual QA testing", tasks: "Concept • design • development",
    media: [{ src: "/work/ohsee-run.mp4", alt: "Ohsee Pages", type: "video"  }],
  },
  {
    id: "ohsee-diff", section: "ohsee", kind: "mockup", onIndex: 3,
    heading: "Page detail", tasks: "Concept • design • development",
    media: [{ src: "/work/ohsee-diff.mp4", alt: "Ohsee Diff", type: "video"  }],
  },
  {
    id: "ohsee-screns", section: "ohsee", kind: "mockup",
    heading: "Responsive states", tasks: "Concept • design • development",
    media: [{ src: "/work/ohsee-screens2.mp4", alt: "Ohsee Screen Sizes", type: "video"  }],
  },{

    id: "ohsee-results",
    section: "ohsee",
    kind: "results",
    theme: "light",
    heading: "Ohsee results",
    items: [
      "Caught visual bugs faster with less effort",
      "Features include: Playwright scripting, logged-in states, screenshot and code diff detection",
      "Archived screenshots of app changes maintain a visual history",
      "Agentic-first project with minimal design done in Figma",
    ],
  },
  // --- Hawthorne ---------------------------------------------------------
  {
    id: "hawthorne-intro",
    section: "hawthorne",
    kind: "intro",
    theme: "dark",
    heading: "Hawthorne",
    meta: [{ label: "Role", value: "Product Designer" }],
    paragraphs: [
      "I joined Hawthorne, a D2C men's grooming startup, to work product-side after decade+ of working at agencies and design firms.",
      "With a wealth of e-commerce experience, it was a natural fit that unlocked new ways of working: iterating on live design, managing internal bandwidth, and real time insights into customers/data.",
    ],
  },
  {
    id: "hawthorne-device", section: "hawthorne", kind: "mockup", theme: "dark", fit: "contain", onIndex: 4,
    heading: "Quiz results prototype", tasks: "Concept • design • interaction patterns",
    media: [{ src: "/work/hawthorne-video.mp4", alt: "Hawthorne quiz result", type: "video", rounded: true }],
  },
  { id: "hawthorne-1", section: "hawthorne", kind: "mockup", heading: "Concept sketches (quiz results)", tasks: "Exploration • user flows • interaction patterns", onIndex: 7, media: [{ src: "/work/hawthorne-1.jpg", alt: "Quiz result concept sketches" }] },
  { id: "hawthorne-2", section: "hawthorne", kind: "mockup", heading: "Quiz results redesign", tasks: "User feedback • design optimization", media: [{ src: "/work/hawthorne-2.jpg", alt: "Revised quiz results" }] },
  { id: "hawthorne-3", section: "hawthorne", kind: "mockup", heading: "Website and CMS design", tasks: "Project leadership • design", media: [{ src: "/work/hawthorne-3.jpg", alt: "Website and CMS design" }] },
  { id: "hawthorne-4", section: "hawthorne", kind: "mockup", heading: "E-commerce design", tasks: "Site design and optimization", media: [{ src: "/work/hawthorne-4.jpg", alt: "E-commerce design" }] },
  {
    id: "hawthorne-results",
    section: "hawthorne",
    kind: "results",
    theme: "light",
    heading: "Hawthorne results",
    items: [
      "Launched direct-buy experience, creating a new channel for consumers to buy products",
      "Redesigned and optimized the core feature, a shoppable product recommendation quiz results page",
      "Defined, and worked against, key site metric of “average session value” which analyzed basket size and conversion rates across all sessions",
      "Supported launches of new products with one-off digital experiences. Most launches sold out within days",
      "Co-led effort to move to headless Shopify with the lead engineer",
    ],
  },

  // --- App Omni ----------------------------------------------------------
  {
    id: "app-omni-intro",
    section: "app-omni",
    kind: "intro",
    theme: "dark",
    heading: "App Omni",
    meta: [
      { label: "Role", value: "Product Design Consultant" },
      { label: "Agency", value: "Savage Bureau" },
    ],
    paragraphs: [
      "Consulted with App Omni (via Savage Bureau) across several small projects, to provide product thinking and guidance",
      "Projects included application-wide audits and single-feature deep dives.",
    ],
  },
  // NOTE: Figma header here reads "Website and CMS design" — a copy-paste from
  // Hawthorne (wrong for App Omni). Corrected to match the actual content.
  {
    id: "app-omni-1", section: "app-omni", kind: "mockup", heading: "Nested filtering pattern",
    tasks: "Prototype • interaction pattern exploration",
    media: [
      { src: "/work/app-omni-1-a.mp4", alt: "Filtering UI", type: "video" }
    ],
  },
  {
    id: "app-omni-results",
    section: "app-omni",
    kind: "results",
    theme: "light",
    heading: "App Omni results",
    items: [
      "Designed an advanced multi-stage filtering system, extending work started by the in-house product team",
      "Clarified technical constraints of un-nested and-or statements, using pet types and colors to illustrate the ambiguity",
    ],
  },

  // --- Neiman Marcus -----------------------------------------------------
  {
    id: "neiman-intro",
    section: "neiman-marcus",
    kind: "intro",
    theme: "dark",
    heading: "Neiman Marcus",
    meta: [
      { label: "Role", value: "Product/UX Design Freelance" },
      { label: "Agency", value: "Said Differently" },
    ],
    paragraphs: [
      "As part of a larger partnership between Said Differently and Neiman Marcus, I was tapped to redesign the checkout flow and store finder.",
    ],
  },
  { id: "neiman-1", section: "neiman-marcus", kind: "mockup", heading: "Checkout design", tasks: "Research • user flow • design • interaction patterns", onIndex: 6, media: [{ src: "/work/neiman-1.mp4", alt: "Neiman Marcus checkout design", type: "video" }] },
  { id: "neiman-2", section: "neiman-marcus", kind: "mockup", heading: "Store finder design", tasks: "Research • design", media: [{ src: "/work/neiman-marcus-store.png", alt: "Neiman Marcus store details" }] },
  {
    id: "neiman-results",
    section: "neiman-marcus",
    kind: "results",
    theme: "light",
    heading: "Neiman Marcus results",
    items: [
      "Checkout experience launched after out-performing the existing flow in performance testing",
      "Created a store finder experience that celebrated the unique aspects of each location",
    ],
  },

  // --- Salesforce --------------------------------------------------------
  {
    id: "salesforce-intro",
    section: "salesforce",
    kind: "intro",
    theme: "dark",
    heading: "Salesforce",
    meta: [
      { label: "Role", value: "Product/UX Design Freelance" },
      { label: "Agency", value: "Savage Bureau" },
    ],
    paragraphs: [
      "Worked with Salesforce on several projects, including: developer documentation design, sites for various verticals, and an events application.",
      "The customer success calendar was initiated in 2020 as the company pivoted to online events.",
    ],
  },
  { id: "salesforce-1", section: "salesforce", kind: "mockup", heading: "Event calendar approaches", tasks: "Design concepting • wireframe diagrams", media: [{ src: "/work/salesforce-1.png", alt: "Event calendar approaches" }] },
  { id: "salesforce-2", section: "salesforce", kind: "mockup", heading: "Event calendar detail", tasks: "Event registration flow • design", media: [{ src: "/work/salesforce-2.png", alt: "Event calendar detail" }] },
  { id: "salesforce-3", section: "salesforce", kind: "mockup", heading: "Event calendar index", tasks: "Search + filtering patterns • design", onIndex: 8, media: [{ src: "/work/salesforce-3.png", alt: "Event calendar index" }] },
  {
    id: "salesforce-results",
    section: "salesforce",
    kind: "results",
    theme: "light",
    heading: "Salesforce results",
    items: [
      "Got quick alignment on shape of project through “Land Rover” vs. “Winnebago” concepts",
      "Ran customer interview sessions, to help understand needs in a rapidly evolving time",
      "Built to the SF Lightning design system specifications",
      "Engagement was extended an additional year: allowing us to continue working on this app to refine and add features",
      "Designed for internationalization, with the events and UI available in seven different languages (including Japanese and German)",
    ],
  },
];
