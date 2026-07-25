/** The "where I've worked" logo strip that sits on the page below the deck. */

/** One mark in the strip. Every asset is the logo alone — full-strength black
 *  artwork, no background and no baked-in opacity — so the page paints the
 *  backdrop and .logo-strip__mark knocks them all back together. SVG where the
 *  source is vector, PNG for the few marks that only exist as raster. */
export interface Logo {
  src: string;
  alt: string;
  /** Relative HEIGHT, as a multiple of the strip's base height (see
   *  --logo-strip-height in components.css); width follows from the asset's own
   *  aspect. Sizing on height is what keeps the row level — these marks run from
   *  a 7:1 wordmark to a 1:1 square, and sizing them on width let the square
   *  ones tower over the wide ones.
   *
   *  It isn't a flat 1 for everyone, because equal height doesn't mean equal
   *  presence: a mark carrying two lines of text, or an icon plus a name, needs
   *  more of it than a single-line wordmark to stay readable. Three steps:
   *
   *    1     single-line wordmark          (foyer, hawthorne, R/GA, …)
   *    1.35  two-line lockup or icon+name  (Publicis Sapient, Greenstone, …)
   *    1.45  standalone icon / square mark (Huge, Savage Bureau)
   */
  h: number;
  /** Top billing: drawn a step larger and less knocked-back than the rest.
   *  Leads come first in the array, so they also lead the row. */
  lead?: boolean;
}

/** The strip, in reading order — one row, so this order IS the layout. The three
 *  leads open it; the rest follow. */
export const logos: Logo[] = [
  { src: "/work/logos/foyer.svg", alt: "Foyer", h: 1, lead: true },
  { src: "/work/logos/huge.svg", alt: "Huge", h: 1.45, lead: true },
  { src: "/work/logos/akqa.png", alt: "AKQA", h: 1, lead: true },
  { src: "/work/logos/hawthorne.svg", alt: "Hawthorne", h: 1 },
  { src: "/work/logos/rga.svg", alt: "R/GA", h: 1 },
  { src: "/work/logos/cuban-council.png", alt: "Cuban Council", h: 1.35 },
  { src: "/work/logos/publicis-sapient.svg", alt: "Publicis Sapient", h: 1.35 },
  { src: "/work/logos/said-differently.svg", alt: "Said Differently", h: 1 },
  { src: "/work/logos/savage-bureau.svg", alt: "Savage Bureau", h: 1.45 },
  { src: "/work/logos/greenstone.svg", alt: "Greenstone", h: 1.35 },
  { src: "/work/logos/grow.svg", alt: "GROW", h: 1 },
  { src: "/work/logos/ia-collaborative.svg", alt: "IA Collaborative", h: 1 },
  { src: "/work/logos/vsa.svg", alt: "VSA", h: 1 },
];
