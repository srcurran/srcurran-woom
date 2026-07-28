/** The "where I've worked" logo strip that loops under the intro copy. */

/** One mark in the strip.
 *
 *  THE ARTWORK CARRIES THE SIZING. Every asset is exported from the
 *  `logo-normalized` frames in the site-logos Figma file, where each mark was
 *  optically normalised by hand: scaled and seated inside a shared 40px-tall
 *  box until it holds the same weight as its neighbours. A 7:1 wordmark and a
 *  1:1 square can't be equalised by a number — sizing on height alone lets the
 *  square tower, sizing on width alone lets the wordmark run away, and matching
 *  ink area over-shrinks the solid marks. So the box is the answer: the padding
 *  baked into each SVG IS the optical correction, including the overshoot the
 *  round and pointed marks need to sit level with the flat-edged ones.
 *
 *  Which means the strip just renders every mark at ONE height and lets width
 *  follow from the asset's own aspect. No per-mark multipliers to keep in sync.
 *
 *  Every asset is the logo alone — full-strength black artwork, no background
 *  and no baked-in opacity — so the page shows through and the knock-back is
 *  applied once in CSS rather than per-asset. All SVG; the two that used to be
 *  raster (AKQA, Cuban Council) were vectorised in the same pass.
 */
export interface Logo {
  src: string;
  alt: string;
  /** Escape hatch, as a multiple of the strip's base height. Omit it — the
   *  normalised artwork should not need one. Set it only to nudge a single mark
   *  without re-exporting, and prefer fixing the Figma frame instead. */
  h?: number;
}

/** The strip, in reading order. The loop renders this list twice (see
 *  LogoStrip.astro), so this order IS the layout — and with every mark now at
 *  the same height, position is what gives the first few their billing. */
export const logos: Logo[] = [
  { src: "/work/logos/cuban-council.svg", alt: "Cuban Council" },
  { src: "/work/logos/huge.svg", alt: "Huge" },
  { src: "/work/logos/foyer.svg", alt: "Foyer" },
  { src: "/work/logos/akqa.svg", alt: "AKQA" },
  { src: "/work/logos/hawthorne.svg", alt: "Hawthorne" },
  { src: "/work/logos/rga.svg", alt: "R/GA" },
  { src: "/work/logos/publicis-sapient.svg", alt: "Publicis Sapient" },
  { src: "/work/logos/grow.svg", alt: "GROW" },
  { src: "/work/logos/said-differently.svg", alt: "Said Differently" },
  { src: "/work/logos/savage-bureau.svg", alt: "Savage Bureau" },
  { src: "/work/logos/vsa.svg", alt: "VSA" },
  { src: "/work/logos/ia-collaborative.svg", alt: "IA Collaborative" },
  { src: "/work/logos/greenstone.svg", alt: "Greenstone" },
];
