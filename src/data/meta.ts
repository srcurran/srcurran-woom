/** Site identity + the About hero copy. About lives as page content (the hero),
 *  not as a deck slide. */

export const site = {
  name: "Sean Curran",
  role: "Product Design-Engineer",
  email: "srcurran@gmail.com",
} as const;

export const about = {
  /** Home — the short greeting for the short (highlights) deck. */
  heading: "Hi, I'm Sean.",
  /** /work — the longer greeting for the full portfolio. The opening word is
   *  the tell for which depth of deck you've landed in. */
  headingFull: "Hello, I'm Sean.",
  paragraphs: [
    "Full stack designer with nearly two decades of diverse experience. Working on projects from checkout optimization to 0-to-1 app creation, in fashion and fintech, for startups and design firms.",
    "Agency hustle, start-up grit. A designer's eye and developer's mind.",
  ],
  notes: [
    "Currently Staff Designer at Foyer.",
    "Previously at: AKQA · Huge · R/GA · Hawthorne · Cuban Council · &c",
  ],
};
