import { site } from "./meta";

export const footerContent = {
  heading: "Reach out",
  location: "Based in Portland, Maine 🦞",
  tech: "Built with Astro + GSAP.",
} as const;

export interface FooterLink {
  label: string;
  href: string;
}

export interface ContactLink {
  label: string;
  href: string;
  /** Opens in a new tab (off-site links, not mailto/tel). */
  external?: boolean;
}

export const contactLinks: ContactLink[] = [
  { label: "srcurran@gmail.com", href: `mailto:${site.email}` },
  { label: "207-572-0916", href: "tel:+12075720916" },
  { label: "linkedin.com/in/srcurran", href: "https://www.linkedin.com/in/srcurran", external: true },
  { label: "github.com/srcurran (personal)", href: "https://github.com/srcurran", external: true },
  { label: "are.na/sean-curran/channels", href: "https://www.are.na/sean-curran/channels", external: true },
];
