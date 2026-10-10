import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { parsePostFilename } from './lib/blog-filename.mjs';

const blog = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/blog',
    generateId: ({ entry }) => parsePostFilename(entry).slug,
  }),
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});
export const collections = { blog };
