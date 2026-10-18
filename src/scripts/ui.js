// Kleine verbeteringen die op elke pagina gelden. Wordt geladen vanuit Header.astro (staat op elke pagina).
// 1. Tabellen met drie of meer kolommen stapelen op een telefoon (CSS in pagina.css, .tabel-stapel).
// 2. Bewegingen in de tekeningen stoppen binnen vijf seconden (WCAG 2.2.2).

/* ---------- 1. Tabellen ----------
   Elke cel krijgt de tekst van zijn kolomkop als data-label; CSS toont die als label boven de waarde.
   De ARIA-rollen houden de tabel een tabel voor schermlezers, ook als CSS de weergave verandert.
   Overslaan: tabellen met minder dan drie kolommen, zonder <thead>, met samengevoegde cellen,
   of met de klasse tabel-breed (brede vergelijkingen die horizontaal moeten blijven scrollen). */
function stapelTabellen() {
  document.querySelectorAll('main table').forEach((t) => {
    if (t.closest('.tabel-breed') || t.classList.contains('tabel-stapel')) return;
    const kopRij = t.tHead && t.tHead.rows[0];
    if (!kopRij || kopRij.cells.length < 3) return;
    if (t.querySelector('[colspan]:not([colspan="1"]), [rowspan]:not([rowspan="1"])')) return;
    const koppen = [...kopRij.cells].map((c) => c.textContent.replace(/\s+/g, ' ').trim());
    t.classList.add('tabel-stapel');
    t.setAttribute('role', 'table');
    t.tHead.setAttribute('role', 'rowgroup');
    [...kopRij.cells].forEach((c) => c.setAttribute('role', 'columnheader'));
    kopRij.setAttribute('role', 'row');
    for (const tb of t.tBodies) {
      tb.setAttribute('role', 'rowgroup');
      for (const r of tb.rows) {
        r.setAttribute('role', 'row');
        [...r.cells].forEach((c, i) => {
          if (!c.hasAttribute('data-label')) c.setAttribute('data-label', koppen[i] ?? '');
          c.setAttribute('role', c.tagName === 'TH' ? 'rowheader' : 'cell');
        });
      }
    }
  });
}

/* ---------- 2. Lussen stoppen ----------
   De tekeningen hebben kleine bewegingen die eindeloos herhalen (cursor, rimpel, stoom ...). Na 3,5 seconden
   maken we de lopende ronde nog af, versneld zodat hij binnen een seconde klaar is, en dan staat alles stil
   in de rustpositie. Zo stopt elke lus binnen 5 seconden zonder te verspringen. Wie "minder beweging" aan
   heeft staan, ziet deze lussen sowieso niet. */
const gestopt = new WeakSet();
function stopLussen() {
  if (typeof document.getAnimations !== 'function' || typeof CSSAnimation === 'undefined') return;
  for (const a of document.getAnimations()) {
    if (!(a instanceof CSSAnimation) || gestopt.has(a) || !a.effect) continue;
    const t = a.effect.getTiming();
    if (t.iterations !== Infinity || a.playState !== 'running') continue;
    const nu = Number(a.currentTime) || 0;
    if (nu < 3500) continue;
    gestopt.add(a);
    const vertraging = Number(t.delay) || 0;
    const duur = Number(t.duration) || 0;
    if (!duur) { a.cancel(); continue; }
    const ronde = Math.floor(Math.max(0, nu - vertraging) / duur);
    a.effect.updateTiming({ iterations: ronde + 1 });
    const rest = vertraging + (ronde + 1) * duur - nu; // ms tot het einde van deze ronde
    if (rest > 1000) a.updatePlaybackRate(rest / 1000);
  }
}

stapelTabellen();
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  setInterval(() => { if (!document.hidden) stopLussen(); }, 500);
}
