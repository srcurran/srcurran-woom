export type SlideKind = "bio" | "intro" | "mockup" | "results";
export type SlideTheme = "dark" | "light";

export interface SlideMedia {
  src: string;
  alt?: string;
  type?: "image" | "video";
  /** Bleed the device mockup off the right edge (project intros). */
  bleed?: boolean;
  phoneBorder?: boolean;
  /** Round the asset's own corners, in cqw, so it scales with the card. */
  rounded?: boolean;
  /** Overlay the iPhone bezel on a bezel-less asset (phone-mask.png). */
  phoneFrame?: boolean;
}

/** One credit row on a title card. With `href`, the value renders as a link out. */
export interface SlideMetaRow {
  label: string;
  value: string;
  href?: string;
}

export interface Slide {
  id: string;
  section: string;
  kind: SlideKind;
  theme?: SlideTheme;
  heading?: string;
  /** Serif copy. Takes inline **bold**, _italic_, __underline__ (lib/emphasize). */
  paragraphs?: string[];
  /** Credits pinned to the bottom of a title card. */
  meta?: SlideMetaRow[];
  /** Disciplines listed in a mockup card's caption chin. */
  tasks?: string;
  items?: string[];
  media?: SlideMedia[];
  /** Crop for a single-image mockup. Ignored when there are several. */
  pin?: "top" | "center";
  /** Force a single-image mockup to contain (centred + padded) over cover-fill. */
  fit?: "cover" | "contain";
  /** Fill behind the card, overriding the theme. A token reference
   *  (`var(--gradient-lavender-peach)`), never a literal color. */
  background?: string;
  /** Vestigial: position on the retired home highlights deck. Nothing reads it. */
  onIndex?: number;
  /** Vestigial: was home-deck-only, so it renders nowhere. Held, not deleted. */
  indexOnly?: boolean;
}

export const slides: Slide[] = [
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

  {
    id: "foyer-intro",
    section: "foyer",
    kind: "intro",
    theme: "dark",
    heading: "Foyer",
    meta: [
      { label: "Role", value: "Staff (Founding) Product Designer" },
      { label: "Link", value: "foyersavings.com", href: "https://foyersavings.com" },
    ],
    paragraphs: [
      "I joined Foyer, the 401(k) for homeownership, as the founding product designer in mid-2023.",
      "As the founding designer I brought the app to life. As a design-engineer I work in code and Figma. As the de facto product owner I prioritized features and drove outcomes. As the sole designer I have owned design end-to-end.",
    ],
  },
  {
    id: "foyer-device",
    section: "foyer",
    kind: "mockup",
    fit: "contain",
    onIndex: 2,
    heading: "Welcome screen",
    tasks: "Animation • design • development",
    background: "var(--gradient-lavender-peach)",
    media: [
      {
        src: "/work/foyer-app.mp4",
        alt: "Foyer app",
        type: "video",
        phoneBorder: true,
      },
    ],
  },
  {
    id: "foyer-1",
    section: "foyer",
    kind: "mockup",
    heading: "Onboarding",
    onIndex: 5,
    tasks:
      "User flow • performance optimization • design • interaction patterns • component development",
    media: [
      { src: "/work/foyer-1-a.png", alt: "Where" },
      { src: "/work/foyer-1-c.png", alt: "Price" },
      { src: "/work/foyer-1-d.png", alt: "Concerns" },
      {
        src: "/work/foyer-home-goal.mp4",
        alt: "Homegoal",
        type: "video",
        phoneFrame: true,
      },
    ],
  },
  {
    id: "foyer-2",
    section: "foyer",
    kind: "mockup",
    heading: "Foyer × Zillow",
    tasks: "Partnership concepting • design • hero animation • content",
    media: [
      {
        src: "/work/foyer-zillow-square.mp4",
        alt: "Foyer × Zillow landing",
        type: "video",
      },
      { src: "/work/foyer-2-b.png", alt: "Foyer × Zillow on iPhone" },
    ],
  },
  {
    id: "foyer-3",
    section: "foyer",
    kind: "mockup",
    heading: "Tools and calculators",
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
      "Founding designer, ran successful __0-to-1 launch__",
      "__40pt increase__ in onboarded users, by leading with home goal",
      "Achieved __64% attach rate__ on paid product",
      "Helped __hundreds of members__ purchase a home",
    ],
  },

  {
    id: "ohsee-intro",
    section: "ohsee",
    kind: "intro",
    theme: "dark",
    heading: "Ohsee QA",
    meta: [
      { label: "Role", value: "Personal Project (Designed & Developed)" },
      { label: "Link", value: "ohsee.app", href: "https://ohsee.app" },
    ],
    paragraphs: [
      "Designing in code increases the risk of introducing visual bugs. I looked for a product for visual regression testing, but nothing that existed did what I needed.",
      "So I made my own.",
      "Working code-first, I built and refined a visual QA tool.",
    ],
  },
  {
    id: "ohsee-pages",
    section: "ohsee",
    kind: "mockup",
    heading: "Visual QA testing",
    tasks: "Concept • design • development",
    media: [{ src: "/work/ohsee-run.mp4", alt: "Ohsee Pages", type: "video" }],
  },
  {
    id: "ohsee-diff",
    section: "ohsee",
    kind: "mockup",
    onIndex: 3,
    heading: "Page detail",
    tasks: "Concept • design • development",
    media: [{ src: "/work/ohsee-diff.mp4", alt: "Ohsee Diff", type: "video" }],
  },
  {
    id: "ohsee-screns",
    section: "ohsee",
    kind: "mockup",
    heading: "Responsive states",
    tasks: "Concept • design • development",
    media: [
      {
        src: "/work/ohsee-screens2.mp4",
        alt: "Ohsee Screen Sizes",
        type: "video",
      },
    ],
  },
  {
    id: "ohsee-results",
    section: "ohsee",
    kind: "results",
    theme: "light",
    heading: "Ohsee results",
    items: [
      "Has caught __dozens of bugs__ in my own work, before it shipped",
      "Works for designers and developers with __CLI and app__",
      "Traacks the __visual history__ of your project",
      "Built __code-first__, to meet my specific needs",
    ],
  },

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
    id: "hawthorne-device",
    section: "hawthorne",
    kind: "mockup",
    theme: "dark",
    fit: "contain",
    onIndex: 4,
    heading: "Quiz results prototype",
    tasks: "Concept • design • interaction patterns",
    media: [
      {
        src: "/work/hawthorne-video.mp4",
        alt: "Hawthorne quiz result",
        type: "video",
        rounded: true,
      },
    ],
  },
  {
    id: "hawthorne-1",
    section: "hawthorne",
    kind: "mockup",
    heading: "Concept sketches (quiz results)",
    tasks: "Exploration • user flows • interaction patterns",
    onIndex: 7,
    media: [
      { src: "/work/hawthorne-1.jpg", alt: "Quiz result concept sketches" },
    ],
  },
  {
    id: "hawthorne-2",
    section: "hawthorne",
    kind: "mockup",
    heading: "Quiz results redesign",
    tasks: "User feedback • design optimization",
    media: [{ src: "/work/hawthorne-2.jpg", alt: "Revised quiz results" }],
  },
  {
    id: "hawthorne-3",
    section: "hawthorne",
    kind: "mockup",
    heading: "Website and CMS design",
    tasks: "Project leadership • design",
    media: [{ src: "/work/hawthorne-3.jpg", alt: "Website and CMS design" }],
  },
  {
    id: "hawthorne-4",
    section: "hawthorne",
    kind: "mockup",
    heading: "E-commerce design",
    tasks: "Site design and optimization",
    media: [{ src: "/work/hawthorne-4.jpg", alt: "E-commerce design" }],
  },
  {
    id: "hawthorne-results",
    section: "hawthorne",
    kind: "results",
    theme: "light",
    heading: "Hawthorne results",
    items: [
      "0-to-1 launch of a __direct-buy channel__ for customers",
      "__Increased subscriptions 15%__ from quiz results redesign",
      "Led CMS redesign to update the site __faster and cheaper__",
      "__Average session value__ was the top line metric I owned",
    ],
  },

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

  {
    id: "app-omni-1",
    section: "app-omni",
    kind: "mockup",
    heading: "Nested filtering pattern",
    tasks: "Prototype • interaction pattern exploration",
    media: [
      { src: "/work/app-omni-1-a.mp4", alt: "Filtering UI", type: "video" },
    ],
  },
  {
    id: "app-omni-results",
    section: "app-omni",
    kind: "results",
    theme: "light",
    heading: "App Omni results",
    items: [
      "External consultant, providing __UX and product guidance__",
      "__Simplified__ complex concepts (e.g., nested filtering logic)",
    ],
  },

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
  {
    id: "neiman-1",
    section: "neiman-marcus",
    kind: "mockup",
    heading: "Checkout design",
    tasks: "Research • user flow • design • interaction patterns",
    onIndex: 6,
    media: [
      {
        src: "/work/neiman-1.mp4",
        alt: "Neiman Marcus checkout design",
        type: "video",
      },
    ],
  },
  {
    id: "neiman-2",
    section: "neiman-marcus",
    kind: "mockup",
    heading: "Store finder design",
    tasks: "Research • design",
    media: [
      {
        src: "/work/neiman-marcus-store.png",
        alt: "Neiman Marcus store details",
      },
    ],
  },
  {
    id: "neiman-results",
    section: "neiman-marcus",
    kind: "results",
    theme: "light",
    heading: "Neiman Marcus results",
    items: [
      "Checkout launched after beating the existing flow in testing",
      "Store finder that celebrates each location's character",
    ],
  },

  {
    id: "salesforce-3",
    section: "salesforce",
    kind: "mockup",
    heading: "Event calendar index",
    tasks: "Search + filtering patterns • design",
    onIndex: 8,
    indexOnly: true,
    media: [{ src: "/work/salesforce-3.png", alt: "Event calendar index" }],
  },
];
