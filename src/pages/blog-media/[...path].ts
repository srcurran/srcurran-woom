import { readFile } from 'node:fs/promises';
import { readdirSync } from 'node:fs';
import path from 'node:path';
import type { APIRoute } from 'astro';

const root = path.resolve('src/content/blog');
export function getStaticPaths() {
  return readdirSync(root, { recursive: true, withFileTypes: true })
    .filter(entry => entry.isFile() && /\.(png|jpe?g|gif|webp|avif|svg|mp4|webm|mov|ogg|vtt)$/.test(entry.name))
    .map(entry => {
      const file = path.join(entry.parentPath, entry.name);
      return { params: { path: path.relative(root, file).split(path.sep).join('/') }, props: { file } };
    });
}
const types: Record<string, string> = {
  png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', gif: 'image/gif', webp: 'image/webp',
  avif: 'image/avif', svg: 'image/svg+xml', mp4: 'video/mp4', webm: 'video/webm', mov: 'video/quicktime',
  ogg: 'video/ogg', vtt: 'text/vtt',
};
export const GET: APIRoute = async ({ props }) => new Response(new Uint8Array(await readFile(props.file)), {
  headers: { 'Content-Type': types[props.file.split('.').pop()] ?? 'application/octet-stream' },
});
