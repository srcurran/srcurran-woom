// @ts-check
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import blogMedia from './src/plugins/blog-media.mjs';

// https://astro.build/config
export default defineConfig({ markdown: { processor: satteri({ hastPlugins: [blogMedia] }) } });
