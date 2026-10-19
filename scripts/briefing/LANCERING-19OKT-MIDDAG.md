# Nieuwe drijfveermedia.nl: lanceerlijst (stand 19 oktober 2026, middag)

## Status
Inhoud, verkooppagina's, linkbuildingcluster, cases, portfolio, toestemmingsbalk en statistiek zijn klaar. Alle controles zijn groen op 241 pagina's: tekstcheck, linkcheck, WCAG 2.2 AA (axe, 482 scans), controle op overgenomen tekst en geen concurrentnamen. De site wacht alleen nog op toegang om online te zetten en op het SPF-record.

## Nodig van Robert vóór de livegang
1. **GitHub en Vimexx:** een privé GitHub-repository met de geheimen FTP_SERVER, FTP_USERNAME en FTP_PASSWORD (optioneel FTP_MAP), en de naam van de repository (voor admin/config.yml). Wachtwoorden vult Robert zelf in.
2. **SPF-record repareren** (blokkerend). Nu: `v=spf1include:spf.protection.outlook.com-all` (ongeldig). Wordt: `v=spf1 include:spf.protection.outlook.com include:<spf van Vimexx> -all`. Daarna testen met een echte aanvraag.
3. **Algemene voorwaarden oktober 2026 deponeren bij KVK** (algemene.voorwaarden@kvk.nl, "vervanging"). Mag kort na de livegang, maar snel: anders geldt de oude versie zonder maandelijkse opzegbaarheid en garantie.

## Direct na de livegang
- Search Console: verificatie staat al in de site (meta-tag). Sitemap indienen, oude URL's testen (ook http en zonder www), 301's van /regio/groningen/, /online-marketing-friesland/, /kennisbank/wat-is/geo/ en de oude cases controleren.
- Google Ads: de tag laadt pas na toestemming (balk). Maak in Google Ads een conversie op paginabezoek met URL "/bedankt/", of stuur het conversielabel (AW-362377547/…), dan zet ik het op de bedankpagina.
- Bing Webmaster Tools: importeren vanuit Search Console.
- Testaanvraag doen (met en zonder "Mail me alleen"): mail komt aan (niet in spam), juiste bedankpagina, logbestand wordt aangemaakt.
- Statistiek: sleutel van minstens 12 tekens in api/data/sleutel.txt zetten (via FTP). Daarna /api/statistiek.php?sleutel=… openen: per onderwerp, uit AI-assistenten, aanvragen per eerste pagina.
- De toestemmingsbalk en "Cookie-instellingen" in de footer één keer testen op de live site.
- SE Ranking: doel-URL's bijwerken.
- Twee weken na livegang: nagaan of home en /online-marketing-assen/ elkaar niet afwisselen.

## Elk kwartaal
- Prijzen in de kostengidsen nalopen (SEO, Google Ads, website, linkbuilding): markt anoniem, "openbare prijspagina's, oktober 2026" bijwerken.
- Pagina's zonder klikken, AI-citaties of aanvragen na twee kwartalen samenvoegen met hun hub (cluster-statistiek op /api/statistiek.php).
- AI-gidsen, toolprijzen en klikprijzen nalopen.
- Eigen posities en AI-meting intern bijhouden; publiceren in het logboek zodra ze goed zijn (besluit Robert).

## Openstaand van Robert (niet blokkerend)
- Jurist naar de voorwaarden (boetes art. 14, exclusiviteit 3.9, AI-artikelen 4.16-4.18).
- Verwerkersovereenkomsten Vimexx en Microsoft, verwerkingsregister, A4 over AI-gebruik (AI Act art. 4).
- Reviews: Thorgall vraagt vanaf nu klanten na oplevering om een Google-review (besluit 19-10). Vijf echte reviews dichten het grootste gat op alle verkooppagina's.
- Zie verder claude/commercieel-19okt-2026.md en claude/antwoorden-robert-19okt.md.

## Na elke wijziging
`python3 scripts/og.py && python3 scripts/llms.py && npm run build` (de build draait de tekstcheck). Bij een wijziging in de voorwaarden: `node scripts/av-pdf.mjs`.
