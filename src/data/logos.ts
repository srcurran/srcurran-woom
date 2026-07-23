/** The logo wall — the closing "where I've worked" card (the `logos` slide). */

/** One mark on the logo wall. Every asset is the logo alone — full-strength black
 *  artwork, no background and no baked-in opacity — so the card paints the backdrop
 *  and .logo-wall__mark knocks them all back to 50% together. SVG where the source
 *  is vector, PNG for the few marks that only exist as raster. */
export interface Logo {
  src: string;
  alt: string;
  /** Width as a % of the card width, taken from the Figma frame so each mark
   *  keeps its designed size relative to the others. Height follows the aspect. */
  w: number;
}

export interface LogoRow {
  /** Gap between this row's marks, as a % of the card width. Each row holds a
   *  different number of marks, so a per-row gap is what makes every row span
   *  the same ~67% of the card that the Figma frame does. */
  gap: number;
  marks: Logo[];
}

/** The logo wall, row by row (mirrors the Figma layout). */
export const logoWall: LogoRow[] = [
  {
    gap: 7.5,
    marks: [
      { src: "/work/logos/foyer.svg", alt: "Foyer", w: 23.26 },
      { src: "/work/logos/hawthorne.svg", alt: "Hawthorne", w: 36.44 },
    ],
  },
  {
    gap: 3.67,
    marks: [
      { src: "/work/logos/huge.svg", alt: "Huge", w: 9.91 },
      { src: "/work/logos/akqa.png", alt: "AKQA", w: 13.58 },
      { src: "/work/logos/rga.svg", alt: "R/GA", w: 23.26 },
      { src: "/work/logos/cuban-council.png", alt: "Cuban Council", w: 9.44 },
    ],
  },
  {
    gap: 5.12,
    marks: [
      { src: "/work/logos/publicis-sapient.svg", alt: "Publicis Sapient", w: 8.84 },
      { src: "/work/logos/said-differently.svg", alt: "Said Differently", w: 28.66 },
      { src: "/work/logos/savage-bureau.svg", alt: "Savage Bureau", w: 3.31 },
      { src: "/work/logos/greenstone.svg", alt: "Greenstone", w: 11.03 },
    ],
  },
  {
    gap: 6.62,
    marks: [
      { src: "/work/logos/grow.svg", alt: "GROW", w: 19.49 },
      { src: "/work/logos/ia-collaborative.svg", alt: "IA Collaborative", w: 26.29 },
      { src: "/work/logos/vsa.svg", alt: "VSA", w: 8.19 },
    ],
  },
];
