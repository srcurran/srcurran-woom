// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  adapter: vercel(),
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
