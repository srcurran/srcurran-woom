export const site = {
  name: "Sean Curran",
  role: "Product Design-Engineer",
  email: "srcurran@gmail.com",
} as const;

export interface SideProject {
  label: string;
  href: string;
}

export const about = {
  heading: "Hi, I'm Sean.",
  headingFull: "Hello, I'm Sean.",
  paragraphs: [
    "Full-stack designer with nearly two decades of diverse experience. Working on projects from checkout optimization to 0-to-1 app creation, in fashion and fintech, for startups and design firms.",
    "Agency hustle, startup grit. A designer's eye and developer's mind.",
  ],
  notes: ["Currently Staff Designer at Foyer."],
  /** Lead-in for the side-project links that follow the notes. */
  sideProjectsLead: "Also building",
  sideProjects: [
    { label: "Ohsee, visual QA", href: "https://ohsee.app" },
    {
      label: "Focal Point, a Figma plugin",
      href: "https://www.figma.com/community/plugin/1661755431369623402/focal-point-resize-dont-recrop",
    },
  ] satisfies SideProject[],
};
