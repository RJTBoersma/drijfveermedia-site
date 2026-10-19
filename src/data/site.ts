// Alle bedrijfsgegevens op één plek. Pas hier aan, dan klopt het overal.
// Bedrijfsgegevens die je zelf aanpast staan in bedrijf.json (ook te bewerken via /admin/).
import bedrijf from './bedrijf.json';
const telefoonLink = 'tel:+31' + bedrijf.telefoon.replace(/\D/g, '').replace(/^0/, '');
export const site = {
  ...bedrijf,
  url: 'https://www.drijfveermedia.nl',
  telefoonLink,
  land: 'NL',
  geo: { lat: 52.9927, lng: 6.5295 }, // Lauwers 9 (OpenStreetMap)
  opgericht: 2011,
  openingHours: 'Mo-Fr 08:00-17:00',
  // Google Bedrijfsprofiel (place ID uit de reviewlink van Robert, 18-10-2026)
  kaart: 'https://www.google.com/maps/place/?q=place_id:ChIJ3WI9wErNyUcR-qmlID9Y-YA',
  reviewLink: 'https://search.google.com/local/writereview?placeid=ChIJ3WI9wErNyUcR-qmlID9Y-YA',
  // Profielen elders (komen in het schema als sameAs en in de footer). Vul de echte URL's in.
  // Bijvoorbeeld bedrijf: ['https://www.linkedin.com/company/...', 'https://g.page/...'], robert: ['https://www.linkedin.com/in/...']
  profielen: { bedrijf: ['https://www.linkedin.com/company/2549664/', 'https://www.google.com/maps/place/?q=place_id:ChIJ3WI9wErNyUcR-qmlID9Y-YA', 'https://share.google/w6IJOzwOKQ61vV06S'] as string[], robert: [] as string[], thorgall: [] as string[], evelien: [] as string[], johan: [] as string[] } as Record<string, string[]>,
};

// Het team. Getekende portretten (zwart-wit) staan in /public/img/team/.
export interface Persoon { slug: string; naam: string; rol: string; kort: string }
export const team: Persoon[] = [
  { slug: 'robert', naam: 'Robert Boersma', rol: 'Eigenaar en online marketeer', kort: 'Richtte Drijfveer Media in 2011 op en doet sindsdien SEO, content en strategie.' },
  { slug: 'thorgall', naam: 'Thorgall van Eeden', rol: 'Online marketeer', kort: 'Je eerste aanspreekpunt en onze linkbuilder. Hij belt je terug en houdt je project bij.' },
  { slug: 'evelien', naam: 'Evelien Heerema', rol: 'Medeoprichter', kort: 'Houdt de zaak draaiende en werkt mee aan marketing voor klanten.' },
  { slug: 'johan', naam: 'Johan Zwartenberg', rol: 'Marketeer', kort: 'Werkt mee aan de online marketing voor klanten.' },
];
export const persoon = (slug: string) => team.find((p) => p.slug === slug)!;
