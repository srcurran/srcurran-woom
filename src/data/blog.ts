export interface BlogLink {
  label: string;
  href: string;
}

export const blogNav: BlogLink[] = [
  { label: "Work", href: "/" },
  { label: "Blog", href: "/blog/" },
];

export const blogFooter = {
  lead: "Designing and building products end to end.",
  link: { label: "See my work", href: "/" } satisfies BlogLink,
};
