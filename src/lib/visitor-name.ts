import { about } from "../data/meta";

const NAME = /^[\p{L}\p{M}' ]{1,32}$/u;

export function visitorName(segment: string | undefined): string | null {
  if (!segment) return null;
  const name = segment.replace(/[-_+]+/g, " ").replace(/\s+/g, " ").trim();
  if (!NAME.test(name)) return null;
  return isMixedCase(name) ? name : titleCase(name);
}

const isMixedCase = (text: string): boolean =>
  text !== text.toLowerCase() && text !== text.toUpperCase();

const titleCase = (text: string): string =>
  text
    .toLowerCase()
    .replace(/(^|\s)(\p{L})/gu, (_match, gap, letter) => gap + letter.toUpperCase());

export const greet = (name: string): string =>
  about.headingNamed.replace("{name}", name);

export function greeting(): [before: string, after: string] {
  const [before = "", after = ""] = about.headingNamed.split("{name}");
  return [before, after];
}
