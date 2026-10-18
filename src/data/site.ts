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
};

// Het team. Getekende portretten (zwart-wit) staan in /public/img/team/.
export interface Persoon { slug: string; naam: string; rol: string; kort: string }
export const team: Persoon[] = [
  { slug: 'robert', naam: 'Robert Boersma', rol: 'Eigenaar en online marketeer', kort: 'Richtte Drijfveer Media in 2011 op en doet sindsdien SEO, content en strategie.' },
  { slug: 'thorgall', naam: 'Thorgall van Eeden', rol: 'Online marketeer', kort: 'Je eerste aanspreekpunt. Hij belt je terug en houdt je project bij.' },
  { slug: 'evelien', naam: 'Evelien Heerema', rol: 'Medeoprichter', kort: 'Houdt de zaak draaiende en werkt mee aan marketing voor klanten.' },
  { slug: 'johan', naam: 'Johan Zwartenberg', rol: 'Linkbuilder', kort: 'Zoekt de links die een site sterker maken, en laat de rest liggen.' },
];
export const persoon = (slug: string) => team.find((p) => p.slug === slug)!;
