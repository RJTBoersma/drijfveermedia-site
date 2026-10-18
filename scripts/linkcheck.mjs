// Controleert alle interne links in dist/: bestaat het doel? Draai na de build.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';
const paginas = JSON.parse(readFileSync(new URL('./paginas.json', import.meta.url), 'utf8'));
const gepland = new Set(paginas.map((p) => p.url));
const alle = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? alle(p) : p.endsWith('.html') ? [p] : []; });
const kapot = new Map();
const DIST = process.env.DIST ?? 'dist';
for (const f of alle(DIST)) {
  const html = readFileSync(f, 'utf8');
  for (const [, href] of html.matchAll(/href="(\/[^"#?]*)/g)) {
    if (/^\/(_astro|img|api|admin)\/|\.(svg|png|ico|xml|webmanifest|jpg|txt|pdf)$/.test(href)) continue;
    const doel = href.endsWith('/') ? join(DIST, href, 'index.html') : join(DIST, href);
    if (!existsSync(doel)) { const k = `${href}${gepland.has(href) ? ' (gepland, nog niet gebouwd)' : ''}`; kapot.set(k, (kapot.get(k) ?? new Set()).add(f.replace(/^dist|index\.html$/g, ''))); }
  }
}
for (const [k, v] of kapot) console.log(`✗ ${k}  ← ${[...v].slice(0, 4).join(', ')}${v.size > 4 ? ` (+${v.size - 4})` : ''}`);
console.log(kapot.size ? `\n${kapot.size} kapotte linkdoelen.` : 'Alle interne links werken.');
process.exit([...kapot.keys()].some((k) => !k.includes('gepland')) || process.argv.includes('--streng') && kapot.size ? 1 : 0);
