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

/** A short hyphenated compound reads as one word, so a line shouldn't break
 *  inside it ("successful 0-" / "to-1 launch"). CSS has no lever for this —
 *  `line-break` and `word-break` are about CJK and long unbroken strings — so the
 *  compound is wrapped and held together with white-space. Long ones are left
 *  breakable rather than risk overflowing a narrow card.
 *
 *  The bounds exclude letters, digits and hyphens but allow the emphasis markers,
 *  so a compound still matches inside __…__, and the markup injected here carries
 *  no `_` or `*` for the pass below to trip over. */
const COMPOUND = /(?<![A-Za-z0-9-])[A-Za-z0-9]+(?:-[A-Za-z0-9]+)+(?![A-Za-z0-9-])/g;

export function emphasize(text: string): string {
  return text
    .replace(COMPOUND, (word) =>
      word.length > 16 ? word : `<span class="nobr">${word}</span>`,
    )
    .replace(INLINE, (_match, bold, underline, starItalic, underItalic) => {
      if (bold !== undefined) return `<strong>${bold}</strong>`;
      if (underline !== undefined) return `<u class="slide__em">${underline}</u>`;
      return `<em>${starItalic ?? underItalic}</em>`;
    });
}
