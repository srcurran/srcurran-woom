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
  /** Greeting for a visitor whose name is the URL path; `{name}` is replaced. */
  headingNamed: "Hey {name}!",
  /** Opens the first paragraph when greeting by name. */
  leadNamed: "I'm Sean.",
  paragraphs: [
    "Full-stack designer with twenty years of diverse experience. I solve ambiguous problems with strategy, design craft and agentic development.",
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
        text: "Focal Point",
        href: "https://www.figma.com/community/plugin/1661755431369623402/focal-point-resize-dont-recrop",
      },
      { text: " • " },
      {
        text: "MacThing",
        href: "https://github.com/srcurran/MacThing",
      },
      { text: "." },
    ],
  ] satisfies NoteSegment[][],
};
