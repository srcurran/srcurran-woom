import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';
import { fromHtml } from 'hast-util-from-html';
import { toHtml } from 'hast-util-to-html';

// Markdown images stay in Astro's image pipeline. Raw HTML media needs its own URLs.
export default {
  name: 'blog-relative-media',
  raw(node, ctx) {
    const root = path.resolve('src/content/blog');
    const source = ctx.fileURL && fileURLToPath(ctx.fileURL);
    if (!source || !source.startsWith(root + path.sep) || !/<(?:video|source|track|img)\b/i.test(node.value)) return;
    const tree = fromHtml(node.value, { fragment: true });
    function walk(element) {
      if (element.type === 'element' && ['video', 'source', 'track', 'img'].includes(element.tagName)) {
        for (const key of ['src', 'poster']) {
          const value = element.properties?.[key];
          if (typeof value !== 'string' || /^(?:[a-z]+:|\/|#)/i.test(value)) continue;
          const split = value.search(/[?#]/);
          const pathname = split < 0 ? value : value.slice(0, split);
          const suffix = split < 0 ? '' : value.slice(split);
          const absolute = path.resolve(path.dirname(source), decodeURIComponent(pathname));
          const relative = path.relative(root, absolute);
          if (relative.startsWith('..') || path.isAbsolute(relative)) throw new Error(`Blog media must be inside src/content/blog: ${value}`);
          if (!existsSync(absolute)) throw new Error(`Missing blog media: ${absolute}`);
          element.properties[key] = '/blog-media/' + relative.split(path.sep).map(encodeURIComponent).join('/') + suffix;
        }
      }
      element.children?.forEach(walk);
    }
    walk(tree);
    ctx.replaceNode(node, { type: 'raw', value: toHtml(tree) });
  },
};
