// Welke vervolgstap past bij welke pagina. Eén plek, zodat elke knop zegt wat de bezoeker krijgt.
// Gebruikt door Hero, Actie, Inhoud (zijkolom), Tussenactie en de mobiele balk.
export interface Stap { knop: string; kort?: string; href: string; zin: string; vraag?: string; dienst?: { naam: string; prijs: string; url: string } }

const scan: Stap = { knop: 'Laat je site gratis nakijken', href: '/gratis-website-analyse/', vraag: 'Welke drie dingen leveren bij jou het meeste op?', zin: 'Thorgall belt je terug, bekijkt je site en die van je concurrenten, en vertelt je de drie grootste kansen.' };
const regels: [RegExp, Stap][] = [
  [/^\/branding|wat-is-branding|logo|huisstijl|tone-of-voice|kleuren-in-marketing/, {
    knop: 'Vraag een vaste prijs voor je logo of huisstijl', kort: 'Vaste prijs', vraag: 'Past je logo en huisstijl nog bij wat je nu doet?',
    href: '/contact/?vraag=Vaste%20prijs%20voor%20logo%20of%20huisstijl',
    zin: 'Vertel wat je doet en voor wie. Thorgall belt je terug met een vaste prijs voor je logo of huisstijl.',
    dienst: { naam: 'Branding', prijs: 'vanaf € 495', url: '/branding/' } }],
  [/^\/website-laten-maken\/wordpress-hack\/|wordpress-gehackt/, {
    knop: 'Bel 088 11 55 666', kort: 'Bel direct', vraag: 'Is je site nu gehackt?', href: 'tel:+31881155666',
    zin: 'Bel ons direct. Thorgall zegt wat er nodig is en hoeveel uur we verwachten, voordat we beginnen.',
    dienst: { naam: 'WordPress gehackt', prijs: 'consult € 85 per uur', url: '/website-laten-maken/wordpress-hack/' } }],
  [/^\/website-laten-maken\/onderhoud-wordpress\//, {
    knop: 'Laat je WordPress-site gratis nakijken', kort: 'Gratis check', vraag: 'Loopt jouw WordPress-site achter?',
    href: '/contact/?vraag=Gratis%20check%20van%20mijn%20WordPress-site',
    zin: 'Thorgall kijkt hoe je site ervoor staat en belt je met wat er achterloopt.',
    dienst: { naam: 'Onderhoud WordPress', prijs: 'vanaf € 39 per maand', url: '/website-laten-maken/onderhoud-wordpress/' } }],
  [/^\/website-laten-maken\/ux-ui-design\//, {
    knop: 'Vraag een vaste prijs voor je ontwerp', kort: 'Vaste prijs', vraag: 'Waar haken jouw bezoekers af?',
    href: '/contact/?vraag=Vaste%20prijs%20voor%20UX-%20en%20UI-design',
    zin: 'Vertel welke pagina\'s je aanvragen moeten opleveren. Thorgall belt je terug met een vaste prijs voor het ontwerp.',
    dienst: { naam: 'UX- en UI-design', prijs: 'vanaf € 750', url: '/website-laten-maken/ux-ui-design/' } }],
  [/^\/(website-laten-maken|webdesign-)|\/(domeinnaam-kiezen|website-|wix|zzp|cms|hosting|ux|wordpress)|wat-kost-een-website|zelf-website|offerte-beoordelen/, {
    knop: 'Vraag een vaste prijs voor je website', kort: 'Vaste prijs', vraag: 'Liever een vaste prijs dan zelf rekenen?', href: '/gratis-website-analyse/?doel=website',
    zin: 'Vertel wat je site moet opleveren. Thorgall belt je terug met een vaste prijs, ook als de goedkoopste route het beste past.',
    dienst: { naam: 'Website laten maken', prijs: 'vanaf € 250', url: '/website-laten-maken/' } }],
  [/^\/online-adverteren\/adverteren-in-chatgpt\//, { knop: 'Check of ChatGPT Ads bij je past', kort: 'Gratis ChatGPT-check', vraag: 'Stellen jouw klanten hun vragen in ChatGPT?', href: '/gratis-website-analyse/?doel=chatgpt', zin: 'Thorgall kijkt of jouw klanten hun vragen in ChatGPT stellen en belt je met zijn antwoord, ook als dat nee is.', dienst: { naam: 'Adverteren in ChatGPT', prijs: 'beheer vanaf € 249 per maand', url: '/online-adverteren/adverteren-in-chatgpt/' } }],
  [/^\/online-adverteren|google-ads|\/wat-is\/(sea|cpc|ctr|roas|cpa|zoekmachinemarketing)\/|google-ad-grants|adverteren/, {
    knop: 'Laat je Google Ads-account gratis checken', kort: 'Gratis Ads-check', vraag: 'Benieuwd waar jouw budget weglekt?', href: '/gratis-website-analyse/?doel=ads',
    zin: 'We kijken waar je budget weglekt en bellen je met wat we zien. Je account blijft van jou.',
    dienst: { naam: 'Google Ads uitbesteden', prijs: 'beheer vanaf € 249 per maand', url: '/online-adverteren/google-ads-bureau/' } }],
  [/^\/(lokale-seo|seo-[a-z]+\/$)|bedrijfsprofiel|google-reviews|\/reviews\/|maps/, {
    knop: 'Check gratis je plek op de kaart', kort: 'Gratis kaart-check', vraag: 'Sta jij al in het kaartje?', href: '/gratis-website-analyse/?doel=kaart',
    zin: 'Thorgall zoekt op jouw diensten in jouw plaats en belt je met wat hij ziet op de kaart en in Google.',
    dienst: { naam: 'Lokale SEO', prijs: 'vanaf € 295 per maand', url: '/lokale-seo/' } }],
  [/^\/generative-engine-optimization\/structured-data\//, {
    knop: 'Vraag een vaste prijs aan', kort: 'Vaste prijs', vraag: 'Wil je weten wat Google nu van je site leest?',
    href: '/contact/?vraag=Graag%20een%20vaste%20prijs%20voor%20structured%20data%20op%20mijn%20site.',
    zin: 'Vertel wat voor site je hebt. Thorgall belt je terug met een vaste prijs.',
    dienst: { naam: 'Structured data', prijs: 'vanaf € 295', url: '/generative-engine-optimization/structured-data/' } }],
  [/^\/generative-engine-optimization|chatgpt|claude|gemini|perplexity|copilot|ai-modus|wat-is-geo|\/wat-is\/(geo|llm|aeo)\//, {
    knop: 'Doe de gratis AI-test', kort: 'Gratis AI-test', vraag: 'Noemt ChatGPT jou al?', href: '/generative-engine-optimization/#ai-test',
    zin: 'In vijf minuten weet je of ChatGPT en Gemini jouw bedrijf noemen als iemand naar jouw vak vraagt.',
    dienst: { naam: 'Genoemd worden door AI', prijs: 'vanaf € 495 per maand', url: '/generative-engine-optimization/' } }],
  [/^\/linkbuilding\/linkbuilding-scan\//, {
    knop: 'Laat Thorgall je links vergelijken', kort: 'Links vergelijken', vraag: 'Wil je weten welke links je concurrent wel heeft?', href: '#vergelijking',
    zin: 'Thorgall legt je links naast die van de bedrijven boven je in Google en belt je met de grootste gaten.',
    dienst: { naam: 'Linkbuilding', prijs: '€ 75 per uur', url: '/linkbuilding/' } }],
  [/^\/linkbuilding|backlink|dofollow|ankertekst|domain-authority|link-juice|linkbuilding|gastblog/, {
    knop: 'Check gratis je links', kort: 'Gratis linkscan', vraag: 'Hoe sterk zijn jouw links, naast die van je concurrent?', href: '/linkbuilding/linkbuilding-scan/',
    zin: 'Zet je export uit Search Console in de scan en zie meteen wie naar je linkt. Of laat Thorgall je links naast die van je concurrenten leggen.',
    dienst: { naam: 'Linkbuilding', prijs: '€ 75 per uur', url: '/linkbuilding/' } }],
  [/^\/tekstschrijver\/contentmarketing\/|contentmarketing|content-plan/, { ...scan, knop: 'Vraag vijf gratis onderwerpen aan', kort: 'Gratis onderwerpen',
    href: '/contact/?vraag=Graag%20vijf%20onderwerpen%20waar%20mijn%20klanten%20op%20zoeken.', vraag: 'Waar zoeken jouw klanten op?',
    zin: 'Thorgall zoekt uit welke vragen jouw klanten in Google stellen, en belt je met de eerste vijf onderwerpen.',
    dienst: { naam: 'Contentmarketing', prijs: 'vanaf € 495 per maand', url: '/tekstschrijver/contentmarketing/' } }],
  [/^\/(tekstschrijver)|copywriting|teksten|blog/, { ...scan, knop: 'Laat een pagina gratis nalezen', vraag: 'Mag Thorgall een van je pagina\'s lezen?',
    dienst: { naam: 'Tekstschrijver', prijs: 'vanaf € 75 per pagina', url: '/tekstschrijver/' } }],
  [/^\/leadgeneratie\/tracking|analytics|utm|\/wat-is\/(kpi|crm|bounce-rate)\//, { ...scan, dienst: { naam: 'Tracking en analytics', prijs: 'vanaf € 395', url: '/leadgeneratie/tracking-en-analytics/' } }],
  [/^\/leadgeneratie|conversie|landingspagina|leads|nieuwsbrief|mail|funnel|heatmap|werkspot/, { ...scan, knop: 'Laat gratis zien waar je aanvragen lekken', kort: 'Gratis aanvragen-check', href: '/gratis-website-analyse/?doel=leads', vraag: 'Hoeveel aanvragen laat jouw site liggen?', zin: 'Thorgall loopt je site door als een klant en belt je met de drie plekken waar je aanvragen lekken.', dienst: { naam: 'Leadgeneratie', prijs: 'vanaf € 495 per maand', url: '/leadgeneratie/' } }],
  [/^\/social-media|instagram|linkedin|social|posten|reels|viraal|inhaak/, {
    knop: 'Laat je kanalen gratis bekijken', kort: 'Gratis kanaalcheck', vraag: 'Zullen we je kanalen samen bekijken?',
    href: '/contact/?vraag=Willen%20jullie%20naar%20mijn%20social%20media%20kijken%3F',
    zin: 'Thorgall kijkt naar je huidige kanalen en belt je met zijn advies: waar je moet beginnen, en waar je beter niet aan begint.',
    dienst: { naam: 'Social media beheer', prijs: 'vanaf € 395 per maand', url: '/social-media-beheer/' } }],
  [/^\/trainingen\//, { knop: 'Bespreek een training', kort: 'Training', href: '/contact/', vraag: 'Wat moet jullie team straks kunnen?', zin: 'Thorgall belt je terug en vraagt wat jullie willen leren. Daarna krijg je een voorstel met onderwerpen, vorm en een vaste prijs.', dienst: { naam: 'Trainingen', prijs: 'prijs vooraf vast', url: '/trainingen/' } }],
  [/^\/consult\//, { knop: 'Plan een consult', kort: 'Consult', href: '/contact/?soort=Consult#terugbellen', vraag: 'Zit je met een marketingvraag?', zin: 'Thorgall belt je terug en plant een uur sparren op een moment dat jou past.', dienst: { naam: 'Consult', prijs: '€ 85 per uur', url: '/consult/' } }],
  [/^\/online-marketing-uitbesteden\/interim-marketeer\//, { knop: 'Vraag een interim aan', kort: 'Interim', href: '/contact/', vraag: 'Ligt er marketingwerk stil?', zin: 'Thorgall belt je terug, vraagt wat er moet gebeuren en zegt wie we kunnen inzetten.', dienst: { naam: 'Interim-marketeer', prijs: '€ 95 per uur', url: '/online-marketing-uitbesteden/interim-marketeer/' } }],
  [/^\/zoekmachine-optimalisatie|seo|google|zoekwoord|hoger|meta|title|search-console|websiteverkeer|wat-is\//, { ...scan, dienst: { naam: 'SEO', prijs: 'vanaf € 495 per maand', url: '/zoekmachine-optimalisatie/' } }],
];
export const stapVoor = (pad: string): Stap => regels.find(([r]) => r.test(pad))?.[1] ?? { ...scan, dienst: { naam: 'Online marketing uitbesteden', prijs: 'vanaf € 595 per maand', url: '/online-marketing-uitbesteden/' } };
// Knoppen die nog de algemene scan-tekst hebben, krijgen de stap van de pagina.
const algemeen = ['Laat je site gratis nakijken', 'Vraag een gratis scan aan', 'Vraag de gratis scan aan', 'Gratis scan aanvragen'];
export const knopVoor = (pad: string, knop?: { tekst: string; href: string }) => {
  if (pad.startsWith('/gratis-website-analyse')) return knop ?? { tekst: scan.knop, href: '#scan' };
  if (pad.startsWith('/linkbuilding/linkbuilding-scan')) return knop ?? { tekst: 'Laat Thorgall je links vergelijken', href: '#vergelijking' };
  if (!knop || (knop.href === '/gratis-website-analyse/' && algemeen.includes(knop.tekst))) { const s = stapVoor(pad); return { tekst: s.knop, href: s.href }; }
  return knop;
};
