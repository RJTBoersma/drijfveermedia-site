// Alle diensten, met URL, prijs en plek in de structuur.
// Deze lijst voedt het menu, de footer, de prijzenpagina en de structured data.

export type Pijler = 'Gevonden' | 'Genoemd' | 'Gekozen' | 'Advies';

export interface Dienst {
  naam: string;
  url: string;
  pijler: Pijler;
  pillar?: boolean; // hoofdpagina van een groep
  ouder?: string; // url van de pillar
  kort: string; // één zin voor menu en kaarten
  prijs: string; // zoals op de site getoond
  prijsWaarde?: number; // voor structured data, in euro excl. btw
  prijsEenheid?: 'maand' | 'uur' | 'eenmalig' | 'pagina';
  maandelijks?: boolean; // uurtarief, maar met vaste uren per maand: opzegbaar en met garantie (linkbuilding)
}

export const diensten: Dienst[] = [
  // Gevonden
  { naam: 'SEO', url: '/zoekmachine-optimalisatie/', pijler: 'Gevonden', pillar: true, kort: 'Hoger in Google, met stijggarantie', prijs: 'vanaf € 495 per maand', prijsWaarde: 495, prijsEenheid: 'maand' },
  { naam: 'Technische SEO en SEO-audit', url: '/zoekmachine-optimalisatie/technische-seo/', pijler: 'Gevonden', ouder: '/zoekmachine-optimalisatie/', kort: 'Alles wat Google tegenhoudt, opgespoord', prijs: 'vanaf € 395', prijsWaarde: 395, prijsEenheid: 'eenmalig' },
  { naam: 'SEO-teksten', url: '/zoekmachine-optimalisatie/seo-teksten/', pijler: 'Gevonden', ouder: '/zoekmachine-optimalisatie/', kort: 'Teksten die gevonden worden en overtuigen', prijs: 'vanaf € 75 per pagina', prijsWaarde: 75, prijsEenheid: 'pagina' },
  { naam: 'SEO uitbesteden', url: '/zoekmachine-optimalisatie/seo-uitbesteden/', pijler: 'Gevonden', ouder: '/zoekmachine-optimalisatie/', kort: 'SEO helemaal uit handen', prijs: 'vanaf € 495 per maand', prijsWaarde: 495, prijsEenheid: 'maand' },
  { naam: 'Lokale SEO', url: '/lokale-seo/', pijler: 'Gevonden', pillar: true, kort: 'Gevonden in je regio en op Google Maps', prijs: 'vanaf € 295 per maand', prijsWaarde: 295, prijsEenheid: 'maand' },
  { naam: 'Google Bedrijfsprofiel', url: '/lokale-seo/google-bedrijfsprofiel/', pijler: 'Gevonden', ouder: '/lokale-seo/', kort: 'Google, Bing en Apple Maps goed ingericht', prijs: 'vanaf € 249', prijsWaarde: 249, prijsEenheid: 'eenmalig' },
  { naam: 'Linkbuilding', url: '/linkbuilding/', pijler: 'Gevonden', pillar: true, kort: 'Sterke links, eerst getest in ons proeflab', prijs: '€ 75 per uur', prijsWaarde: 75, prijsEenheid: 'uur', maandelijks: true },
  { naam: 'Linkbuilding uitbesteden', url: '/linkbuilding/linkbuilding-uitbesteden/', pijler: 'Gevonden', ouder: '/linkbuilding/', kort: 'Elke maand nieuwe links, met verslag', prijs: '€ 75 per uur', prijsWaarde: 75, prijsEenheid: 'uur', maandelijks: true },
  { naam: 'Google disavow tool', url: '/linkbuilding/google-disavow-tool/', pijler: 'Gevonden', ouder: '/linkbuilding/', kort: 'Slechte links onschadelijk maken', prijs: 'consult € 85 per uur', prijsWaarde: 85, prijsEenheid: 'uur' },
  { naam: 'Online adverteren', url: '/online-adverteren/', pijler: 'Gevonden', pillar: true, kort: 'Adverteren waar je klant zoekt', prijs: 'vanaf € 249 per maand', prijsWaarde: 249, prijsEenheid: 'maand' },
  { naam: 'Google Ads', url: '/online-adverteren/google-ads-bureau/', pijler: 'Gevonden', ouder: '/online-adverteren/', kort: 'Campagnes die aanvragen opleveren', prijs: 'vanaf € 249 per maand', prijsWaarde: 249, prijsEenheid: 'maand' },
  { naam: 'Google Ads-campagne opzetten', url: '/online-adverteren/google-ads-campagne-opzetten/', pijler: 'Gevonden', ouder: '/online-adverteren/', kort: 'Het stappenplan, of wij doen het', prijs: 'vanaf € 249 per maand', prijsWaarde: 249, prijsEenheid: 'maand' },
  { naam: 'Adverteren in ChatGPT', url: '/online-adverteren/adverteren-in-chatgpt/', pijler: 'Gevonden', ouder: '/online-adverteren/', kort: 'De nieuwe advertentieplek', prijs: 'vanaf € 249 per maand', prijsWaarde: 249, prijsEenheid: 'maand' },
  { naam: 'Google Shopping', url: '/online-adverteren/google-shopping/', pijler: 'Gevonden', ouder: '/online-adverteren/', kort: 'Je producten in Google', prijs: 'vanaf € 249 per maand', prijsWaarde: 249, prijsEenheid: 'maand' },
  // Genoemd
  { naam: 'GEO', url: '/generative-engine-optimization/', pijler: 'Genoemd', pillar: true, kort: 'Genoemd worden door ChatGPT en Google AI', prijs: 'vanaf € 495 per maand', prijsWaarde: 495, prijsEenheid: 'maand' },
  { naam: 'AI-vindbaarheidsanalyse', url: '/generative-engine-optimization/ai-vindbaarheidsanalyse/', pijler: 'Genoemd', ouder: '/generative-engine-optimization/', kort: 'Wat zegt AI nu over jou?', prijs: 'gratis' },
  { naam: 'Vindbaar in ChatGPT', url: '/generative-engine-optimization/vindbaar-in-chatgpt/', pijler: 'Genoemd', ouder: '/generative-engine-optimization/', kort: 'Genoemd worden als iemand ChatGPT iets vraagt', prijs: 'vanaf € 495 per maand', prijsWaarde: 495, prijsEenheid: 'maand' },
  { naam: 'Google AI Overviews', url: '/generative-engine-optimization/google-ai-overviews/', pijler: 'Genoemd', ouder: '/generative-engine-optimization/', kort: 'In het AI-overzicht bovenaan Google', prijs: 'vanaf € 495 per maand', prijsWaarde: 495, prijsEenheid: 'maand' },
  { naam: 'Structured data', url: '/generative-engine-optimization/structured-data/', pijler: 'Genoemd', ouder: '/generative-engine-optimization/', kort: 'Je site leesbaar voor zoekmachines en AI', prijs: 'vanaf € 295', prijsWaarde: 295, prijsEenheid: 'eenmalig' },
  { naam: 'Reviews en reputatie', url: '/lokale-seo/reviews/', pijler: 'Genoemd', ouder: '/lokale-seo/', kort: 'Meer reviews, en goed reageren', prijs: 'onderdeel van lokale SEO' },
  { naam: 'Social media beheer', url: '/social-media-beheer/', pijler: 'Genoemd', pillar: true, kort: 'Wij plannen, schrijven en plaatsen', prijs: 'vanaf € 395 per maand', prijsWaarde: 395, prijsEenheid: 'maand' },
  // Gekozen
  { naam: 'Website laten maken', url: '/website-laten-maken/', pijler: 'Gekozen', pillar: true, kort: 'Snel met AI of maatwerk in WordPress', prijs: 'vanaf € 250', prijsWaarde: 250, prijsEenheid: 'eenmalig' },
  { naam: 'Website met AI laten maken', url: '/website-laten-maken/website-met-ai/', pijler: 'Gekozen', ouder: '/website-laten-maken/', kort: 'Een goede site, snel en betaalbaar', prijs: 'vanaf € 250', prijsWaarde: 250, prijsEenheid: 'eenmalig' },
  { naam: 'UX- en UI-design', url: '/website-laten-maken/ux-ui-design/', pijler: 'Gekozen', ouder: '/website-laten-maken/', kort: 'Ontwerp dat bezoekers laat doen wat je wilt', prijs: 'vanaf € 750', prijsWaarde: 750, prijsEenheid: 'eenmalig' },
  { naam: 'Onderhoud WordPress', url: '/website-laten-maken/onderhoud-wordpress/', pijler: 'Gekozen', ouder: '/website-laten-maken/', kort: 'Updates, back-ups en beveiliging', prijs: 'vanaf € 39 per maand', prijsWaarde: 39, prijsEenheid: 'maand' },
  { naam: 'WordPress gehackt', url: '/website-laten-maken/wordpress-hack/', pijler: 'Gekozen', ouder: '/website-laten-maken/', kort: 'Spoedhulp bij een gehackte site', prijs: 'consult € 85 per uur', prijsWaarde: 85, prijsEenheid: 'uur' },
  { naam: 'Tekstschrijver', url: '/tekstschrijver/', pijler: 'Gekozen', pillar: true, kort: 'Webteksten waar klanten op bellen', prijs: 'vanaf € 75 per pagina', prijsWaarde: 75, prijsEenheid: 'pagina' },
  { naam: 'Contentmarketing', url: '/tekstschrijver/contentmarketing/', pijler: 'Gekozen', ouder: '/tekstschrijver/', kort: 'Elke maand artikelen die klanten trekken', prijs: 'vanaf € 495 per maand', prijsWaarde: 495, prijsEenheid: 'maand' },
  { naam: 'Branding', url: '/branding/', pijler: 'Gekozen', pillar: true, kort: 'Logo en huisstijl', prijs: 'vanaf € 495', prijsWaarde: 495, prijsEenheid: 'eenmalig' },
  { naam: 'Logo laten maken', url: '/branding/logo-laten-maken/', pijler: 'Gekozen', ouder: '/branding/', kort: 'Een logo dat bij je past', prijs: 'vanaf € 495', prijsWaarde: 495, prijsEenheid: 'eenmalig' },
  { naam: 'Huisstijl laten maken', url: '/branding/huisstijl-laten-maken/', pijler: 'Gekozen', ouder: '/branding/', kort: 'Kleuren, letters en toepassingen', prijs: 'vanaf € 995', prijsWaarde: 995, prijsEenheid: 'eenmalig' },
  { naam: 'Leadgeneratie', url: '/leadgeneratie/', pijler: 'Gekozen', pillar: true, kort: 'Van bezoeker naar aanvraag', prijs: 'vanaf € 495 per maand', prijsWaarde: 495, prijsEenheid: 'maand' },
  { naam: 'Conversie-optimalisatie', url: '/leadgeneratie/conversie-optimalisatie/', pijler: 'Gekozen', ouder: '/leadgeneratie/', kort: 'Meer aanvragen uit dezelfde bezoekers', prijs: 'vanaf € 395', prijsWaarde: 395, prijsEenheid: 'eenmalig' },
  { naam: 'Landingspagina laten maken', url: '/leadgeneratie/landingspagina-laten-maken/', pijler: 'Gekozen', ouder: '/leadgeneratie/', kort: 'Eén pagina, één doel', prijs: 'vanaf € 250', prijsWaarde: 250, prijsEenheid: 'eenmalig' },
  { naam: 'E-mailmarketing', url: '/leadgeneratie/e-mailmarketing/', pijler: 'Gekozen', ouder: '/leadgeneratie/', kort: 'Nieuwsbrieven en vaste opvolgmails', prijs: 'vanaf € 295 per maand', prijsWaarde: 295, prijsEenheid: 'maand' },
  { naam: 'Tracking en analytics', url: '/leadgeneratie/tracking-en-analytics/', pijler: 'Gekozen', ouder: '/leadgeneratie/', kort: 'Weten waar je aanvragen vandaan komen', prijs: 'vanaf € 395', prijsWaarde: 395, prijsEenheid: 'eenmalig' },
  // Advies
  { naam: 'Online marketing uitbesteden', url: '/online-marketing-uitbesteden/', pijler: 'Advies', pillar: true, kort: 'Eén team, één maandbedrag, per maand opzegbaar', prijs: 'vanaf € 595 per maand', prijsWaarde: 595, prijsEenheid: 'maand' },
  { naam: 'Interim-marketeer', url: '/online-marketing-uitbesteden/interim-marketeer/', pijler: 'Advies', ouder: '/online-marketing-uitbesteden/', kort: 'Een marketeer op afroep', prijs: '€ 95 per uur', prijsWaarde: 95, prijsEenheid: 'uur' },
  { naam: 'Consult', url: '/consult/', pijler: 'Advies', pillar: true, kort: 'Een uur sparren over je marketing', prijs: '€ 85 per uur', prijsWaarde: 85, prijsEenheid: 'uur' },
  { naam: 'Trainingen', url: '/trainingen/', pijler: 'Advies', pillar: true, kort: 'SEO, Google Ads en AI voor je team', prijs: 'in overleg' },
];

export const pillars = diensten.filter((d) => d.pillar);
export const perPijler = (p: Pijler) => diensten.filter((d) => d.pijler === p);
export const clusters = (pillarUrl: string) => diensten.filter((d) => d.ouder === pillarUrl);
export const vind = (url: string) => diensten.find((d) => d.url === url);
