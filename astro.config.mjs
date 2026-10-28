// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site:'https://srperera.com',
  vite: {
    plugins: [tailwindcss()]
  },

  // English at the root, Spanish under /es/ (DECISIONS 2026-10-27); copy in src/data/site.ts and site.es.ts.
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },

  // /welcome and /guia are noindex, so they stay out of the sitemap; i18n adds the hreflang alternates.
  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes('/welcome') && !page.includes('/guia'),
      i18n: { defaultLocale: 'en', locales: { en: 'en', es: 'es' } },
    }),
  ]
});