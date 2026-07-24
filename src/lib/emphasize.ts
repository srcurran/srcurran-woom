/** `__phrase__` → underlined emphasis (not a link). Used by the text-kind cards
 *  (bio / intro / results) with `set:html`. */
export function emphasize(text: string): string {
  return text.replace(/__([^_]+)__/g, '<u class="slide__em">$1</u>');
}
