# Zet op lange pagina's (gidsen, begrippen, diensten, plaatsen) halverwege een <Tussenactie />.
# Idempotent: pagina's die er al een hebben, worden overgeslagen. Gebruik: python3 scripts/tussenactie.py [url ...]
import json, re, sys, os
paginas = json.load(open('scripts/paginas.json'))
alleen = set(sys.argv[1:])
types = {'gids', 'begrip', 'pillar', 'cluster', 'plaats', 'provincie'}
klaar = 0
for p in paginas:
    if p['type'] not in types or (alleen and p['url'] not in alleen): continue
    f = 'src/pages' + p['url'] + 'index.astro'
    if not os.path.exists(f): continue
    s = open(f).read()
    if '<Tussenactie' in s: continue
    kop, lijf = s.split('\n---\n', 1) if s.startswith('---') else ('', s)
    regels = lijf.split('\n')
    # kandidaten: h2's in de lopende tekst (niet in een component-prop of script)
    idx = [i for i, r in enumerate(regels) if re.match(r'\s*(<div class="stap-kop">.*)?<h2[\s>]', r) and 'data-aida="action"' not in r]
    if len(idx) < 5: continue
    keuzes = [idx[int(len(idx) * 0.4)]] + ([idx[int(len(idx) * 0.75)]] if len(idx) >= 10 else [])
    for i in sorted(set(keuzes), reverse=True):
        inspring = re.match(r'\s*', regels[i]).group(0)
        regels.insert(i, f'{inspring}<Tussenactie />')
    diepte = p['url'].strip('/').count('/') + 1
    imp = "import Tussenactie from '" + '../' * (diepte + 1) + "components/pagina/Tussenactie.astro';"
    m = list(re.finditer(r'^import .*;$', kop, re.M))
    kop = kop[:m[-1].end()] + '\n' + imp + kop[m[-1].end():] if m else kop + '\n' + imp
    open(f, 'w').write(kop + '\n---\n' + '\n'.join(regels))
    klaar += 1
print(klaar, "pagina's kregen een tussenactie")
