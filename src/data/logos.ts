/** The "where I've worked" logo strip that sits on the page below the deck. */

/** One mark in the strip. Every asset is the logo alone — full-strength black
 *  artwork, no background and no baked-in opacity — so the page paints the
 *  backdrop and .logo-strip__mark knocks them all back together. SVG where the
 *  source is vector, PNG for the few marks that only exist as raster. */
export interface Logo {
  src: string;
  alt: string;
  /** Relative width, taken from the Figma frame, so each mark keeps its designed
   *  size against the others (a wordmark reads wider than an icon). The strip
   *  multiplies this by one shared scale — see --logo-strip-scale in
   *  components.css — so the whole set resizes from a single number. Height
   *  follows the aspect. */
  w: number;
  /** Top billing: drawn a step larger and less knocked-back than the rest.
   *  Leads come first in the array, so they also lead the row. */
  lead?: boolean;
}

/** The strip, in reading order — one row, so this order IS the layout. The three
 *  leads open it; the rest follow. */
export const logos: Logo[] = [
  { src: "/work/logos/foyer.svg", alt: "Foyer", w: 23.26, lead: true },
  { src: "/work/logos/huge.svg", alt: "Huge", w: 9.91, lead: true },
  { src: "/work/logos/akqa.png", alt: "AKQA", w: 13.58, lead: true },
  { src: "/work/logos/hawthorne.svg", alt: "Hawthorne", w: 36.44 },
  { src: "/work/logos/rga.svg", alt: "R/GA", w: 23.26 },
  { src: "/work/logos/cuban-council.png", alt: "Cuban Council", w: 9.44 },
  { src: "/work/logos/publicis-sapient.svg", alt: "Publicis Sapient", w: 8.84 },
  { src: "/work/logos/said-differently.svg", alt: "Said Differently", w: 28.66 },
  { src: "/work/logos/savage-bureau.svg", alt: "Savage Bureau", w: 3.31 },
  { src: "/work/logos/greenstone.svg", alt: "Greenstone", w: 11.03 },
  { src: "/work/logos/grow.svg", alt: "GROW", w: 19.49 },
  { src: "/work/logos/ia-collaborative.svg", alt: "IA Collaborative", w: 26.29 },
  { src: "/work/logos/vsa.svg", alt: "VSA", w: 8.19 },
];
