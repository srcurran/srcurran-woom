// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import { satteri } from '@astrojs/markdown-satteri';
import blogMedia from './src/plugins/blog-media.mjs';

// https://astro.build/config
export default defineConfig({
  adapter: vercel(),
  markdown: { processor: satteri({ hastPlugins: [blogMedia] }) },
  integrations: [
    {
      name: 'bundle-server-dependencies',
      hooks: {
        'astro:config:setup': ({ command, updateConfig }) => {
          if (command === 'build') updateConfig({ vite: { ssr: { noExternal: true } } });
        },
      },
    },
  ],
});
