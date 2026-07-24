/**
 * Data barrel. Content is split by concern into sibling modules; this file
 * re-exports them all, so `../data/site` keeps resolving every symbol and
 * existing imports don't change. Prefer importing from the specific module in
 * new code.
 *
 *   meta        — site identity + About hero copy   (site, about)
 *   navigation  — side-nav sections                 (navSections)
 *   logos       — the closing logo wall             (logoWall)
 *   slides      — the deck: slide types + slides     (Slide, slides, …)
 *   contact     — footer + contact links            (footerContent, contactLinks, …)
 */

export * from "./meta";
export * from "./navigation";
export * from "./logos";
export * from "./slides";
export * from "./contact";
