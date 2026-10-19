// Welke pagina bij welk onderwerp (cluster) hoort, voor de statistiek per cluster (/api/statistiek.php).
// Dienstpagina's horen bij hun pillar, plaatspagina's bij hun soort, kennisbankpagina's bij de dienst van hun vervolgstap (actie.ts).
import paginas from '../../../scripts/paginas.json';
import { diensten } from '../../data/diensten';
import { stapVoor } from '../../data/actie';

const pillars = diensten.filter((d) => d.pillar).sort((a, b) => b.url.length - a.url.length);

export function GET() {
  const kaart: Record<string, string> = {};
  for (const p of paginas as { url: string; type: string }[]) {
    if (['juridisch', 'systeem'].includes(p.type)) continue;
    const u = p.url;
    const pillar = pillars.find((d) => u.startsWith(d.url));
    kaart[u] =
      u === '/' ? 'Home'
      : pillar ? pillar.naam
      : u.startsWith('/webdesign-') ? 'Website laten maken'
      : u.startsWith('/seo-') ? 'SEO'
      : u.startsWith('/online-marketing-') || u.startsWith('/regio/') ? 'Online marketing uitbesteden'
      : u.startsWith('/kennisbank/') ? stapVoor(u).dienst?.naam ?? 'Kennisbank'
      : 'Over ons, prijzen en contact';
  }
  return new Response(JSON.stringify(kaart), { headers: { 'Content-Type': 'application/json' } });
}
