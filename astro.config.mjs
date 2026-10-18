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
        let n = 0;
        const lijf = html.slice(k).split(/(<script[\s\S]*?<\/script>)/).map((deel, i) => (i % 2 ? deel : deel
          .replace(/€ (?=[0-9])/g, '€&#160;')
          // Tabellen die horizontaal scrollen: bereikbaar met het toetsenbord en voorgelezen als gebied, elk met een eigen naam
          .replace(/<div class="(tabel-scroll[^"]*)"(?![^>]*tabindex)/g, (_, k) => `<div class="${k}" tabindex="0" role="region" aria-label="Tabel ${++n}"`)
          // Codeblokken die kunnen scrollen: ook bereikbaar met het toetsenbord
          .replace(/<pre(?![^>]*tabindex)(?=[\s>])/g, '<pre tabindex="0"')
          // Tabellen met drie of meer kolommen: de eerste cel van elke rij is de rijkop (WCAG 1.3.1)
          .replace(/<table\b[\s\S]*?<\/table>/g, (t) => {
            const kop = t.match(/<thead[\s\S]*?<\/thead>/)?.[0];
            if (!kop || (kop.match(/<th\b/g) ?? []).length < 3) return t;
            return t.replace(/<tbody[\s\S]*?<\/tbody>/, (body) => body.replace(/(<tr\b[^>]*>\s*)<td\b([^>]*)>([\s\S]*?)<\/td>/g, '$1<th scope="row"$2>$3</th>'));
          }))).join('');
        const nieuw = html.slice(0, k) + lijf;
        if (nieuw !== html) writeFileSync(p, nieuw);
      });
      loop(fileURLToPath(dir));
    },
  },
};

// Laatste wijziging per pagina voor de sitemap: de datum die ook op de pagina staat.
const lastmod = {};
const zoekDatums = (d, pad = '') => readdirSync(d).forEach((f) => {
  const p = join(d, f);
  if (statSync(p).isDirectory()) return zoekDatums(p, `${pad}${f}/`);
  if (f !== 'index.astro') return;
  const m = readFileSync(p, 'utf8').match(/(?:datum\s*=\s*|dateModified:\s*)["'](20\d\d-\d\d-\d\d)["']/);
  if (m) lastmod[`https://www.drijfveermedia.nl/${pad}`] = m[1];
});
zoekDatums(fileURLToPath(new URL('./src/pages/', import.meta.url)));
const uitSitemap = /^\/(404|bedankt|algemene-voorwaarden|admin)\/$/;

export default defineConfig({
  site: 'https://www.drijfveermedia.nl',
  trailingSlash: 'always',
  cacheDir: './.astro-cache', // eigen cache: node_modules wordt gedeeld met werkkopieën
  build: { format: 'directory' },
  integrations: [
    euroBijElkaar,
    sitemap({
      filter: (page) => !uitSitemap.test(new URL(page).pathname),
      serialize: (item) => (lastmod[item.url] ? { ...item, lastmod: lastmod[item.url] } : item),
    }),
  ],
});
