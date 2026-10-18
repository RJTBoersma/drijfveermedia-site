# Semantische analyse: welke begrippen komen telkens terug op de pagina's die in Google bovenaan staan?
# Invoer: een JSON-bestand {zoekwoord: [url, ...]} (top van Google NL uit SE Ranking).
# Uitvoer: per pagina in scripts/paginas.json de lijst "semantiek" (begrippen die op minstens de helft
# van de gelezen pagina's voorkomen) en "semantiekBron".
# Gebruik: python3 scripts/semantiek.py serp.json
import json, re, sys, math, collections, concurrent.futures, subprocess, html as H
from urllib.parse import urlparse

STOP = set('''de het een en van in op te is dat die voor met zijn je jouw we wij ons onze aan als bij of om ook door naar dan maar niet uit over tot nog meer wat wie hoe waar er al deze dit zo kan kun kunnen wordt worden heeft hebben heb ik jij u uw hun hen haar hij zij ze was waren werd zal zullen moet moeten wil willen gaat gaan doen doet hier daar alle elke veel goed meest heel echt nu na via per binnen zonder onder tussen sinds jullie mijn zich geen iets alles één twee drie vier vijf lees bekijk klik meer minder waarom wanneer welke welk zoals omdat zodat terwijl tijdens tegen toch wel even ook bijvoorbeeld daarom daarnaast bovendien echter verder tevens steeds vaak altijd nooit soms andere ander eigen nieuwe nieuw grote groot kleine klein beste goede hele eerste tweede laatste jaar jaren dag dagen keer manier staat komt maakt maken zien geven krijgen krijg krijgt houden laten weet weten gebruik gebruiken gebruikt helpt helpen zorgen zorgt vind vinden belangrijk belangrijke mogelijk dus wel waarbij waardoor hierdoor hierbij erg zeer echt alleen samen snel the and for you your are with this that can our more about ben jou zou graag anders elkaar verschillende werken werkt komen nodig direct klaar mensen bekend stuur zelf basis gemaakt resultaat resultaten online kennis manieren zit zitten eens wij jaar één hen dé enkele ervoor erop ermee daarbij daardoor zie ziet zeker volgens juiste juist hoeveel paar extra voorkomen precies plek ieder iedere gaan gaat ging mag mogen weg lang lange kort korte meteen vaak hoog hoger later eerst eerder betekent betekenis staan stap stappen tip tips vraag vragen antwoord artikel voorbeeld voorbeelden'''.split())
EXTRA = set('''bent hebt denk laat kortom uiteraard schreef vul verwacht stoppen boost gedegen input but than have without call rather almost entirely retrieved current march april june july may cohort from has was were will would which their they them there what when who into also been being such other some these those only most just over under after before world real-world applications kost tijd toe hetzelfde uitkomen volgt korter redenen bestaand ontwikkelt apart vak elk tevreden laat zichtbaar bereid zoals zowel waarin welke hiervoor alsnog opnieuw ofwel eigenlijk natuurlijk simpel simpelweg lastig makkelijk makkelijker gewoon allerlei diverse divers ongeveer totaal hoeveelheid aantal kun kunt wilt zult hoort moet'''.split())
RUIS = set('''cookie cookies privacy privacyverklaring voorwaarden algemene menu contact home blog blogs artikel artikelen auteur reacties reactie delen deel nieuwsbrief inschrijven aanmelden lezen leestijd min minuten gepubliceerd geschreven bijgewerkt copyright rechten voorbehouden ga inhoud zoeken terug volgende vorige pagina klik hier download gratis offerte bel ons mail neem whatsapp linkedin facebook instagram twitter youtube tiktok accepteren instellingen reviews sterren beoordeling'''.split())

def haal(url):
    try:
        out = subprocess.run(['curl', '-sS', '-L', '-m', '15', '-A', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36', url], capture_output=True, timeout=20)
        if out.returncode != 0 or len(out.stdout) < 2000: return url, ''
        s = out.stdout.decode('utf8', 'ignore')
    except Exception:
        return url, ''
    m = re.search(r'(?is)<article[^>]*>(.*?)</article>', s) or re.search(r'(?is)<main[^>]*>(.*?)</main>', s)
    s = m.group(1) if m else s
    s = re.sub(r'(?is)<(script|style|nav|header|footer|noscript|form|aside|svg)[^>]*>.*?</\1>', ' ', s)
    t = H.unescape(re.sub(r'<[^>]+>', ' ', s)).lower()
    return url, t

def termen(t, merk):
    w = re.findall(r"[a-zà-ÿ][a-zà-ÿ'-]+", t)
    goed = lambda x: len(x) > 2 and x not in STOP and x not in RUIS and x not in EXTRA and x not in merk and not re.search(r'\d', x)
    uni = {x for x in w if goed(x)}
    bi = {f'{a} {b}' for a, b in zip(w, w[1:]) if goed(a) and goed(b)}
    freq = collections.Counter([x for x in w if goed(x)])
    return uni | bi, freq, len(w)

def main(pad):
    serp = json.load(open(pad))
    paginas = json.load(open('scripts/paginas.json'))
    per_kw = {p['zoekwoord']: p for p in paginas if p.get('zoekwoord')}
    alle = sorted({u for us in serp.values() for u in us})
    teksten = {}
    with concurrent.futures.ThreadPoolExecutor(16) as ex:
        for url, t in ex.map(haal, alle): teksten[url] = t
    klaar = 0
    # eerst per zoekwoord de kandidaten, dan weten we welke termen overal opduiken (generiek)
    groepen = {}
    for kw, urls in serp.items():
        p = per_kw.get(kw)
        if not p or (p.get('semantiek') and 'SE Ranking' not in p.get('semantiekBron', '')): continue
        docs = []
        for u in urls:
            t = teksten.get(u, '')
            if len(t.split()) < 250 or re.search(r'en\.wikipedia|ibm\.com|replit|brightedge|semrush|moz\.com|backlinko|ahrefs|yoast', u): continue
            merk = set(re.findall(r'[a-z]+', urlparse(u).netloc)) - {'www', 'nl', 'com', 'be', 'eu', 'org', 'net'}
            docs.append((u, *termen(t, merk)))
        if len(docs) < 2: continue
        groepen[kw] = docs
    overal = collections.Counter()
    for kw, docs in groepen.items():
        df = collections.Counter()
        for _, st, _f, _n in docs: df.update(st)
        drempel = max(2, math.ceil(len(docs) * 0.5))
        overal.update({x for x, n in df.items() if n >= drempel})
    G = max(1, len(groepen))
    for kw, docs in groepen.items():
        p = per_kw[kw]
        df = collections.Counter(); tf = collections.Counter()
        for _, s, f, _n in docs:
            df.update(s); tf.update(f)
        drempel = max(2, math.ceil(len(docs) * 0.5))
        kwdelen = set(re.findall(r'[a-zà-ÿ]+', kw.lower()))
        kand = [x for x, n in df.items() if n >= drempel and not set(x.split()) <= kwdelen]
        # Tweewoordcombinaties eerst als ze vaak samen voorkomen, daarna losse woorden op frequentie
        gewicht = lambda x: (df[x] / len(docs)) * math.log(G / overal[x]) * (1.6 if ' ' in x else 1)
        kand = [x for x in kand if overal[x] / G < 0.35]
        kand.sort(key=lambda x: -gewicht(x))
        gekozen = []
        for x in kand:
            if any(x in g.split() or g in x.split() for g in gekozen): continue
            gekozen.append(x)
            if len(gekozen) == 15: break
        if len(gekozen) >= 8:
            p['semantiek'] = gekozen
            p['semantiekBron'] = f'Top van Google NL via SE Ranking, 17 okt 2026: ' + ', '.join(urlparse(d[0]).netloc.replace('www.', '') for d in docs)
            klaar += 1
    json.dump(paginas, open('scripts/paginas.json', 'w'), ensure_ascii=False, indent=1)
    zonder = [p['url'] for p in paginas if p.get('zoekwoord') and not p.get('semantiek')]
    print(f'{klaar} pagina\'s kregen semantiek; zonder: {len(zonder)}')
    for z in zonder: print('  ', z)

main(sys.argv[1])
