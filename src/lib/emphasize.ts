/** Markdown-ish inline emphasis for the text-kind cards (bio / intro / results),
 *  rendered with `set:html`:
 *
 *    **phrase**  → bold      (Merriweather 700 against the 300 body)
 *    _phrase_    → italic    (*phrase* works too)
 *    __phrase__  → underline (not a link — the house emphasis mark)
 *
 *  One pass over the string, so a replacement's own markup is never rescanned —
 *  which matters here because the underline's class name (`slide__em`) contains
 *  the very underscores the italic rule looks for. Double-char forms come first
 *  in the alternation so `__x__` can't be read as two italics, and the single
 *  `_` needs word boundaries so an identifier like snake_case_name survives.
 *  (This runs at build time, in Node — the cards ship as static HTML.)
 */
const INLINE = /\*\*([^*]+)\*\*|__([^_]+)__|\*([^*]+)\*|(?<!\w)_([^_]+)_(?!\w)/g;

export function emphasize(text: string): string {
  return text.replace(INLINE, (_match, bold, underline, starItalic, underItalic) => {
    if (bold !== undefined) return `<strong>${bold}</strong>`;
    if (underline !== undefined) return `<u class="slide__em">${underline}</u>`;
    return `<em>${starItalic ?? underItalic}</em>`;
  });
}
