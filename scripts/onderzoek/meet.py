# Meet per website: bereikbaar, https, mobiel (viewport), titel, meta description, structured data,
# robots.txt (AI-crawlers geblokkeerd), llms.txt, copyrightjaar in de footer, CMS, HTML-grootte en reactietijd.
# Gebruik: python3 -I meet.py sites.json uit.json
import json, re, sys, time, ssl, socket, urllib.request, urllib.error, concurrent.futures as cf
from urllib.parse import urlparse, urljoin

sites = json.load(open(sys.argv[1]))
UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36 (onderzoek Drijfveer Media)'
ctx = ssl.create_default_context()
AI_BOTS = ['gptbot', 'chatgpt-user', 'oai-searchbot', 'claudebot', 'anthropic-ai', 'google-extended', 'perplexitybot', 'ccbot', 'bytespider', 'applebot-extended']

def haal(url, timeout=20, maxb=1_500_000):
    req = urllib.request.Request(url, headers={'User-Agent': UA, 'Accept-Language': 'nl-NL,nl;q=0.9'})
    t0 = time.time()
    with urllib.request.urlopen(req, timeout=timeout, context=ctx) as r:
        data = r.read(maxb)
        return r.status, r.geturl(), data.decode(r.headers.get_content_charset() or 'utf-8', 'ignore'), time.time() - t0, len(data)

def robots_blokkeert(txt):
    # Per user-agent-groep: blokkeert hij "/" helemaal voor een AI-bot (of voor *)?
    groepen, huidig, regels = [], [], []
    for regel in txt.splitlines():
        regel = regel.split('#')[0].strip()
        if not regel or ':' not in regel: continue
        k, v = [x.strip() for x in regel.split(':', 1)]
        k = k.lower()
        if k == 'user-agent':
            if regels: groepen.append((huidig, regels)); huidig, regels = [], []
            huidig.append(v.lower())
        elif k in ('disallow', 'allow'):
            regels.append((k, v))
    if huidig or regels: groepen.append((huidig, regels))
    geblokkeerd = set(); alles_dicht = False
    for agents, rs in groepen:
        dicht = any(k == 'disallow' and v == '/' for k, v in rs) and not any(k == 'allow' and v == '/' for k, v in rs)
        if not dicht: continue
        for a in agents:
            if a == '*': alles_dicht = True
            for b in AI_BOTS:
                if b in a: geblokkeerd.add(b)
    return sorted(geblokkeerd), alles_dicht

def meet(s):
    uit = {'id': s['id'], 'prov': s['p'], 'soort': s['t'], 'domein': s['d']}
    start = s['w'] if s['w'].startswith('http') else 'http://' + s['w']
    try:
        status, eind, html, tijd, grootte = haal(start)
    except urllib.error.HTTPError as e:
        uit.update(bereikbaar=False, fout=f'HTTP {e.code}'); return uit
    except Exception as e:
        uit.update(bereikbaar=False, fout=type(e).__name__ + ': ' + str(e)[:80]); return uit
    laag = html.lower()
    uit.update(bereikbaar=True, status=status, eind=eind, https=eind.startswith('https://'), tijd=round(tijd, 2), kb=round(grootte / 1024))
    # http -> https doorsturen? (alleen als we op http begonnen)
    uit['viewport'] = bool(re.search(r'<meta[^>]+name=["\']viewport', laag))
    t = re.search(r'<title[^>]*>(.*?)</title>', html, re.S | re.I)
    uit['titel'] = bool(t and t.group(1).strip())
    uit['titel_len'] = len(t.group(1).strip()) if t else 0
    desc = ''
    for tag in re.findall(r'<meta\b[^>]*>', html, re.I):
        if re.search(r'\bname\s*=\s*(["\']?)description\1', tag, re.I):
            m = re.search(r'\bcontent\s*=\s*"([^"]*)"', tag, re.I) or re.search(r"\bcontent\s*=\s*'([^']*)'", tag, re.I)
            if m: desc = m.group(1).strip(); break
    uit['description'] = len(desc) >= 10
    uit['desc_tekst'] = desc[:160]
    uit['titel_tekst'] = (t.group(1).strip()[:120] if t else '')
    ld = re.findall(r'<script[^>]+application/ld\+json[^>]*>(.*?)</script>', html, re.S | re.I)
    uit['jsonld'] = bool(ld)
    uit['localbusiness'] = bool(re.search(r'"@type"\s*:\s*\[?\s*"[A-Za-z]*(LocalBusiness|Organization|Store|Restaurant|Dentist|Plumber|Electrician|HomeAndConstructionBusiness|ProfessionalService|LodgingBusiness|Hotel|AutoRepair|HealthAndBeautyBusiness|Accounting|LegalService|RealEstateAgent|FoodEstablishment|MedicalBusiness)', ' '.join(ld)))
    uit['h1'] = bool(re.search(r'<h1[\s>]', laag))
    uit['tel_link'] = 'href="tel:' in laag or "href='tel:" in laag
    # Copyrightjaar: het hoogste jaartal naast © of 'copyright'
    jaren = [int(j) for j in re.findall(r'(?:©|&copy;|copyright)\s*(?:[^<\d]{0,20})?((?:19|20)\d\d)(?:\s*[-–]\s*((?:19|20)\d\d))?', laag) for j in (j if isinstance(j, tuple) else (j,)) if j]
    uit['copyright'] = max(jaren) if jaren else None
    cm = re.search(r'(?:©|&copy;|copyright).{0,40}', laag)
    uit['copyright_tekst'] = cm.group(0)[:60] if cm else ''
    cms = 'onbekend'
    if 'wp-content' in laag or 'wp-includes' in laag: cms = 'WordPress'
    elif 'wix.com' in laag or 'wixstatic' in laag: cms = 'Wix'
    elif 'squarespace' in laag: cms = 'Squarespace'
    elif 'jimdo' in laag: cms = 'Jimdo'
    elif 'shopify' in laag: cms = 'Shopify'
    elif 'joomla' in laag: cms = 'Joomla'
    elif 'webflow' in laag: cms = 'Webflow'
    elif 'strikingly' in laag or 'mijnwebsite' in laag or 'one.com' in laag or 'site123' in laag: cms = 'bouwpakket'
    uit['cms'] = cms
    gen = re.search(r'<meta[^>]+name=["\']generator["\'][^>]+content=["\']([^"\']+)', html, re.I)
    uit['generator'] = gen.group(1)[:40] if gen else ''
    # robots.txt en llms.txt op het einddomein
    basis = '{0.scheme}://{0.netloc}'.format(urlparse(eind))
    try:
        st, _, rob, _, _ = haal(basis + '/robots.txt', timeout=10, maxb=200_000)
        if st == 200 and 'user-agent' in rob.lower():
            uit['robots'] = True
            uit['ai_geblokkeerd'], uit['alles_dicht'] = robots_blokkeert(rob)
            uit['sitemap_in_robots'] = 'sitemap:' in rob.lower()
        else:
            uit['robots'] = False
    except Exception:
        uit['robots'] = False
    try:
        st, _, l, _, _ = haal(basis + '/llms.txt', timeout=10, maxb=50_000)
        uit['llms'] = st == 200 and not l.lstrip().lower().startswith('<!doctype') and '<html' not in l[:500].lower() and len(l.strip()) > 20
    except Exception:
        uit['llms'] = False
    # Stuurt http door naar https?
    if uit['https']:
        try:
            _, e2, _, _, _ = haal('http://' + urlparse(eind).netloc + '/', timeout=10, maxb=10_000)
            uit['http_naar_https'] = e2.startswith('https://')
        except Exception:
            uit['http_naar_https'] = None
    return uit

res = []
with cf.ThreadPoolExecutor(40) as ex:
    for i, r in enumerate(ex.map(meet, sites)):
        res.append(r)
        if i % 100 == 0: print(i, flush=True)
json.dump(res, open(sys.argv[2], 'w'), ensure_ascii=False)
print('klaar', len(res))
