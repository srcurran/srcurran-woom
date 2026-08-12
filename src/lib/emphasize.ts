const INLINE = /\*\*([^*]+)\*\*|__([^_]+)__|\*([^*]+)\*|(?<!\w)_([^_]+)_(?!\w)/g;

export function emphasize(text: string): string {
  return text.replace(INLINE, (_match, bold, underline, starItalic, underItalic) => {
    if (bold !== undefined) return `<strong>${bold}</strong>`;
    if (underline !== undefined) return `<u class="slide__em">${underline}</u>`;
    return `<em>${starItalic ?? underItalic}</em>`;
  });
}
