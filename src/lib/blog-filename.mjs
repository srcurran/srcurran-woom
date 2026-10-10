import { basename } from 'node:path';

export function parsePostFilename(file) {
  const name = basename(file, '.md');
  const match = /^(\d{4}-\d{2}-\d{2})-(\d{2})(\d{2})--([\p{L}\p{N}]+(?:-[\p{L}\p{N}]+)*)$/u.exec(name);
  if (!match) throw new Error(`Invalid blog filename: ${file}. Use YYYY-MM-DD-HHmm--Post-Title.md`);
  const [, day, hour, minute, title] = match;
  const date = new Date(`${day}T${hour}:${minute}:00Z`);
  if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 16) !== `${day}T${hour}:${minute}`) {
    throw new Error(`Invalid date in blog filename: ${file}`);
  }
  return { slug: name.toLowerCase(), title: title.replaceAll('-', ' '), date };
}
