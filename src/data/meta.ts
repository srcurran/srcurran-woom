/** Site identity + the About hero copy. About lives as page content (the hero),
 *  not as a deck slide. */

export const site = {
  name: "Sean Curran",
  role: "Product Design-Engineer",
  email: "srcurran@gmail.com",
} as const;

export const about = {
  /** / — the short greeting. */
  heading: "Hi, I'm Sean.",
  /** /work — the longer greeting. Both routes render the same page, so the
   *  opening word is the only thing separating them. */
  headingFull: "Hello, I'm Sean.",
  paragraphs: [
    "Full stack designer with nearly two decades of diverse experience. Working on projects from checkout optimization to 0-to-1 app creation, in fashion and fintech, for startups and design firms.",
    "Agency hustle, start-up grit. A designer's eye and developer's mind.",
  ],
  // No "Previously at: …" line — the logo strip directly below the hero is that
  // list, in the actual marks.
  notes: ["Currently Staff Designer at Foyer."],
};
