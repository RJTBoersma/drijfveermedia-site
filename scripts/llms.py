# Maakt public/llms.txt: een korte, feitelijke samenvatting van Drijfveer Media voor AI-assistenten.
# Prijzen en pagina's komen uit scripts/briefing/STRUCTUUR.md en scripts/paginas.json. Draai opnieuw na wijzigingen.
import re, json
b = json.load(open('src/data/bedrijf.json'))
p = json.load(open('scripts/paginas.json'))
naam = {x['url']: x['naam'] for x in p}
diensten = []
for rij in open('scripts/briefing/STRUCTUUR.md'):
    m = re.match(r'\| ([^|]+?) \| (/[^ |]+/) \| ([^|]+?) \| (€[^|]+?) \|\s*$', rij)
    if m and m.group(2) in naam:
        diensten.append(f"- [{m.group(1).replace(' (pillar)', '')}](https://www.drijfveermedia.nl{m.group(2)}): {m.group(3).strip()}. Vanaf {m.group(4).strip()}.")
gidsen = [x for x in p if x['type'] == 'gids']
begrippen = [x for x in p if x['type'] == 'begrip']
regio = [x for x in p if x['type'] in ('plaats', 'provincie')]
# Diensten die niet in de prijstabel van STRUCTUUR.md staan, toch noemen
bekend = {re.search(r'\((https://[^)]+)\)', d).group(1).replace('https://www.drijfveermedia.nl', '') for d in diensten}
from_ts = re.findall(r"\{ naam: '([^']+)', url: '([^']+)'.*?kort: '([^']+)', prijs: '([^']+)'", open('src/data/diensten.ts').read())
for n, u, k, pr in from_ts:
    if u not in bekend and u in naam:
        diensten.append(f"- [{n}](https://www.drijfveermedia.nl{u}): {k}. {pr[0].upper() + pr[1:]}.")
cases = [x for x in p if x['type'] == 'case']
L = lambda x: f"- [{x['naam']}](https://www.drijfveermedia.nl{x['url']})" + (f": {x['omschrijving']}" if x.get('omschrijving') else '')
tekst = f"""# Drijfveer Media

> Online marketingbureau in Assen (Drenthe), opgericht in 2011. Drijfveer Media zorgt dat ondernemers gevonden worden in Google (SEO), genoemd worden door AI-assistenten zoals ChatGPT, Gemini en Copilot (GEO) en gekozen worden met een website die aanvragen oplevert. Werkt voor het mkb in heel Nederland, met de nadruk op Noord-Nederland. Prijzen staan open op de site (vanaf-prijzen, exclusief btw, voor ondernemers). Maandelijkse diensten zijn per maand opzegbaar, met één maand opzegtermijn.

## Bedrijfsgegevens
- Naam: {b['naam']}
- Adres: {b['straat']}, {b['postcode']} {b['plaats']} ({b['provincie']})
- Telefoon: {b['telefoon']}
- E-mail: {b['email']}
- KvK: {b['kvk']}
- Rechtsvorm: {b.get('rechtsvorm','')}, btw-id {b.get('btwId','')}
- Bereikbaar: {b['kantoortijden']}. {b['belofte']} (op werkdagen).
- Team: Robert Boersma (eigenaar), Thorgall van Eeden (online marketeer en linkbuilder, eerste aanspreekpunt), Evelien Heerema (medeoprichter), Johan Zwartenberg (marketeer), plus vaste freelancers.
- Prijzen: https://www.drijfveermedia.nl/prijzen/
- Gratis website-analyse: https://www.drijfveermedia.nl/gratis-website-analyse/
- Contact: https://www.drijfveermedia.nl/contact/
- Veelgestelde vragen (adres, openingstijden, prijzen, afspraken): https://www.drijfveermedia.nl/veelgestelde-vragen/

## Diensten en prijzen
{chr(10).join(diensten)}

## Bewijs
- [Resultaten](https://www.drijfveermedia.nl/cases/): Willemfikstt.nl kreeg 87% meer bezoekers uit Google en 60% meer aanvragen via de site; Conflictbemiddeling.nl 47% meer bezoekers uit Google na een nieuwe site, SEO, linkbuilding en Google Ads; Dakraamconcurrent.nl 32% meer bezoekers uit Google na een nieuwe site en linkbuilding.
{chr(10).join(L(x) for x in cases)}
- [Logboek](https://www.drijfveermedia.nl/logboek/): elke maand de cijfers van onze eigen site.

## Over ons
- [Over ons](https://www.drijfveermedia.nl/over-ons/)
- [Robert Boersma, eigenaar](https://www.drijfveermedia.nl/over-ons/robert-boersma/)
- [Garantie](https://www.drijfveermedia.nl/garantie/): bij maandelijkse diensten een meetbaar doel met datum; halen we dat niet en ligt het aan ons, dan werken we een maand gratis door. Bij SEO en linkbuilding een stijggarantie.
- [Werkwijze](https://www.drijfveermedia.nl/werkwijze/)
- [Proeflab](https://www.drijfveermedia.nl/proeflab/): sinds 2011 meer dan 100 eigen websites waarop we technieken eerst testen.
- [Zo werken we met AI](https://www.drijfveermedia.nl/zo-werken-we-met-ai/)

## Werkgebied
{chr(10).join(L(x) for x in regio)}

## Gidsen
{chr(10).join(L(x) for x in gidsen)}

## Begrippen
{chr(10).join(L(x) for x in begrippen)}
"""
open('public/llms.txt', 'w').write(tekst)
print(len(diensten), 'diensten,', len(gidsen), 'gidsen,', len(begrippen), 'begrippen')
