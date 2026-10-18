// Tekstcontrole, draait automatisch na elke build (npm run build).
// Controleert elke pagina in dist/ op:
//   1. het woorddoel van het paginatype (scripts/paginas.json, zelfde doelen als in het plan)
//   2. kenmerken waaraan je AI-tekst herkent
// Bij een melding faalt de build. Een pagina die niet door de check komt, laat ik niet zien.
// Met --lancering controleert hij ook of alle pagina's uit de structuur bestaan (alles gaat in één keer live).
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const paginas = JSON.parse(readFileSync(new URL('./paginas.json', import.meta.url), 'utf8'));
const perUrl = new Map(paginas.map((p) => [p.url, p]));
const lancering = process.argv.includes('--lancering');
// --alleen=/url/,/url/ : alleen deze pagina's controleren (voor een schrijver in een eigen werkplek)
const alleen = (process.argv.find((a) => a.startsWith('--alleen=')) ?? '').slice(9).split(',').filter(Boolean);
const fmt = (n) => n.toLocaleString('nl-NL');

const verboden = [
  'cruciaal', 'cruciale', 'essentieel', 'essentiële', 'naadloos', 'naadloze', 'robuust', 'robuuste', 'ontdek', 'ontgrendel',
  'duik in', 'duiken we', 'tapijt', 'holistisch', 'holistische', 'in de snel veranderende', 'digitale wereld', 'digitale landschap',
  'kortom', 'het is belangrijk om', 'speelt een belangrijke rol', 'speelt een cruciale rol', 'of je nu', 'laten we eens', 'laten we beginnen', 'laten we kijken', 'in de wereld van',
  'next level', 'game changer', 'gamechanger', 'revolutionair', 'naar een hoger niveau', 'oplossingen op maat', 'op maat gemaakte',
  'toegevoegde waarde', 'synergie', 'ontzorgen', 'al met al', 'tot slot', 'in een notendop', 'het geheim van', 'nooit eerder',
  'stel je voor', 'de sleutel tot', 'baanbrekend', 'state-of-the-art', 'optimaliseren van je', 'boost', 'skyrocket', 'unlock',
  'gender', 'gay', 'woke', 'inclusie',
];
// Eigennamen tellen niet mee bij de controle op Engelse hoofdletters in koppen.
const eigenNamen = new Set(['Google', 'Bing', 'Apple', 'Business', 'Connect', 'Places', 'Maps', 'Kaarten', 'ChatGPT', 'Gemini', 'Copilot', 'Perplexity', 'Microsoft', 'Overviews', 'Drijfveer', 'Media', 'Search', 'Console', 'Analytics', 'Shopping', 'WordPress', 'Instagram', 'LinkedIn', 'Facebook', 'Bedrijfsprofiel', 'Drenthe', 'Friesland', 'Groningen', 'Assen', 'Emmen', 'Zwolle', 'Willemfikstt', 'Thorgall', 'Claude', 'Anthropic', 'OpenAI', 'Perplexity', 'Leeuwarden', 'Heerenveen', 'Drachten', 'Sneek', 'Joure', 'Meppel', 'Hoogeveen', 'Veendam', 'Stadskanaal', 'Tag', 'Manager', 'Looker', 'Studio', 'Ads', 'Grants', 'Stories', 'Copilot', 'Overview', 'Mode']);
const opsommers = ['bovendien', 'daarnaast', 'verder', 'tevens', 'echter'];

function bestanden(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? bestanden(p) : p.endsWith('.html') ? [p] : [];
  });
}

function tekstVan(html) {
  const main = html.match(/<main[^>]*>([\s\S]*)<\/main>/)?.[1] ?? '';
  // Tekst in getekende scènes (svg) telt niet mee: dat zijn labels in een plaatje, geen lopende tekst.
  return main.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<svg[\s\S]*?<\/svg>/g, ' ')
    .replace(/<(h[1-6]|p|li|summary|blockquote|td|th|figcaption)[^>]*>/g, '\n')
    .replace(/<[^>]+>/g, ' ').replace(/&nbsp;|&#160;/g, ' ').replace(/&amp;/g, '&').replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"');
}

// ---------- SEO ----------
// Zoekwoord als patroon: spatie, koppelteken of aaneengeschreven ("marketingbureau"), met meervoud/verbuiging achteraan.
// Een klein woordje ertussen mag ook: "webdesign in Assen" telt voor "webdesign assen", zoals Google het ook leest.
const norm = (s) => s.toLowerCase().replace(/&amp;/g, '&').replace(/&#39;|’/g, "'").replace(/<[^>]+>/g, ' ').replace(/[_/]|(?<=[a-z0-9])[.,:](?=[a-z0-9])/g, ' ').replace(/\s+/g, ' ');
const esc = (w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const patroon = (kw) => new RegExp(`(?<![a-zà-ÿ0-9])${kw.toLowerCase().split(/[\s-]+/).map(esc).join("(?:[\\s-]?|\\s+(?:in|uit|voor|bij|te|van|de|het|een|je|jouw|met|op|tussen)\\s+)")}(?:s|'s|en|e|n)?(?![a-zà-ÿ0-9])`, 'g');
const telt = (tekst, kw) => (norm(tekst).match(patroon(kw)) ?? []).length;
const bevat = (tekst, kws) => kws.some((k) => telt(tekst, k) > 0);
const tags = (html, tag) => [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)</${tag}>`, 'g'))].map((m) => m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim());
const AIDA = ['attention', 'interest', 'desire', 'action'];

function seoCheck(html, tekst, aantal, p) {
  const m = [];
  if (/<meta name="robots" content="noindex/.test(html)) return m; // niet in Google, dus geen SEO-eisen
  const main = html.match(/<main[^>]*>([\s\S]*)<\/main>/)?.[1] ?? '';
  const titel = (html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? '').replace(/&amp;/g, '&');
  const desc = (html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '').replace(/&amp;/g, '&');
  const h1 = tags(main, 'h1');
  const h2 = tags(main, 'h2');
  if (titel.length < 30 || titel.length > 60) m.push(`title is ${titel.length} tekens, wil 30 tot 60: "${titel}"`);
  if (desc.length < 120 || desc.length > 160) m.push(`meta description is ${desc.length} tekens, wil 120 tot 160`);
  if (h1.length !== 1) m.push(`${h1.length} H1-koppen, wil er precies 1`);
  // Afbeeldingen zonder alt
  const zonderAlt = [...main.matchAll(/<img\b(?![^>]*\balt=)[^>]*>/g)].length;
  if (zonderAlt) m.push(`${zonderAlt} afbeelding(en) zonder alt-tekst`);
  // Interne links
  const intern = new Set([...main.matchAll(/href="(\/[^"#?]*)/g)].map((x) => x[1]));
  if (p.zoekwoord && intern.size < 3) m.push(`maar ${intern.size} interne links in de tekst, wil er minstens 3`);
  const ouder = p.url.split('/').filter(Boolean).slice(0, -1);
  if (p.type === 'cluster' && ouder.length && !intern.has(`/${ouder.join('/')}/`)) m.push(`linkt niet naar de pillar /${ouder.join('/')}/`);

  if (p.zoekwoord) {
    const kw = p.zoekwoord;
    const alle = [kw, ...(p.varianten ?? [])];
    if (!bevat(titel, [kw])) m.push(`zoekwoord "${kw}" staat niet in de title`);
    else if (norm(titel).search(patroon(kw)) > norm(titel).length * 0.4) m.push(`zoekwoord staat niet vooraan in de title: "${titel}"`);
    if (!/\| Drijfveer Media$/.test(titel) && titel.length <= 42) m.push('title eindigt niet op "| Drijfveer Media" terwijl daar ruimte voor is');
    if (!/[.!?]$/.test(desc.trim())) m.push('meta description eindigt niet op een hele zin');
    if (!/<meta property="og:image" content="https:\/\/[^"]+"/.test(html)) m.push('og:image ontbreekt');
    if (!bevat(desc, alle)) m.push(`zoekwoord staat niet in de meta description`);
    if (h1.length && !bevat(h1[0], [kw])) m.push(`zoekwoord "${kw}" staat niet in de H1: "${h1[0]}"`);
    const begin = norm(tekst).split(' ').filter(Boolean).slice(0, 100).join(' ');
    if (!bevat(begin, [kw])) m.push(`zoekwoord staat niet in de eerste 100 woorden`);
    const h2met = h2.filter((h) => bevat(h, alle)).length;
    if (h2.length && !h2met) m.push(`zoekwoord of variant staat in geen enkele H2`);
    if (h2.length >= 4 && h2met / h2.length > 0.5) m.push(`zoekwoord in ${h2met} van ${h2.length} H2's: te veel, leest als volgepropt`);
    // Dichtheid: woorden die tot het zoekwoord (of een variant) behoren, gedeeld door alle woorden
    const kwWoorden = alle.reduce((som, k) => som + telt(tekst, k) * (k.toLowerCase().match(/[a-zà-ÿ0-9€%'’-]+/g) ?? []).length, 0); // zelfde woordtelling als de pagina
    const dichtheid = (kwWoorden / aantal) * 100;
    if (dichtheid < 0.5) m.push(`zoekwoorddichtheid ${dichtheid.toFixed(2)}%, wil 0,5 tot 2,5%`);
    if (dichtheid > 2.5) m.push(`zoekwoorddichtheid ${dichtheid.toFixed(2)}%, wil 0,5 tot 2,5% (volgepropt)`);
    // Semantiek: begrippen die in de top 5 van Google telkens terugkomen
    if (!p.semantiek?.length) m.push('semantische analyse ontbreekt nog (termen uit de top 5 van Google)');
    else {
      const mist = p.semantiek.filter((t) => !bevat(tekst, [t]));
      const dekking = 1 - mist.length / p.semantiek.length;
      if (dekking < 0.7) m.push(`semantische dekking ${Math.round(dekking * 100)}%, wil minstens 70%. Ontbreekt: ${mist.join(', ')}`);
    }
  }
  // AIDA: de blokken moeten er alle vier zijn, in die volgorde
  if (p.aida) {
    const volgorde = [...main.matchAll(/data-aida="([a-z]+)"/g)].map((x) => x[1]);
    const ontbreekt = AIDA.filter((a) => !volgorde.includes(a));
    if (ontbreekt.length) m.push(`AIDA-blok ontbreekt: ${ontbreekt.join(', ')}`);
    else if (AIDA.map((a) => volgorde.indexOf(a)).some((v, i, arr) => i && v < arr[i - 1])) m.push(`AIDA-blokken staan niet in de volgorde attention, interest, desire, action`);
    if (!/href="(\/gratis-website-analyse\/|\/contact\/|tel:)/.test(main)) m.push('geen call to action (scan, contact of bellen)');
  }
  return m;
}

// Elk zoekwoord, elke title en elke description maar één keer op de hele site (geen kannibalisatie)
const dubbel = (lijst) => [...new Set(lijst.filter((x, i) => x && lijst.indexOf(x) !== i))];
const dubbeleKw = dubbel(paginas.map((p) => p.zoekwoord));

let totaalProblemen = 0;
if (dubbeleKw.length) { console.log(`✗ zelfde zoekwoord op meerdere pagina's: ${dubbeleKw.join(', ')}`); totaalProblemen += dubbeleKw.length; }
const titels = [], descs = [];
for (const f of bestanden('dist')) {
  const ruw = readFileSync(f, 'utf8');
  const tekst = tekstVan(ruw);
  if (!/noindex/.test(ruw)) {
    titels.push(ruw.match(/<title>([\s\S]*?)<\/title>/)?.[1]);
    descs.push(ruw.match(/<meta name="description" content="([^"]*)"/)?.[1]);
  }
  const laag = tekst.toLowerCase();
  const woorden = laag.match(/[a-zà-ÿ0-9€%'’-]+/g) ?? [];
  const url = '/' + f.replace(/^dist\/?/, '').replace(/index\.html$/, '').replace(/\\/g, '/');
  const pagina = perUrl.get(url);
  if (alleen.length && !alleen.includes(url)) continue;
  if (woorden.length < 40 && !pagina?.min) continue;
  const meldingen = [];
  // Twee keer dezelfde overgangsnaam op één pagina breekt de animatie bij het klikken
  const namen = [...ruw.matchAll(/view-transition-name:\s*([a-z0-9-]+)/gi)].map((x) => x[1]);
  const dubbelNaam = [...new Set(namen.filter((x, i) => namen.indexOf(x) !== i))];
  if (dubbelNaam.length) meldingen.push(`dezelfde view-transition-name meer dan eens op de pagina: ${dubbelNaam.join(', ')} (link niet naar de pagina zelf en niet twee keer naar dezelfde pagina met een plaatje)`);
  // Elke id maar één keer (scènes met dezelfde gradient-id breken elkaar)
  const ids = [...ruw.matchAll(/\sid="([^"]+)"/g)].map((x) => x[1]);
  const dubbelId = [...new Set(ids.filter((x, i) => ids.indexOf(x) !== i))];
  if (dubbelId.length) meldingen.push(`dubbele id's: ${dubbelId.join(', ')}`);
  if (pagina?.min && woorden.length < pagina.min) meldingen.push(`te kort voor ${pagina.type}: ${fmt(woorden.length)} woorden, doel ${fmt(pagina.min)} tot ${fmt(pagina.max)}`);
  if (pagina?.max && woorden.length > pagina.max) meldingen.push(`te lang voor ${pagina.type}: ${fmt(woorden.length)} woorden, doel ${fmt(pagina.min)} tot ${fmt(pagina.max)}`);
  if (!pagina && !/^\/(404\.html)?$/.test(url) && url !== '/404.html') meldingen.push('staat niet in de websitestructuur (scripts/paginas.json)');
  // Officiële juridische teksten van de eigenaar (zoals de algemene voorwaarden) laten we woordelijk staan: geen stijlcontrole.
  if (pagina?.officieel) { console.log(`✓ ${url}  officiële tekst, ${fmt(woorden.length)} woorden (geen stijlcontrole)`); continue; }
  for (const v of verboden) {
    const n = (laag.match(new RegExp(`(?<![a-zà-ÿ])${v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![a-zà-ÿ])`, 'g')) ?? []).length;
    if (n) meldingen.push(`verboden: "${v}" (${n}x)`);
  }
  for (const o of opsommers) {
    const n = (laag.match(new RegExp(`\\b${o}\\b`, 'g')) ?? []).length;
    if (n > 2) meldingen.push(`te vaak "${o}" (${n}x)`);
  }
  const streep = (tekst.match(/\s[—–]\s|—/g) ?? []).length;
  if (streep) meldingen.push(`gedachtestreepjes: ${streep}`);
  const uitroep = (tekst.replace(/Moi!/g, '').match(/!/g) ?? []).length;
  if (uitroep) meldingen.push(`uitroeptekens: ${uitroep}`);
  // Zinsritme: variatie in zinslengte (mens: grillig, AI: gelijkmatig)
  const zinnen = tekst.split(/(?<=[.?!])\s+|\n+/).map((z) => z.trim()).filter((z) => z.split(/\s+/).length >= 3);
  const lengtes = zinnen.map((z) => z.split(/\s+/).length);
  const gem = lengtes.reduce((a, b) => a + b, 0) / (lengtes.length || 1);
  const sd = Math.sqrt(lengtes.reduce((a, b) => a + (b - gem) ** 2, 0) / (lengtes.length || 1));
  const ritme = gem ? sd / gem : 0;
  // Onder de 150 woorden zegt het ritme weinig: te weinig zinnen om te meten.
  // Overzichtspagina's bestaan vooral uit titels; daar meten we het ritme niet.
  if (woorden.length >= 150 && !pagina?.lijstpagina && ritme < 0.45) meldingen.push(`zinsritme te gelijkmatig (variatie ${ritme.toFixed(2)}, wil ≥ 0,45)`);
  if (gem > 20) meldingen.push(`zinnen gemiddeld te lang (${gem.toFixed(1)} woorden)`);
  // Engelse hoofdletters in koppen
  const koppen = [...readFileSync(f, 'utf8').matchAll(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/g)].map((m) => m[1].replace(/<[^>]+>/g, '').trim());
  for (const k of koppen) {
    const w = k.split(/\s+/).filter((x) => /^[a-zà-ÿ]/i.test(x) && x.length > 3 && !eigenNamen.has(x.replace(/[^a-z]/gi, '')));
    if (w.length >= 4 && w.filter((x) => /^[A-Z]/.test(x)).length / w.length > 0.6) meldingen.push(`Engelse hoofdletters in kop: "${k}"`);
  }
  if (pagina) meldingen.push(...seoCheck(ruw, tekst, woorden.length, pagina));
  totaalProblemen += meldingen.length;
  const doel = pagina?.min ? ` (doel ${fmt(pagina.min)}-${fmt(pagina.max)})` : '';
  console.log(`${meldingen.length ? '✗' : '✓'} ${url}  ${fmt(woorden.length)} woorden${doel}, gem. zin ${gem.toFixed(1)}, variatie ${ritme.toFixed(2)}`);
  for (const m of meldingen) console.log('   ⚠ ' + m);
}

for (const [wat, lijst] of alleen.length ? [] : [['title', titels], ['meta description', descs]]) {
  const d = dubbel(lijst);
  if (d.length) { console.log(`✗ dezelfde ${wat} op meerdere pagina's: ${d.join(' | ')}`); totaalProblemen += d.length; }
}

// Welke pagina's uit de structuur bestaan nog niet?
const ontbreekt = paginas.filter((p) => !p.wachtOpInhoud && (!alleen.length || alleen.includes(p.url)) && !existsSync(join('dist', p.url, 'index.html')));
const klaar = paginas.filter((p) => !p.wachtOpInhoud).length - ontbreekt.length;
console.log(`\nVoortgang: ${klaar} van ${klaar + ontbreekt.length} pagina's gebouwd.`);
if (lancering && ontbreekt.length) {
  console.log('Nog niet gebouwd:\n' + ontbreekt.map((p) => `   - ${p.url}  (${p.naam})`).join('\n'));
  totaalProblemen += ontbreekt.length;
}

console.log(totaalProblemen ? `\n${totaalProblemen} punten om op te lossen. Build afgekeurd.` : '\nGeen meldingen.');
process.exit(totaalProblemen ? 1 : 0);
