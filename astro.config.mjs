import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://dryclimatebeauty.com',
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/draft/'),
    }),
  ],
  build: {
    format: 'directory',
  },
});
