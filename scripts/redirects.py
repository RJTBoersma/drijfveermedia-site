# Maakt public/.htaccess: elke oude URL van drijfveermedia.nl gaat met één 301 naar zijn nieuwe plek.
# Invoer: scripts/oude-urls.txt (uit de oude sitemap) en de tabel "Oude blogs" in scripts/briefing/STRUCTUUR.md.
import re, json, sys
oud = [l.strip().replace('https://www.drijfveermedia.nl', '') for l in open('scripts/oude-urls.txt') if l.strip()] + ['/DM-algemenevoorwaarden.pdf', '/wp-content/uploads/Algemene-Voorwaarden-2.pdf']
nieuw = {p['url'] for p in json.load(open('scripts/paginas.json'))}
kaart = {}
# 1. Blogs die in een gids opgaan (STRUCTUUR.md)
for rij in open('scripts/briefing/STRUCTUUR.md'):
    m = re.match(r'\|[^|]+\| (/kennisbank/gidsen/[^ ]+/) \|.*\| ([^|]+) \|\s*$', rij)
    if not m or m.group(2).strip() == '-': continue
    for slug in [s.strip() for s in m.group(2).split(',')]:
        for u in oud:
            if u.startswith('/blog/' + slug): kaart[u] = m.group(1)
# 2. Vaste toewijzingen
vast = {
 '/blog/': '/kennisbank/', '/404-2/': '/', '/diensten/': '/prijzen/',
 '/blog/de-20-beste-online-marketingblogs/': '/kennisbank/de-20-beste-online-marketingblogs/',
 '/blog/geavanceerd-zoeken-met-google/': '/kennisbank/geavanceerd-zoeken-met-google/',
 '/blog/hoe-voorkom-je-een-daling-in-websiteverkeer/': '/kennisbank/hoe-voorkom-je-een-daling-in-websiteverkeer/',
 '/blog/alles-wat-je-moet-weten-over-webp/': '/kennisbank/wat-is/webp/',
 '/blog/de-title-tag-uitgelegd-en-title-tag-optimalisatie-tips/': '/kennisbank/wat-is/title-tag/',
 '/blog/domain-authority-da-en-page-authority-pa/': '/kennisbank/wat-is/domain-authority/',
 '/blog/het-belang-van-alt-tekst-voor-seo/': '/kennisbank/wat-is/alt-tekst/',
 '/blog/het-belang-van-een-sterke-404-pagina/': '/kennisbank/wat-is/404-pagina/',
 '/blog/het-gevaar-van-keyword-cannibalization-en-hoe-je-het-kan-oplossen/': '/kennisbank/wat-is/keyword-cannibalization/',
 '/blog/hoe-geef-anchortekst-vorm/': '/kennisbank/wat-is/anchortekst/',
 '/blog/hoe-krijg-je-positie-0-in-google/': '/kennisbank/wat-is/featured-snippet/',
 '/blog/hoe-slecht-is-duplicate-content-voor-seo/': '/kennisbank/wat-is/duplicate-content/',
 '/blog/voorkom-mixed-content-en-beloon-veilige-site/': '/kennisbank/wat-is/mixed-content/',
 '/blog/wat-is-crawlbudget/': '/kennisbank/wat-is/crawlbudget/',
 '/blog/wat-is-e-e-a-t-en-waarom-is-het-belangrijk-voor-seo/': '/kennisbank/wat-is/e-e-a-t/',
 '/blog/wat-is-een-bounce-rate/': '/kennisbank/wat-is/bounce-rate/',
 '/blog/wat-is-een-redirect/': '/kennisbank/wat-is/redirect/',
 '/blog/wat-is-een-sitemap-belangrijk-voor-je-seo/': '/kennisbank/wat-is/sitemap/',
 '/blog/wat-is-google-passage-ranking/': '/kennisbank/wat-is/passage-ranking/',
 '/blog/wat-is-het-verschil-tussen-seo-en-sea/': '/kennisbank/wat-is/seo-en-sea/',
 '/blog/wat-is-interne-linkbuilding/': '/kennisbank/wat-is/interne-links/',
 '/blog/wat-is-link-juice/': '/kennisbank/wat-is/link-juice/',
 '/blog/wat-is-semantisch-zoeken/': '/kennisbank/wat-is/semantisch-zoeken/',
 '/blog/wat-is-zoekintentie-aka-search-intent/': '/kennisbank/wat-is/zoekintentie/',
 '/blog/wat-zijn-entiteiten-in-seo-en-waarom-zijn-ze-belangrijk/': '/kennisbank/wat-is/entiteiten/',
 '/blog/wat-zijn-google-sitelinks/': '/kennisbank/wat-is/sitelinks/',
 '/blog/wat-zijn-headings/': '/kennisbank/wat-is/headings/',
 '/blog/wat-is-seo-en-waarom-is-het-belangrijk/': '/kennisbank/gidsen/hoe-werkt-seo/',
 '/blog/generative-engine-optimization-geo-zichtbaar-worden-in-ai-antwoorden/': '/kennisbank/gidsen/wat-is-geo/',
 '/blog/answer-engine-optimization-de-toekomst-van-vindbaarheid-online/': '/kennisbank/gidsen/wat-is-geo/',
 '/blog/seo-aeo-en-geo-van-gevonden-worden-tot-genoemd-worden/': '/kennisbank/gidsen/wat-is-geo/',
 '/blog/hoeveel-invloed-hebben-google-recensies-op-je-ranking-in-google/': '/kennisbank/gidsen/google-reviews/',
 '/blog/6-gratis-alternatieven-voor-googles-keyword-tool/': '/kennisbank/gidsen/zoekwoordonderzoek/',
 '/blog/zoekwoorden-onderzoek/': '/kennisbank/gidsen/zoekwoordonderzoek/',
 '/blog/17-soorten-linkbait-om-je-site-te-verbeteren/': '/kennisbank/gidsen/backlinks/',
 '/blog/5-linkbuilding-tips-na-google-penguin/': '/kennisbank/gidsen/backlinks/',
 '/blog/googles-nofollow-tag-gewijzigd-de-consequenties/': '/kennisbank/gidsen/backlinks/',
 '/blog/google-introduceert-penguin-2-0/': '/linkbuilding/',
 '/blog/negatieve-seo-de-keerzijde-van-googles-ranking-systeem/': '/linkbuilding/google-disavow-tool/',
 '/blog/whitelabel-seo-alleen-maar-winnaars/': '/zoekmachine-optimalisatie/seo-uitbesteden/',
 '/blog/10-mythes-vs-4-oud-google-medewerkers/': '/kennisbank/gidsen/hoe-werkt-seo/',
 '/blog/google-update-bert/': '/kennisbank/wat-is/semantisch-zoeken/',
 '/blog/google-lamda-en-mum-gaan-seo-veranderen/': '/kennisbank/wat-is/semantisch-zoeken/',
 '/blog/welke-impact-heeft-voice-search-op-seo/': '/kennisbank/wat-is/zoekintentie/',
 '/blog/google-waarschuwt-nu-wanneer-de-zoekresultaten-onbetrouwbaar-zijn/': '/kennisbank/gidsen/hoe-werkt-seo/',
 '/blog/hoe-optimaliseer-je-voor-google-discover/': '/kennisbank/gidsen/hoger-in-google/',
 '/blog/de-voordelen-van-pillarpages/': '/kennisbank/wat-is/interne-links/',
 '/blog/mobielvriendelijkheid-wordt-nog-belangrijker-door-amp/': '/kennisbank/gidsen/website-sneller-maken/',
 '/blog/6-meest-interessante-websitestatistieken-voor-kleine-ondernemer/': '/kennisbank/gidsen/google-analytics-4/',
 '/blog/what-the-floc-google-stopt-met-third-party-cookies/': '/kennisbank/gidsen/privacyverklaring-en-cookies/',
 '/blog/een-nieuw-waarschuwingssysteem-bij-google-ads/': '/kennisbank/gidsen/wat-is-google-ads/',
 '/blog/drie-manieren-om-meer-uit-contentmarketing-te-halen/': '/tekstschrijver/contentmarketing/',
 '/blog/8-tips-voor-het-schrijven-van-effectieve-video-marketing-scripts/': '/tekstschrijver/',
 '/blog/promotie-seizoensgebonden-producten/': '/kennisbank/gidsen/inhaakkalender/',
 '/blog/17-tips-om-meer-twittervolgers-te-krijgen/': '/kennisbank/gidsen/social-media-planning/',
 '/blog/de-invloed-van-social-media-op-zoekmachine-optimalisatie/': '/social-media-beheer/',
 '/blog/demografie-per-sociaal-media-platform-anno-2021/': '/kennisbank/gidsen/social-media-planning/',
 '/blog/meeste-facebook-videos-worden-bekeken-zonder-geluid/': '/kennisbank/gidsen/social-media-planning/',
 '/blog/seo-voor-pinterest/': '/social-media-beheer/',
 '/blog/tiktok-marketing-een-inleiding/': '/social-media-beheer/',
 '/blog/de-leukste-google-easter-eggs/': '/kennisbank/geavanceerd-zoeken-met-google/',
 '/blog/de-drijfveer-media-seo-rap/': '/over-ons/',
 '/blog/waarom-we-vanaf-nu-tutoyeren/': '/over-ons/',
 '/blog/online-marketing-werkervaringsplaats-assen/': '/werken-bij/',
 '/blog/stagelopen-bij-drijfveer-media-leerzaam-en-gezellig/': '/werken-bij/',
 '/blog/werken-voor-niets-hoe-wenselijk-is-dat/': '/werken-bij/',
 '/vacatures/': '/werken-bij/', '/vacatures/online-marketing-stage/': '/werken-bij/',
 '/cases/dakraam-concurrent/': '/cases/dakraamconcurrent/',
 '/cases/cijferbaas/': '/cases/', '/cases/dw-huisontruiming/': '/cases/', '/cases/industrialfreezing/': '/cases/',
 '/content-marketing-uitbesteden/': '/tekstschrijver/contentmarketing/',
 '/diensten/ai-vindbaarheidsanalyse/': '/generative-engine-optimization/ai-vindbaarheidsanalyse/',
 '/diensten/generative-engine-optimization/': '/generative-engine-optimization/',
 '/diensten/google-ads/': '/online-adverteren/google-ads-bureau/',
 '/google-ads-uitbesteden/': '/online-adverteren/google-ads-bureau/',
 '/diensten/leadgeneratie/': '/leadgeneratie/',
 '/diensten/link-building-netherlands/': '/linkbuilding/link-building-netherlands/',
 '/diensten/linkbuilding-niederlande/': '/linkbuilding/linkbuilding-niederlande/',
 '/diensten/linkbuilding/': '/linkbuilding/',
 '/diensten/linkbuilding/google-disavow-tool/': '/linkbuilding/google-disavow-tool/',
 '/diensten/linkbuilding/linkbuilding-uitbesteden/': '/linkbuilding/linkbuilding-uitbesteden/',
 '/diensten/lokale-online-marketing/': '/lokale-seo/',
 '/diensten/tekstschrijver/': '/tekstschrijver/',
 '/diensten/website-laten-maken/': '/website-laten-maken/',
 '/diensten/wordpress-hack/': '/website-laten-maken/wordpress-hack/',
 '/diensten/zoekmachine-optimalisatie/': '/zoekmachine-optimalisatie/',
 '/google-optimalisatie-google-ranking/': '/zoekmachine-optimalisatie/',
 '/seo-uitbesteden/': '/zoekmachine-optimalisatie/seo-uitbesteden/',
 '/website-toevoegen-aan-google/': '/kennisbank/gidsen/google-search-console/',
 '/over-ons/team/': '/over-ons/', '/privacy/': '/privacyverklaring/',
 '/ervaringsberoepen/': '/cases/',
 '/DM-algemenevoorwaarden.pdf': '/algemene-voorwaarden/',
 '/wp-content/uploads/Algemene-Voorwaarden-2.pdf': '/algemene-voorwaarden/',
 '/blog/5-stappen-om-google-analytics-avg-vriendelijk-in-te-stellen/': '/kennisbank/gidsen/google-analytics-4/',
 '/blog/7-manieren-succesvol-gebruiken-e-mailnieuwsbrief-online-marketingcampagne/': '/kennisbank/gidsen/nieuwsbrief-maken/',
 '/blog/vijf-stappen-om-je-mobiele-website-te-optimaliseren/': '/kennisbank/gidsen/website-sneller-maken/',
 '/blog/zeven-tips-om-je-merk-neer-te-zetten-op-de-social-media/': '/kennisbank/gidsen/social-media-planning/',
}
kaart.update(vast)
for u in oud:
    if u.startswith('/ervaringsberoepen/'): kaart.setdefault(u, '/cases/')
regels, mis = [], []
for u in oud:
    doel = kaart.get(u)
    if doel is None:
        if u in nieuw: continue  # bestaat nog op dezelfde plek
        mis.append(u); continue
    if doel == u: continue
    if doel not in nieuw and doel != '/': mis.append(f'{u} -> {doel} (doel bestaat niet)'); continue
    regels.append(f'RedirectMatch 301 ^{re.escape(u.rstrip("/")) if u != "/" else ""}/?$ {doel}')
kop = open('scripts/htaccess-basis.txt').read() if __import__('os').path.exists('scripts/htaccess-basis.txt') else ''
open('public/.htaccess', 'w').write(kop + '\n# Oude URL\'s van de vorige site (één stap, geen ketens)\n' + '\n'.join(sorted(regels)) + '\n')
print(len(regels), 'redirects;', 'zonder plek:' if mis else 'alles heeft een plek', *mis, sep='\n')
