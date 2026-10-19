// Welke miniatuur hoort bij welke pagina. De miniatuur is het eerste beeld van de kopanimatie van die pagina.
// Pagina's die hier (nog) niet staan, krijgen de tekening van hun onderwerp.
export const miniaturen: Record<string, string> = {
  '/': 'merk',
  '/generative-engine-optimization/': 'ai',
  '/lokale-seo/google-bedrijfsprofiel/': 'kaart',
  '/webdesign-assen/': 'schermen',
  '/regio/drenthe/': 'drenthe',
  '/kennisbank/gidsen/wat-kost-seo/': 'reken',
  '/kennisbank/wat-is/e-e-a-t/': 'letters',
  '/kennisbank/': 'boeken',
  '/cases/#willemfikstt': 'groei',
  '/over-ons/': 'team',
  '/prijzen/': 'label',
  '/gratis-website-analyse/': 'formulier',
};
export const miniatuurVoor = (url: string) => miniaturen[url];
// Naam voor de overgang: dezelfde op de kaart en in de kop van de pagina.
export const overgang = (url: string) => 'beeld' + (url.replace(/[^a-z0-9]+/gi, '-').replace(/-+$/, '') || '-home');

// Tekening voor een pagina zonder eigen miniatuur, gekozen op de woorden in de URL.
const opWoord: [RegExp, string][] = [
  [/review/, 'ster'], [/bedrijfsprofiel|maps/, 'pin'], [/backlink|link/, 'ketting'], [/kost|prijs|grants/, 'munten'],
  [/chatgpt|gemini|claude|perplexity|copilot|ai-|geo/, 'ai'], [/instagram|social|linkedin|posten/, 'social'], [/nieuwsbrief|mail/, 'mail'],
  [/analytics|utm/, 'grafiek'], [/persona|journey|see-think/, 'team'], [/kleur|branding|logo|tone/, 'merk'],
  [/landingspagina|conversie|klanten/, 'klik'], [/leads|werkspot/, 'magneet'], [/marketingplan/, 'kompas'], [/offerte/, 'doel'],
  [/vibe|wordpress-gehackt|privacy/, 'schild'], [/sneller/, 'raket'], [/inhaak/, 'kalender'], [/google-ads|adverteren/, 'megafoon'],
  [/meta|teksten|blog|url/, 'pen'], [/domein|website|wix|zzp/, 'scherm'], [/search-console|zoekwoord|hoger|seo/, 'vergrootglas'],
];
export const tekeningVoor = (url: string, standaard = 'lamp') => opWoord.find(([r]) => r.test(url))?.[1] ?? standaard;
