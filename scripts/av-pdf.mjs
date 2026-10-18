// Maakt public/algemene-voorwaarden.pdf van de gebouwde pagina /algemene-voorwaarden/ (draai na een build).
// Zo kunnen de voorwaarden als pdf bij elke offerte (terhandstelling, art. 6:234 BW).
import { chromium } from '/opt/node-tools/node_modules/playwright/index.mjs';
import { copyFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';
const dist = process.env.DIST ?? 'dist';
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.webp': 'image/webp' };
const server = createServer((req, res) => {
  let p = join(dist, decodeURIComponent(req.url.split('?')[0]));
  if (!extname(p)) p = join(p, 'index.html');
  if (!existsSync(p)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': types[extname(p)] ?? 'application/octet-stream' }); res.end(readFileSync(p));
}).listen(4499);
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }).catch(() => chromium.launch());
const page = await b.newPage();
await page.goto('http://localhost:4499/algemene-voorwaarden/', { waitUntil: 'networkidle' });
await page.addStyleTag({ content: 'header.site-header, .site-footer, .mbar, nav[aria-label="Kruimelpad"], .kop-beeld, .zijkolom, .av-pdf, .skiplink, [class*="mobiel"] { display: none !important; } body { background: #fff !important; } .met-zijkolom { display: block !important; }' });
await page.pdf({ path: 'public/algemene-voorwaarden.pdf', format: 'A4', margin: { top: '18mm', bottom: '18mm', left: '16mm', right: '16mm' }, printBackground: false, displayHeaderFooter: true, headerTemplate: '<span></span>', footerTemplate: '<div style="font-size:8px;width:100%;text-align:center;color:#555">Algemene voorwaarden Drijfveer Media · pagina <span class="pageNumber"></span> van <span class="totalPages"></span></div>' });
await b.close(); server.close();
if (existsSync(dist)) copyFileSync('public/algemene-voorwaarden.pdf', join(dist, 'algemene-voorwaarden.pdf'));
console.log('pdf gemaakt');
