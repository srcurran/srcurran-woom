/** Side-nav / scroll-spy sections (also drives deep-link ids). */

export interface NavSection {
  id: string;
  label: string;
}

export const navSections: NavSection[] = [
  { id: "about", label: "About" },
  { id: "foyer", label: "Foyer" },
  { id: "ohsee", label: "Ohsee" },
  { id: "hawthorne", label: "Hawthorne" },
  { id: "app-omni", label: "App Omni" },
  { id: "neiman-marcus", label: "Neiman Marcus" },
  { id: "salesforce", label: "Salesforce" },
  { id: "contact", label: "Contact" },
];
