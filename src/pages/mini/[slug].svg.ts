// Miniaturen van de getekende scènes als losse SVG-bestanden (/mini/<slug>.svg).
// Zo hoeft een pagina met kaarten niet de code en CSS van alle 224 scènes mee te laden (panel SEO, 18-10-2026).
// De kaart toont het bestand met <img>; de view-transition naar de paginakop blijft werken via de omhullende div.
import type { APIRoute } from 'astro';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';

const scenes = import.meta.glob('../../components/scenes/*.astro', { eager: true }) as Record<string, { default: any }>;

export function getStaticPaths() {
  return Object.keys(scenes).map((p) => ({ params: { slug: p.split('/').pop()!.replace('.astro', '') } }));
}

// Dezelfde kleuren en lijnstijl als in pagina.css (.scene .l, .a, .v, .o, .zacht)
const basis = `<style>svg{--ink:#10283f;--navy:#074663;--muted:#4f6377;--chip:#e8eef4;--orange:#ff6600;--line:#d9e1ea}.l,.a{fill:none;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round}.l{stroke:#074663}.a{stroke:#ff6600}.v{fill:#e8eef4}.o{fill:#ff6600}text{font-family:'Albert Sans',system-ui,-apple-system,'Segoe UI',Roboto,Arial,sans-serif;fill:#10283f}.zacht{fill:#4f6377}</style>`;

let container: AstroContainer | undefined;
export const GET: APIRoute = async ({ params }) => {
  container ??= await AstroContainer.create();
  const scene = scenes[`../../components/scenes/${params.slug}.astro`];
  let svg = await container.renderToString(scene.default, { props: { mini: true } });
  svg = svg
    .replace(/<style[\s\S]*?<\/style>/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\sdata-astro-[a-z0-9-]+(="[^"]*")?/g, '')
    .replace(/\sdata-leeft(="")?/g, '')
    .trim();
  if (!/xmlns=/.test(svg)) svg = svg.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ');
  svg = svg.replace(/(<svg[^>]*>)/, `$1${basis}`);
  return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml; charset=utf-8' } });
};
