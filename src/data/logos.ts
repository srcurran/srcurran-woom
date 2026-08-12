export interface Logo {
  src: string;
  alt: string;
  /** Escape hatch, as a multiple of the strip's base height. Omit it — the
   *  normalised artwork should not need one. Fix the Figma frame instead. */
  h?: number;
}

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
