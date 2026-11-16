// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://inodepi.github.io',
  base: '/reyesroofing-demo',
  vite: {
    plugins: [tailwindcss()],
  },
});
