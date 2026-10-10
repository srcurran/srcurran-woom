const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

const INLINE = /\*\*([^*]+)\*\*|__([^_]+)__|\*([^*]+)\*|(?<!\w)_([^_]+)_(?!\w)/g;

const COMPOUND = /(?<![A-Za-z0-9-])[A-Za-z0-9]+(?:-[A-Za-z0-9]+)+(?![A-Za-z0-9-])/g;

function format(text: string): string {
  return text
    .replace(COMPOUND, (word) =>
      word.length > 16 ? word : `<span class="nobr">${word}</span>`,
    )
    .replace(INLINE, (_match, bold, highlight, starItalic, underItalic) => {
      if (bold !== undefined) return `<strong>${bold}</strong>`;
      if (highlight !== undefined)
        return `<mark class="slide__em">${highlight}</mark>`;
      return `<em>${starItalic ?? underItalic}</em>`;
    });
}

export function emphasize(text: string): string {
  let html = "";
  let last = 0;
  for (const match of text.matchAll(LINK)) {
    const [whole, label, href] = match;
    html += format(text.slice(last, match.index));
    html += `<a class="slide__link" href="${href}" target="_blank" rel="noopener noreferrer">${format(label)}</a>`;
    last = match.index + whole.length;
  }
  return html + format(text.slice(last));
}
