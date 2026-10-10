import { getCollection } from 'astro:content';
import { parsePostFilename } from './blog-filename.mjs';

export async function getPosts() {
  const entries = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
  return entries.map(entry => ({
    ...entry,
    ...parsePostFilename(entry.filePath!),
    title: entry.data.title ?? parsePostFilename(entry.filePath!).title,
  })).sort((a, b) => b.date.getTime() - a.date.getTime() || a.id.localeCompare(b.id));
}
export type Post = Awaited<ReturnType<typeof getPosts>>[number];
export const postUrl = (post: Post) => `/blog/${encodeURIComponent(post.slug)}/`;
export const formatPostDate = (date: Date) => date.toLocaleDateString('en-US', {
  month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC',
});
