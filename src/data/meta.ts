export const site = {
  name: "Sean Curran",
  role: "Product Design-Engineer",
  email: "srcurran@gmail.com",
} as const;

export interface NoteSegment {
  text: string;
  /** Renders this run as a link. */
  href?: string;
}

export const about = {
  heading: "Hi, I'm Sean.",
  headingFull: "Hello, I'm Sean.",
  paragraphs: [
    "Full-stack designer with nearly two decades of diverse experience. Working on projects from checkout optimization to 0-to-1 app creation, in fashion and fintech, for startups and design firms.",
    "Agency hustle, startup grit. A designer's eye and developer's mind.",
  ],
  notes: [
    [
      { text: "Currently: Staff Designer at " },
      { text: "Foyer", href: "https://foyersavings.com" },
      { text: "." },
    ],
    [
      { text: "Projects: " },
      {
        text: "Ohsee QA",
        href: "https://www.npmjs.com/package/ohsee-qa",
      },
      { text: " • " },
      {
        text: "Focal Point (Figma plugin)",
        href: "https://www.figma.com/community/plugin/1661755431369623402/focal-point-resize-dont-recrop",
      },
      { text: "." },
    ],
  ] satisfies NoteSegment[][],
};
