// Kantoortijden van Drijfveer Media: werkdagen 8.00 tot 17.00 uur (Nederlandse tijd), dicht op erkende feestdagen.
// Eén plek voor de bereikbaarheid in de header, de mobiele balk, de bedankpagina en de formulieren.
export const feestdagen = new Set([
  '2026-01-01', '2026-04-06', '2026-04-27', '2026-05-14', '2026-05-25', '2026-12-25', '2026-12-26',
  '2027-01-01', '2027-03-29', '2027-04-27', '2027-05-06', '2027-05-17', '2027-12-25', '2027-12-26',
]);
const dagnamen = ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'];
const maanden = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];

// De klok in Nederland, los van de tijdzone van het apparaat.
export function nuInNL(nu = new Date()) {
  const d = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Amsterdam', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(nu);
  const g = (t: string) => Number(d.find((p) => p.type === t)?.value);
  return { jaar: g('year'), maand: g('month'), dag: g('day'), minuten: g('hour') * 60 + g('minute') };
}
const iso = (j: number, m: number, d: number) => `${j}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
const weekdag = (j: number, m: number, d: number) => new Date(Date.UTC(j, m - 1, d)).getUTCDay();
export const isWerkdag = (j: number, m: number, d: number) => { const w = weekdag(j, m, d); return w > 0 && w < 6 && !feestdagen.has(iso(j, m, d)); };

export function bereikbaarheid(nu = new Date()) {
  const n = nuInNL(nu);
  const open = isWerkdag(n.jaar, n.maand, n.dag) && n.minuten >= 480 && n.minuten < 1020;
  // Eerstvolgende werkdag waarop we om 8.00 uur beginnen
  let t = new Date(Date.UTC(n.jaar, n.maand - 1, n.dag));
  const vandaagNogOpen = isWerkdag(n.jaar, n.maand, n.dag) && n.minuten < 480;
  if (!vandaagNogOpen) do { t = new Date(t.getTime() + 864e5); } while (!isWerkdag(t.getUTCFullYear(), t.getUTCMonth() + 1, t.getUTCDate()));
  const morgen = new Date(Date.UTC(n.jaar, n.maand - 1, n.dag) + 864e5);
  const wanneer = vandaagNogOpen ? 'vandaag' : t.getTime() === morgen.getTime() ? 'morgen' : dagnamen[t.getUTCDay()];
  const datum = `${dagnamen[t.getUTCDay()]} ${t.getUTCDate()} ${maanden[t.getUTCMonth()]}`;
  return { open, wanneer, datum };
}
