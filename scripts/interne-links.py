# Legt interne links naar (nieuwe) pagina's: de eerste vermelding van een term in lopende tekst (<p> of <li>)
# wordt een link, als de pagina nog niet naar het doel linkt. Maximaal 12 bronpagina's per doel en 4 nieuwe links per bron.
import re, os, json, glob, sys
doelen = {
 '/kennisbank/gidsen/wat-is-chatgpt/': [r'ChatGPT'],
 '/kennisbank/gidsen/claude-code/': [r'Claude Code'],
 '/kennisbank/gidsen/seo-strategie/': [r'SEO-strategie', r'SEO strategie'],
 '/kennisbank/gidsen/linkbuilding-strategie/': [r'linkbuildingstrategie', r'linkbuilding-strategie'],
 '/kennisbank/gidsen/content-plan-maken/': [r'contentplan', r'contentkalender', r'content plan'],
 '/kennisbank/gidsen/google-trends/': [r'Google Trends'],
 '/kennisbank/gidsen/infographic-maken/': [r'infographics?'],
 '/kennisbank/gidsen/concurrentieanalyse/': [r'concurrentieanalyse', r'concurrentenanalyse'],
 '/kennisbank/gidsen/wat-kost-google-ads/': [r'advertentiebudget', r'klikprijzen'],
 '/kennisbank/wat-is/https/': [r'(?<![\w/:."\'=-])https(?![:\w/."\'-])'],
 '/kennisbank/wat-is/kpi/': [r"KPI's", r'KPI'],
 '/kennisbank/wat-is/cpa/': [r'CPA'],
 '/kennisbank/wat-is/crm/': [r'CRM'],
 '/kennisbank/wat-is/affiliate-marketing/': [r'affiliate marketing', r'affiliates?'],
 '/kennisbank/wat-is/pagespeed-insights/': [r'PageSpeed Insights'],
 '/kennisbank/wat-is/heatmap/': [r'heatmaps?'],
 '/kennisbank/wat-is/knowledge-graph/': [r'Knowledge Graph', r'kennisvenster'],
 '/kennisbank/wat-is/500-fout/': [r'500-fout', r'500 Internal Server Error', r'servererror'],
 '/kennisbank/wat-is/googlebot/': [r'Googlebot'],
 '/kennisbank/wat-is/dofollow/': [r'nofollow', r'dofollow'],
 '/kennisbank/wat-is/inbound-marketing/': [r'inbound marketing', r'inbound'],
 '/kennisbank/wat-is/growth-hacking/': [r'growth hacking'],
 '/kennisbank/wat-is/viraal-gaan/': [r'viraal', r'viral'],
 '/kennisbank/wat-is/instagram-reels/': [r'Reels'],
 '/kennisbank/wat-is/digital-marketing/': [r'digital marketing', r'digitale marketing'],
 '/kennisbank/wat-is/on-page-seo/': [r'on-page SEO', r'on-page'],
 '/kennisbank/wat-is/zoekmachinemarketing/': [r'zoekmachinemarketing', r'zoekmachine marketing'],
 '/kennisbank/wat-is/semrush/': [r'Semrush'],
 '/kennisbank/wat-is/ahrefs/': [r'Ahrefs'],
 '/kennisbank/wat-is/mailchimp/': [r'Mailchimp'],
}
paginas = json.load(open('scripts/paginas.json'))
volgorde = {'begrip': 0, 'gids': 0, 'blog': 1, 'cluster': 2, 'pillar': 2, 'plaats': 4, 'provincie': 4, 'vast': 5}
bestanden = sorted([(volgorde.get(p['type'], 3), p['url']) for p in paginas if os.path.exists('src/pages' + p['url'] + 'index.astro')])
per_bron = {}
totaal = 0
for doel, termen in doelen.items():
    n = 0
    for _, url in bestanden:
        if n >= 12: break
        if url == doel or url.startswith(doel): continue
        f = 'src/pages' + url + 'index.astro'
        s = open(f).read()
        if f'"{doel}"' in s or f"'{doel}'" in s or per_bron.get(url, 0) >= 4: continue
        if not s.startswith('---'): continue
        kop, lijf = s.split('\n---\n', 1)
        regels = lijf.split('\n'); klaar = False
        for i, r in enumerate(regels):
            st = r.strip()
            if not (st.startswith('<p>') or st.startswith('<li>') or st.startswith('<p class="')): continue
            for t in termen:
                for m in re.finditer(r'(?<![\w>-])(' + t + r')(?![\w<-])', r):
                    voor = r[:m.start()]
                    # niet in een tag, niet in een bestaande link, niet in een {expressie}
                    if voor.count('<') > voor.count('>') or voor.rfind('<a ') > voor.rfind('</a>') or voor.count('{') > voor.count('}'): continue
                    if voor.rfind('<b>') > voor.rfind('</b>') or voor.rfind('<strong>') > voor.rfind('</strong>') or voor.rfind('<code>') > voor.rfind('</code>'): continue
                    regels[i] = voor + f'<a href="{doel}">{m.group(1)}</a>' + r[m.end():]
                    klaar = True; break
                if klaar: break
            if klaar: break
        if klaar:
            open(f, 'w').write(kop + '\n---\n' + '\n'.join(regels)); n += 1; totaal += 1
            per_bron[url] = per_bron.get(url, 0) + 1
    print(f'{n:2d}  {doel}')
print(totaal, 'nieuwe interne links')
