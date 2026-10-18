import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Na de build: een euroteken en het bedrag erna blijven bij elkaar (vaste spatie), ook in smalle tabellen.
// Alleen in gewone HTML, niet in scripts zoals het JSON-LD-schema.
const euroBijElkaar = {
  name: 'euro-bij-elkaar',
  hooks: {
    'astro:build:done': ({ dir }) => {
      const loop = (d) => readdirSync(d).forEach((f) => {
        const p = join(d, f);
        if (statSync(p).isDirectory()) return loop(p);
        if (!p.endsWith('.html')) return;
        const html = readFileSync(p, 'utf8');
        const k = html.indexOf('<body');
        if (k < 0) return;
        const lijf = html.slice(k).split(/(<script[\s\S]*?<\/script>)/).map((deel, i) => (i % 2 ? deel : deel.replace(/€ (?=[0-9])/g, '€&#160;'))).join('');
        const nieuw = html.slice(0, k) + lijf;
        if (nieuw !== html) writeFileSync(p, nieuw);
      });
      loop(fileURLToPath(dir));
    },
  },
};

export default defineConfig({
  site: 'https://www.drijfveermedia.nl',
  trailingSlash: 'always',
  cacheDir: './.astro-cache', // eigen cache: node_modules wordt gedeeld met werkkopieën
  build: { format: 'directory' },
  integrations: [
    euroBijElkaar,
    sitemap({
      filter: (page) => !page.includes('/bedankt/') && !page.includes('/404') && !page.includes('/algemene-voorwaarden/'),
    }),
  ],
});
