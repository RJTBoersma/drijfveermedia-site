// De tekenset van Drijfveer Media. Eén stijl: navy lijnen (2,5 px op 64 px), oranje accenten, lichte vlakken.
// Klassen: "l" = lijn die zichzelf tekent, "a" = oranje accentlijn, "v" = vlak dat zachtjes verschijnt,
// "o" = oranje vlak dat erin popt. Elke lijn heeft pathLength="1", zodat de animatie overal even lang duurt.
// Alles is 64 x 64.

const L = (d: string, extra = '') => `<path class="l" pathLength="1" d="${d}" ${extra}/>`;
const A = (d: string, extra = '') => `<path class="a" pathLength="1" d="${d}" ${extra}/>`;
const V = (d: string) => `<path class="v" d="${d}"/>`;
const O = (d: string) => `<path class="o" d="${d}"/>`;
const C = (cx: number, cy: number, r: number, k: 'l' | 'a' | 'v' | 'o' = 'l') =>
  k === 'l' || k === 'a' ? `<circle class="${k}" pathLength="1" cx="${cx}" cy="${cy}" r="${r}"/>` : `<circle class="${k}" cx="${cx}" cy="${cy}" r="${r}"/>`;

export const tekeningen: Record<string, string> = {
  // Gevonden: vergrootglas boven een zoekbalk
  vergrootglas: V('M8 50h30a4 4 0 0 1 0 8H8a4 4 0 0 1 0-8z') + C(28, 26, 14, 'v') + C(28, 26, 14) + L('M38 36l14 14') + A('M20 24a9 9 0 0 1 8-7'),
  // Genoemd: tekstballon met AI-ster
  ai: V('M10 14h34a6 6 0 0 1 6 6v18a6 6 0 0 1-6 6H26l-10 9v-9h-6a6 6 0 0 1-6-6V20a6 6 0 0 1 6-6z') + L('M10 14h34a6 6 0 0 1 6 6v18a6 6 0 0 1-6 6H26l-10 9v-9h-6a6 6 0 0 1-6-6V20a6 6 0 0 1 6-6z') + L('M14 25h22M14 32h14') + O('M52 4l2.5 7.5L62 14l-7.5 2.5L52 24l-2.5-7.5L42 14l7.5-2.5z'),
  // Gekozen: muispijl die klikt op een knop
  klik: V('M6 10h40a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4v-8a4 4 0 0 1 4-4z') + L('M6 10h40a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4v-8a4 4 0 0 1 4-4z') + L('M28 22l4 34 8-10 11 14 5-4-11-14 12-4z', 'stroke-linejoin="round"') + A('M18 30l-6 5M22 36l-2 7M14 22H7'),
  // Garantie: schild met vinkje
  schild: V('M32 6l22 8v16c0 14-10 23-22 28C20 53 10 44 10 30V14z') + L('M32 6l22 8v16c0 14-10 23-22 28C20 53 10 44 10 30V14z') + A('M22 31l7 7 14-15'),
  // Maandelijks opzegbaar: kalender met pijl rond
  kalender: V('M8 14h48v42H8z') + L('M8 14h48v42H8zM8 24h48M20 8v12M44 8v12') + A('M42 40a10 10 0 1 1-3-7M40 28v6h-6'),
  // Proeflab: erlenmeyer met belletjes
  kolf: O('M18 44h28l6 12H12z') + L('M26 6h12M28 6v16L12 56h40L36 22V6') + C(30, 36, 2, 'a') + C(36, 30, 1.6, 'a') + C(33, 44, 1.6, 'a'),
  // Binnen 15 minuten: telefoon die overgaat
  telefoon: V('M14 8l10 2 4 12-6 5c4 8 9 13 17 17l5-6 12 4 2 10c-2 4-6 6-10 6C26 58 6 38 6 16c0-4 2-7 8-8z') + L('M14 8l10 2 4 12-6 5c4 8 9 13 17 17l5-6 12 4 2 10c-2 4-6 6-10 6C26 58 6 38 6 16c0-4 2-7 8-8z', 'stroke-linejoin="round"') + A('M38 6a20 20 0 0 1 20 20M38 14a12 12 0 0 1 12 12'),
  // Lokaal: kaartspeld op een gevouwen kaart
  pin: V('M4 44l18-6 20 6 18-6v20l-18 6-20-6-18 6z') + L('M4 44l18-6 20 6 18-6v20l-18 6-20-6-18 6zM22 38v20M42 44v20') + O('M32 4a13 13 0 0 1 13 13c0 10-13 23-13 23S19 27 19 17A13 13 0 0 1 32 4z') + C(32, 17, 5, 'l'),
  // Linkbuilding: twee schakels
  ketting: L('M27 37l10-10') + L('M22 30l-6 6a8.5 8.5 0 0 0 12 12l6-6', 'stroke-width="3"') + A('M42 34l6-6a8.5 8.5 0 0 0-12-12l-6 6', 'stroke-width="3"'),
  // Website: beeldscherm met knop
  scherm: V('M6 10h52v34H6z') + L('M6 10h52v34H6zM24 56h16M32 44v12') + L('M14 20h20M14 27h28') + O('M14 33h14v6H14z'),
  // Teksten: pen die een lijn schrijft
  pen: L('M40 8l14 14-28 28-16 4 4-16z', 'stroke-linejoin="round"') + O('M34 14l14 14 6-6-14-14z') + A('M8 60c6-4 10 2 16-2s10 2 16-2'),
  // Branding: ruit met penseelstreek
  merk: V('M32 6l24 22-24 30L8 28z') + L('M32 6l24 22-24 30L8 28zM8 28h48M22 28l10 30 10-30M32 6l-10 22M32 6l10 22') + C(52, 10, 4, 'o'),
  // Adverteren: megafoon
  megafoon: V('M10 26h10l24-14v40L20 38H10z') + L('M10 26h10l24-14v40L20 38H10zM16 38l4 16h8l-4-16') + A('M50 24a10 10 0 0 1 0 16M54 18a18 18 0 0 1 0 28'),
  // Social media: ballon met hartje
  social: V('M6 12h40v28H22l-10 10V40H6z') + L('M6 12h40v28H22l-10 10V40H6z') + O('M26 21c2-4 9-3 8 3-1 4-8 9-8 9s-7-5-8-9c-1-6 6-7 8-3z') + L('M50 22h8v26h-6v8l-8-8H30', 'stroke-linejoin="round"'),
  // Leadgeneratie: magneet die stipjes trekt
  magneet: L('M14 10v20a18 18 0 0 0 36 0V10h-10v20a8 8 0 0 1-16 0V10z', 'stroke-linejoin="round"') + O('M14 10h10v8H14zM40 10h10v8H40z') + C(32, 58, 2.5, 'a') + C(20, 56, 2, 'a') + C(44, 56, 2, 'a'),
  // Tracking: grafiek die stijgt
  grafiek: V('M10 54l12-14 10 6 12-16 10-8v32H10z') + L('M8 6v50h50') + A('M10 54l12-14 10 6 12-16 10-8') + C(54, 22, 3, 'o'),
  // E-mail
  mail: V('M6 14h52v36H6z') + L('M6 14h52v36H6z') + A('M6 14l26 20 26-20') + C(54, 14, 7, 'o'),
  // Advies: kompas
  kompas: C(32, 32, 24, 'v') + C(32, 32, 24) + L('M32 4v6M32 54v6M4 32h6M54 32h6') + O('M40 22l-5 13-11 7 5-13z') + C(32, 32, 2.5, 'l'),
  // Kom langs: koffie met stoom
  koffie: V('M12 28h34v14a14 14 0 0 1-14 14h-6a14 14 0 0 1-14-14z') + L('M12 28h34v14a14 14 0 0 1-14 14h-6a14 14 0 0 1-14-14zM46 32h4a6 6 0 0 1 0 12h-5') + A('M22 8c-4 5 4 8 0 13M32 6c-4 5 4 8 0 13M42 8c-4 5 4 8 0 13', 'class="stoom"'),
  // Kennisbank: open boek
  boek: V('M32 14C24 8 14 8 6 10v40c8-2 18-2 26 4 8-6 18-6 26-4V10c-8-2-18-2-26 4z') + L('M32 14C24 8 14 8 6 10v40c8-2 18-2 26 4 8-6 18-6 26-4V10c-8-2-18-2-26 4zM32 14v40') + A('M12 20c6-1 10 0 14 2M12 28c6-1 10 0 14 2M38 22c4-2 8-3 14-2'),
  // Kosten: muntenstapel
  munten: V('M14 22v24a18 6 0 0 0 36 0V22z') + O('M14 22a18 6 0 1 0 36 0a18 6 0 1 0-36 0') + L('M14 22a18 6 0 1 0 36 0a18 6 0 1 0-36 0M14 22v24a18 6 0 0 0 36 0V22M14 30a18 6 0 0 0 36 0M14 38a18 6 0 0 0 36 0') + A('M52 10l4-4M56 16h5M46 6V1'),
  // Tip: gloeilamp
  lamp: V('M32 6a17 17 0 0 1 10 31v7H22v-7A17 17 0 0 1 32 6z') + L('M32 6a17 17 0 0 1 10 31v7H22v-7A17 17 0 0 1 32 6zM24 50h16M26 56h12') + A('M28 30l4-8 4 8M32 22v-2', 'class="gloei"'),
  // Team: twee mensen
  team: C(22, 20, 8, 'v') + C(22, 20, 8) + L('M8 54c0-10 6-17 14-17s14 7 14 17') + C(44, 22, 7, 'o') + L('M34 40c3-2 6-3 10-3 8 0 12 7 12 15'),
  // Techniek: tandwiel
  tandwiel: C(32, 32, 9, 'o') + L('M28 6h8l2 7 6 3 6-4 6 6-4 6 3 6 7 2v8l-7 2-3 6 4 6-6 6-6-4-6 3-2 7h-8l-2-7-6-3-6 4-6-6 4-6-3-6-7-2v-8l7-2 3-6-4-6 6-6 6 4 6-3z', 'stroke-linejoin="round"'),
  // Reviews: ster
  ster: O('M32 6l7.6 16.4L58 25l-13 12.6L48 56 32 47.4 16 56l3-18.4L6 25l18.4-2.6z') + L('M32 6l7.6 16.4L58 25l-13 12.6L48 56 32 47.4 16 56l3-18.4L6 25l18.4-2.6z', 'stroke-linejoin="round"'),
  // Groei: raket
  raket: V('M32 4c10 8 14 20 12 34H20C18 24 22 12 32 4z') + L('M32 4c10 8 14 20 12 34H20C18 24 22 12 32 4zM20 38l-8 10 10-2M44 38l8 10-10-2') + C(32, 22, 5, 'l') + A('M26 46c0 6 6 10 6 14 0-4 6-8 6-14', 'class="vlam"'),
  // Scan: browser met scanlijn
  scan: V('M6 10h52v44H6z') + L('M6 10h52v44H6zM6 20h52') + C(12, 15, 1.5, 'a') + C(17, 15, 1.5, 'a') + L('M14 30h22M14 38h30M14 46h16') + A('M4 34h56', 'class="scanlijn"'),
  // Doel: roos met pijl
  doel: C(30, 34, 22, 'v') + C(30, 34, 22) + C(30, 34, 13) + C(30, 34, 4, 'o') + A('M30 34L56 8M48 8h8v8'),
  // Plaats en regio: huisje met pin
  huis: V('M10 30L32 12l22 18v26H10z') + L('M10 30L32 12l22 18v26H10zM4 34L32 10l28 24') + O('M26 40h12v16H26z'),
};

// Welke tekening hoort bij welk onderwerp (voor kennisbank, prijzen en kaarten)
export const perOnderwerp: Record<string, string> = {
  'SEO': 'vergrootglas', 'Lokale SEO': 'pin', 'Linkbuilding': 'ketting', 'GEO': 'ai', 'Trainingen': 'lamp',
  'Website': 'scherm', 'Tekstschrijver': 'pen', 'Branding': 'merk', 'Online adverteren': 'megafoon',
  'Social media beheer': 'social', 'Leadgeneratie': 'magneet', 'Tracking en analytics': 'grafiek',
  'Online marketing uitbesteden': 'kompas', 'Consult': 'koffie',
  'Gevonden': 'vergrootglas', 'Genoemd': 'ai', 'Gekozen': 'klik', 'Advies': 'kompas',
};
