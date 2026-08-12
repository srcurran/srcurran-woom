const INLINE = /\*\*([^*]+)\*\*|__([^_]+)__|\*([^*]+)\*|(?<!\w)_([^_]+)_(?!\w)/g;

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
