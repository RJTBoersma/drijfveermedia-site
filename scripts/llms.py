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
L = lambda x: f"- [{x['naam']}](https://www.drijfveermedia.nl{x['url']})"
tekst = f"""# Drijfveer Media

> Online marketingbureau in Assen (Drenthe), opgericht in 2011. Drijfveer Media zorgt dat ondernemers gevonden worden in Google (SEO), genoemd worden door AI-assistenten zoals ChatGPT, Gemini en Copilot (GEO) en gekozen worden met een website die aanvragen oplevert. Werkt voor het mkb in heel Nederland, met de nadruk op Noord-Nederland. Prijzen staan open op de site, alle maandabonnementen zijn maandelijks opzegbaar.

## Bedrijfsgegevens
- Naam: {b['naam']}
- Adres: {b['straat']}, {b['postcode']} {b['plaats']} ({b['provincie']})
- Telefoon: {b['telefoon']}
- E-mail: {b['email']}
- KvK: {b['kvk']}
- Bereikbaar: {b['kantoortijden']}. {b['belofte']} (op werkdagen).
- Team: Robert Boersma (eigenaar), Thorgall van Eeden (online marketeer, eerste aanspreekpunt), Evelien Heerema (medeoprichter), Johan Zwartenberg (linkbuilder), plus vaste freelancers.
- Prijzen: https://www.drijfveermedia.nl/prijzen/
- Gratis website-analyse: https://www.drijfveermedia.nl/gratis-website-analyse/
- Contact: https://www.drijfveermedia.nl/contact/
- Veelgestelde vragen (adres, openingstijden, prijzen, afspraken): https://www.drijfveermedia.nl/veelgestelde-vragen/

## Diensten en prijzen
{chr(10).join(diensten)}

## Werkgebied
{chr(10).join(L(x) for x in regio)}

## Gidsen
{chr(10).join(L(x) for x in gidsen)}

## Begrippen
{chr(10).join(L(x) for x in begrippen)}
"""
open('public/llms.txt', 'w').write(tekst)
print(len(diensten), 'diensten,', len(gidsen), 'gidsen,', len(begrippen), 'begrippen')
