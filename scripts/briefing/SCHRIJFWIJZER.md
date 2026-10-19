# Schrijfwijzer voor de nieuwe drijfveermedia.nl

Je schrijft en bouwt een aantal pagina's van de nieuwe site van Drijfveer Media (Assen). De site is Astro 5, statisch. Twaalf voorbeeldpagina's zijn af en goedgekeurd: die zijn je maatstaf voor toon, opbouw en vormgeving. Lees eerst deze wijzer helemaal, daarna de voorbeeldpagina van jouw paginatype, daarna pas schrijven.

Bronnen in deze map:
- `STRUCTUUR.md`: per pagina wat erop moet, de prijs, en welke oude blogs erin opgaan.
- `ANTWOORDEN-ROBERT.txt`: de antwoorden van de eigenaar. Dit zijn de enige feiten over het bedrijf die je mag gebruiken.
- `BOUWBOEK.md`: achtergrond over schrijven voor Google en AI, markup, conversie.
- `../paginas.json`: per URL het zoekwoord, varianten, semantiek (termen die je moet verwerken), woorddoel (min/max), type.
- `../serp.json`: per zoekwoord de URL's die nu bovenaan Google NL staan.

## 1. Werkwijze (verplicht, in deze volgorde)

1. `sh /home/claude/drijfveermedia/scripts/werkplek.sh <jouwnaam>` maakt `/tmp/werk/<jouwnaam>`. Werk alleen daar.
2. Onderzoek per pagina:
   - Lees de pagina-info in paginas.json en STRUCTUUR.md.
   - Haal 2 tot 4 van de topresultaten uit serp.json op met curl, om te zien wat ze behandelen (niet om over te nemen):
     `curl -sL -m 15 -A "Mozilla/5.0" <url> | python3 -c "import sys,re,html;t=sys.stdin.read();t=re.sub(r'(?is)<(script|style|nav|footer|header)[^>]*>.*?</\1>',' ',t);print(html.unescape(re.sub(r'<[^>]+>',' ',t))[:6000])"`
   - Oude blogs die erin opgaan: `https://www.drijfveermedia.nl/blog/<slug>/` (ook met curl). Neem bruikbare inhoud over en herschrijf die in de nieuwe toon.
   - Feiten over plaatsen: `https://nl.wikipedia.org/wiki/<Plaats>` met curl.
   - Gebruik ALLEEN curl voor onderzoek. Geen WebFetch, geen WebSearch, geen browser. Die vragen de eigenaar om toestemming en hij zit er niet bij. Lukt een URL niet (403), neem dan een andere.
3. Schrijf de pagina in `src/pages/<url>/index.astro` en de scène in `src/components/scenes/<slug>.astro` (slug = URL zonder slashes aan begin en eind, `/` wordt `--`; bijvoorbeeld `/kennisbank/gidsen/backlinks/` wordt `kennisbank--gidsen--backlinks.astro`).
4. Controleer in je werkplek:
   `cd /tmp/werk/<jouwnaam> && npx astro build > /tmp/werk/<jouwnaam>.log 2>&1; tail -3 /tmp/werk/<jouwnaam>.log; node scripts/tekstcheck.mjs --alleen=/url1/,/url2/`
   Elke pagina moet een ✓ krijgen. Los elke melding op door de tekst te verbeteren, niet door trucs (geen verborgen tekst, geen zoekwoord-opvulling).
5. Lees elke pagina daarna nog één keer kritisch als een ondernemer uit Drenthe: klopt het, is het nuttig, klinkt het als een mens? Pas aan en controleer opnieuw.
6. Zet je werk terug: `sh /home/claude/drijfveermedia/scripts/terugzetten.sh <jouwnaam> <pagina-map> [...]` (pagina-map zonder slashes aan begin/eind, bijvoorbeeld `kennisbank/gidsen/backlinks`).
7. Wijzig NOOIT gedeelde bestanden: layouts, components (behalve je eigen scènes), data, styles, scripts, paginas.json, astro.config. Mist er iets in een gedeeld bestand, meld het in je eindverslag.

Je eindverslag: per pagina woorden en ✓, plus wat je niet kon oplossen of wat de eigenaar moet weten. Kort.

## 2. Toon en schrijfregels

- Nederlands, zakelijk maar persoonlijk. Je-vorm. "We" voor Drijfveer Media. Nuchter, Noordelijk, geen poespas. Gevoel dat de lezer moet krijgen: nuchtere ondernemers, kwaliteit, betaalbaar, zij zorgen voor mijn succes.
- Schrijf als een vakman die het aan een klant uitlegt aan de keukentafel. Concreet: noem getallen, stappen, voorbeelden, namen van tools. Geen algemeenheden.
- Wissel korte en lange zinnen af. Een zin van drie woorden mag. Gemiddeld onder de 20 woorden, met veel variatie (de check meet het).
- Geen gedachtestreepjes (— of –). Geen uitroeptekens. Hooguit twee keer per pagina: bovendien, daarnaast, verder, tevens, echter.
- Verboden woorden en frasen (de check faalt erop): cruciaal, essentieel, naadloos, robuust, ontdek, ontgrendel, duik in, holistisch, digitale wereld, digitale landschap, kortom, het is belangrijk om, speelt een belangrijke rol, of je nu, laten we, in de wereld van, next level, game changer, revolutionair, naar een hoger niveau, oplossingen op maat, op maat gemaakte, toegevoegde waarde, synergie, ontzorgen, al met al, tot slot, in een notendop, het geheim van, nooit eerder, stel je voor, de sleutel tot, baanbrekend, state-of-the-art, boost, skyrocket, unlock. Nooit: politiek, gender, gay, woke, inclusie.
- Vermijd ook andere AI-tics: "in dit artikel", "zoals eerder vermeld", "het mag duidelijk zijn", "wist je dat", "dé oplossing", rijtjes van precies drie bijvoeglijke naamwoorden, elke alinea beginnen met een vraag, afsluiten met een samenvatting die alles herhaalt.
- Koppen in Nederlandse zinsopbouw: alleen het eerste woord en eigennamen met hoofdletter. Nooit Engelse Title Case.
- Geen spoortje AI in de tekst. Wel mag je eerlijk zijn dat Drijfveer Media AI gebruikt (zie /zo-werken-we-met-ai/).

## 3. Feiten: wat waar is (en verder niets)

Verzin nooit feiten over het bedrijf, klanten, resultaten, reviews of cijfers. Een voorbeeld ter illustratie mag, maar benoem het dan als verzonnen voorbeeld ("Stel: een installateur in Emmen ..." of in een bijschrift "Verzonnen voorbeeld"). Algemene vakfeiten (hoe Google werkt) mag je gebruiken als ze kloppen; noem een harde statistiek alleen als je hem met curl bij een betrouwbare bron hebt gelezen, en noem dan de bron.

- Drijfveer Media, opgericht 2011 door Robert Boersma en Evelien Heerema. Ze waren twee weken op vakantie in België, hadden het na twee dagen gezien, besloten voor zichzelf te beginnen en schreven het bedrijf op dag drie thuis in. Naam: talent zonder inzet is niets, kennis zonder te delen is niets; alles begint bij de juiste drijfveren.
- Adres Lauwers 9, 9405 BL Assen: een bedrijfsverzamelpand met een community van hardwerkende ondernemers. Bezoek is welkom. Telefoon 088 11 55 666, info@drijfveermedia.nl. Gebruik in code `site.telefoon`, `site.email`, enz. uit `src/data/site.ts`. KvK en btw: `site.kvk`, `site.btw` (worden nog ingevuld, gebruik de variabelen).
- Team van 4 plus een community van freelancers: Robert Boersma (eigenaar, online marketeer), Thorgall van Eeden (online marketeer, eerste aanspreekpunt; schrijf altijd Thorgall, nooit Thor), Evelien Heerema (medeoprichter), Johan Zwartenberg (linkbuilder).
- Werkdagen 8.00 tot 17.00 uur. Binnen 15 minuten teruggebeld, uit interesse, niet om te verkopen.
- Werkwijze in vijf stappen: (1) binnen 15 minuten terugbellen, (2) vragen, vragen, vragen tot we weten wat je echt wilt, (3) mogelijkheden bestuderen en voorleggen, telefonisch of persoonlijk (bij ons of op locatie), (4) lage investering en concrete targets waar we op afgerekend kunnen worden, (5) beginnen waar de grootste kans op snel verschil zit, daarna perfectioneren (Pareto).
- Garantie: we spreken samen een doel af. Halen we dat niet en ligt het aan ons, dan werken we een maand gratis door. Voorwaarde: de klant doet wat nodig is en gevraagd wordt om het doel te halen. Bij SEO en linkbuilding: stijggarantie. Maandelijks opzegbaar, tenzij anders afgesproken.
- Linkbuilding (bevestigd door Robert, 19-10-2026): € 75 per uur, exclusief btw, geen vast maandbedrag. Een uur levert meestal 3 tot 5 links op. De klant spreekt uren per maand af, zegt per maand op, en de stijggarantie geldt. We werken per uur en niet per link: kwantiteit is bij linkbuilding niet moeilijk, maar gaat vaak ten koste van kwaliteit. Eén goede link is meer waard dan honderd slechte, en slechte links kunnen schaden.
- Proeflab: al 15 jaar meer dan 100 eigen leadsites in verschillende beroepen. Daar testen we ideeën en technieken voordat we ze bij klanten inzetten. Eerlijk verhaal: vroeger namen we met eigen sites soms te veel risico (greyhat), een eigen site kreeg ooit een penalty van Google. Juist daarom testen we op eigen sites. Bij klanten blijven we ruim binnen de regels van zoekmachines en AI.
- Klanten blijven jaren, er is amper verloop. Klanten uit heel Nederland en ook het buitenland. Ideale klant: mkb, rond € 500 per maand.
- Klantnamen die genoemd mogen worden: Kärcher, bol.com, Nyenrode, Conflictbemiddeling Nederland, Glaspunt (online marketing, tekstschrijven, leadgeneratie, linkbuilding). Zeg niet per naam wat we precies voor wie deden, tenzij het in een case staat.
- Cases:
  - Willemfikstt.nl: zie `src/pages/cases/willemfikstt/index.astro` (nummer 1-posities, +87% groei).
  - Conflictbemiddeling Nederland (onderdeel van Menke & Van der Poel vof, eigenaren Rosalie Menke en Joppe van der Poel; mediationopleidingen): nieuwe responsive website, SEO en linkbuilding, Google Ads. Resultaat: +47% organisch verkeer, eerste posities op "mediation opleiding", hogere page en domain authority, meer conversies en aanvragen.
  - Dakraam Concurrent (officieel VELUX-installatiepartner): eerst een nieuwe website, daarna linkbuilding, daarna SEO. Resultaat: +32% organisch verkeer, nummer 1 op "dakraam plaatsen", hogere autoriteit, meer aanvragen.
  - De cijfers zijn echt maar er is geen meetperiode bekend; noem dus geen periode.
- Geen reviews, geen sterren, geen certificaten, geen lidmaatschappen, geen Google Partner, geen awards. Noem ze niet en suggereer ze niet.
- AI-tools die we echt gebruiken: Claude, ChatGPT, Gemini, Copilot, Grok, Perplexity, Google AI Studio, NotebookLM, Suno, Whisk, SE Ranking. Over AI en klantgegevens: we zijn een online marketingbureau dat AI gebruikt; wie dat helemaal niet wil, kunnen we bij sommige diensten helpen, bij andere niet. Zeg dat vriendelijk.
- Meningen van Robert (gebruik ze waar ze passen, in je eigen woorden):
  - Veel bureaus zijn beter in zichzelf verkopen dan in klanten laten groeien. Een gelikte pitch zegt weinig over wat er na de handtekening gebeurt.
  - Vakjargon verbergt vaak gebrek aan inhoud. Wie niet helder kan uitleggen wat hij doet, begrijpt het misschien zelf niet.
  - Een bureau hoort te verdienen aan klanten die blijven omdat het werkt, niet aan klanten die vastzitten aan een contract.
  - Een bureau dat alleen successen rapporteert, vertelt niet het hele verhaal. Je betaalt ook voor eerlijk advies over wat niet werkt.
  - Bureaus adviseren te weinig om ergens mee te stoppen. Verspild budget schrappen is soms meer waard dan een nieuwe campagne.
  - Een rapportage waar de klant uitleg bij nodig heeft, schiet zijn doel voorbij.
- Prijzen (vanaf, excl. btw): zie de tabellen in STRUCTUUR.md. Gebruik exact die bedragen.
- Wat we NIET doen (nooit aanbieden of suggereren): webshops bouwen, webshop-SEO, YouTube-SEO, digitale PR, toegankelijkheid als dienst, hosting, apps, fotografie, video, animatie, podcasts, Microsoft Ads, social advertising, display/DOOH, retail media, influencers, employer branding, LinkedIn-profielen, AI-automatisering en chatbots, strategie en marketingplannen als losse dienst. Geen Fries of Gronings spreken. Geen eigen Google Ads van Drijfveer Media.
- Werkgebied: Noord-Nederland (Drenthe, Friesland, Groningen) en Zwolle, maar ook heel Nederland en buitenland. Assen is de enige vestiging. Schrijf op plaatspagina's nooit dat we "in" die plaats zitten; we komen erheen of werken op afstand.

## 4. SEO-eisen (de check controleert ze allemaal)

Per pagina, uit paginas.json:
- Title 30 tot 60 tekens, zoekwoord vooraan (in de eerste 40%), eindig op " | Drijfveer Media" als dat past.
- Meta description 120 tot 160 tekens, met zoekwoord of variant, eindigt op een hele zin met punt.
- Precies één H1, met het zoekwoord.
- Zoekwoord in de eerste 100 woorden.
- Zoekwoord of variant in minstens één H2, maar in hooguit de helft van de H2's.
- Dichtheid 0,5 tot 2,5% (zoekwoordwoorden gedeeld door alle woorden). Het patroon is soepel: "webdesign in Emmen" telt voor "webdesign emmen", meervoud telt mee, tussenwoordjes in/uit/voor/bij/te/van/de/het/een/je/jouw/met/op mogen ertussen.
- Semantiek: minstens 70% van de termen in `semantiek` moet letterlijk in de tekst staan (verbuiging met s/en/e/n mag). Verwerk ze natuurlijk. Een term die echt onzin is in jouw context, sla je over (dat mag tot 30%).
- Minstens 3 interne links in de tekst. Een clusterpagina linkt naar zijn pillar. Gidsen linken naar hun dienst. Plaatspagina's linken naar hun dienst-pillar en hun provincie (/regio/...). Link alleen naar URL's die in paginas.json staan.
- Alle afbeeldingen een alt.
- Woorden binnen min en max van paginas.json.
- AIDA (als `aida: true`): blokken met `data-aida="attention"`, `"interest"`, `"desire"`, `"action"` in die volgorde, en een link naar /gratis-website-analyse/, /contact/ of tel:. Hero geeft attention, een eigen `<section data-aida="interest">` de inhoud, `<Bewijs />` desire, `<Actie />` action.
- Op één pagina mag geen view-transition-name of id dubbel voorkomen: link met plaatjes (Verder) nooit naar de pagina zelf en nooit twee keer naar dezelfde URL. `<Bewijs />` toont standaard een kaart naar /cases/willemfikstt/; link die dan niet ook in Verder (of gebruik `<Bewijs case={false} />`).
- Schema: geef een passend JSON-LD-blok mee via `schema` op Base (Service met offers voor diensten, Article/BlogPosting voor gidsen en blogs met author Robert, DefinedTerm voor begrippen, zie de voorbeelden). FAQ krijgt automatisch FAQPage via `<Faq>`.

## 5. Opbouw per type (kijk naar het voorbeeld)

| Type | Voorbeeld | Opbouw |
|---|---|---|
| pillar / hub | `src/pages/generative-engine-optimization/index.astro` | Hero met prijs en scène, Inhoud (inhoudsopgave) bij lange pagina's, interest-secties met `stap-kop` + Tekening, prijskaarten, Bewijs, Faq (5 tot 8 vragen), Verder (3 tot 6 kaarten naar clusters/gidsen), Actie |
| cluster (dienst) | `src/pages/lokale-seo/google-bedrijfsprofiel/index.astro` | Hero, interest, Prijskaart, Bewijs, Faq, Verder, Actie |
| plaats | `src/pages/webdesign-assen/index.astro` | Hero, interest met lokale details, Bewijs, Faq, Verder, Actie |
| provincie | `src/pages/regio/drenthe/index.astro` | Hero met kaart, plaatsen, diensten, Bewijs, Faq, Verder, Actie |
| gids | `src/pages/kennisbank/gidsen/wat-kost-seo/index.astro` | Hero (kicker "Gids · Onderwerp"), Auteur (robert, 2026-10-17), Inhoud, stappen met stap-kop, kaders, Bewijs (korte versie), Faq, Verder, Actie. De gids is echt bruikbaar, ook voor wie nooit klant wordt |
| begrip | `src/pages/kennisbank/wat-is/e-e-a-t/index.astro` | Kop met definitie in één zin plus scène, Auteur, uitleg, voorbeeld, kader met links, Actie |
| case | `src/pages/cases/willemfikstt/index.astro` | Uitgangssituatie, wat we deden, resultaat, wat de lezer ervan kan leren |
| vaste pagina | `src/pages/over-ons/index.astro`, `prijzen`, `contact`, `gratis-website-analyse` | Eigen opbouw, wel Hero en Actie |
| overzicht | `src/pages/kennisbank/index.astro` | Kaarten met Plaatje, gegroepeerd |

Componenten (in `src/components/`): `pagina/Hero`, `pagina/Bewijs`, `pagina/Faq`, `pagina/Actie`, `pagina/Verder`, `pagina/Prijskaart`, `pagina/Inhoud`, `pagina/Auteur`, `pagina/Aanvraagformulier`, `teken/Tekening` (iconen: vergrootglas, ai, klik, schild, kalender, kolf, telefoon, pin, ketting, scherm, pen, merk, megafoon, social, magneet, grafiek, mail, kompas, koffie, boek, munten, lamp, team, tandwiel, ster, raket, scan, doel, huis), `teken/Veer`, en de bestaande beelden in `beeld/` en `teken/`. Lees een component voordat je hem gebruikt, voor de juiste props. CSS-klassen uit `src/styles/pagina.css` en `global.css` (wrap, sectie, raster, card, kader, kader-titel, vink, stap-kop, kicker, muted, klein, btn) gebruik je zoals de voorbeelden doen. Eigen CSS kan in een `<style>` in je pagina.

## 6. De scène: plaatjes die tot leven komen

Elke pagina krijgt een eigen getekende scène, uniek voor die pagina en passend bij het onderwerp. Hij staat in de Hero (`<Scene slot="beeld" />`) of in de kop van een begrip. Dezelfde scène verschijnt automatisch als miniatuur op elke kaart die naar de pagina linkt (`<Scene mini />`), en bij een klik groeit de miniatuur uit tot de kop. De miniatuur is dus het eerste beeld van de animatie.

Regels:
- Bestand `src/components/scenes/<slug>.astro`, prop `mini?: boolean`.
- Eén `<svg class="scene" viewBox="0 0 480 270">` (16:9, past op kaart en in de kop).
- De basistekening is in de mini-versie en de volledige versie identiek en staat er meteen (zo groeit de miniatuur bij een klik naadloos uit tot de kop). Gebruik daarom GEEN `data-teken` en geen `pathLength`-tekeneffect op de basistekening.
- De volledige versie krijgt `data-leeft`, `role="img"` en een `aria-label` die beschrijft wat je ziet. Zodra hij in beeld is, krijgt de svg de klasse `in-beeld` en komt de tekening tot leven: alleen in de volledige versie (`{!mini && ...}`) voeg je een bewegingslaag toe. Denk aan: een cursor die klikt, een grafiek die stijgt, een pin die valt, een melding die verschijnt, een balkje dat volloopt, een lijn die zichzelf tekent, sterren die oplichten. Minstens twee bewegende elementen per scène, waarvan één blijft lopen (loop van 3 tot 8 seconden) en rustig is.
- Mini-versie: `aria-hidden="true"`, geen bewegingslaag, geen bijschrift.
- Huisklassen voor de tekening: `class="l"` navy lijn, `class="a"` oranje lijn, `class="v"` lichte vlakvulling, `class="o"` oranje vulling. Kleuren verder: navy #074663, inkt #10283f, oranje #ff6600, lijn #d9e1ea, chip #e8eef4, wit, groen #1f8a5b voor een vinkje. Oranje spaarzaam, als accent.
- Bewegende elementen: verberg ze vooraf alleen onder `:global(.teken-js)` (die klasse staat er alleen als JavaScript werkt en de bezoeker beweging toestaat), start de animatie onder `.in-beeld`. Zonder JavaScript of met "minder beweging" staat alles er dan gewoon, stil. Voeg ook `@media (prefers-reduced-motion: reduce)` toe die animaties uitzet.
- Teksten in de scène kort en echt (geen lorem ipsum), en nooit verzonnen klantnamen die echt zouden kunnen lijken; gebruik "Jouw bedrijf", "Bakkerij De Vries (voorbeeld)" of algemene labels. Tekst in een scène telt niet mee voor de woordtelling, maar houd hem Nederlands en foutloos.
- Alle id's (gradients, clipPaths) en keyframe-namen uniek: begin ze met je slug, bijvoorbeeld `id="kennisbank-gidsen-backlinks-gloed"` en `@keyframes kennisbank-gidsen-backlinks-op`.
- Geen bekende figuren, logo's of merkbeelden namaken (geen Google-logo, geen ChatGPT-logo, geen Instagram-logo); een algemeen zoekveld, chatvenster of telefoonscherm is prima.
- Alleen inline SVG en CSS, geen externe bestanden, geen JavaScript, geen `<img>`.
- Vorm: illustratief en vriendelijk, in de stijl van de bestaande beelden (`src/components/beeld/*.astro`, `src/components/teken/*.astro`). Kijk naar Kaartpakket.astro, Schermen.astro, Scanner.astro en RitTerug.astro voor het idee. Een scène vertelt in één beeld de belofte van de pagina.

Minimaal sjabloon:

```astro
---
// Scène voor /kennisbank/gidsen/backlinks/: drie sites wijzen met een link naar jouw site, die daardoor stijgt.
interface Props { mini?: boolean }
const { mini = false } = Astro.props;
---
<svg class="scene" viewBox="0 0 480 270" data-leeft={mini ? undefined : ''} role={mini ? undefined : 'img'} aria-hidden={mini ? 'true' : undefined} aria-label={mini ? undefined : 'Getekend: drie websites linken naar jouw website, die daardoor in Google stijgt.'}>
  <rect x="180" y="80" width="130" height="100" rx="10" fill="#fff" stroke="#d9e1ea" stroke-width="2" />
  <rect class="v" x="196" y="98" width="70" height="10" rx="5" />
  <path class="l" d="M70 60h70v50H70z" />
  <path class="a" d="M140 85C165 90 170 110 180 120" />
  {!mini && (
    <g>
      <path class="lijn" d="M330 170l30-40 30 10 40-60" fill="none" stroke="#ff6600" stroke-width="4" stroke-linecap="round" pathLength="1" />
      <g class="melding"><rect x="300" y="190" width="150" height="34" rx="10" fill="#fff" stroke="#d9e1ea" /><text x="318" y="212" font-size="13" font-weight="800">+3 posities</text></g>
    </g>
  )}
</svg>
<style>
  .lijn { stroke-dasharray: 1; }
  :global(.teken-js) .lijn { stroke-dashoffset: 1; }
  :global(.teken-js) .melding { opacity: 0; }
  .in-beeld .lijn { animation: kennisbank-gidsen-backlinks-lijn 1.4s cubic-bezier(.6,.1,.3,1) 0.5s forwards; }
  .in-beeld .melding { animation: kennisbank-gidsen-backlinks-melding 5s ease-in-out 1.6s infinite both; }
  @keyframes kennisbank-gidsen-backlinks-lijn { to { stroke-dashoffset: 0; } }
  @keyframes kennisbank-gidsen-backlinks-melding { 0% { opacity: 0; transform: translateY(8px); } 15%, 85% { opacity: 1; transform: none; } 100% { opacity: 0; } }
  @media (prefers-reduced-motion: reduce) { .in-beeld .lijn, .in-beeld .melding { animation: none; } }
</style>
```

Op de pagina:

```astro
import Scene from '../../../../components/scenes/kennisbank--gidsen--backlinks.astro';
...
<Hero kicker="Gids · Linkbuilding" titel="..."><p>...</p><Scene slot="beeld" /></Hero>
```

Bij een begrip-kop zonder Hero: zet `<div style={`view-transition-name:${overgang(url)}`}><Scene /></div>` zoals in het e-e-a-t-voorbeeld (import `overgang` uit `src/data/miniaturen`).

Het bestaande beeld van de voorbeeldpagina's (Kaartpakket, Schermen, enz.) mag je NIET hergebruiken als hoofdscène; elke pagina heeft een eigen scène. Kleine bestaande tekeningen (Tekening, Veer) mag je wel overal in de tekst gebruiken.

Controleer je scène in de build (geen fouten) en kijk of de SVG-code klopt (gesloten paden, niets buiten de viewBox).

## 7. Inhoud die een klant overtuigt

- Begin bij de lezer: wat wil hij bereiken, waar loopt hij tegenaan. Geef dan het antwoord.
- Geef echte kennis weg: stappenplannen, checklists, rekenvoorbeelden, valkuilen. Een concurrent die dit leest, moet denken: dat hadden wij ook moeten schrijven.
- Laat zien hoe wij het doen (werkwijze, proeflab, garantie), zonder op te scheppen.
- FAQ: echte vragen die mensen stellen (zie de concurrenten), korte directe antwoorden.
- Eén duidelijke volgende stap: de gratis website-analyse of bellen met Thorgall.
- Diensten-pagina's noemen de vanaf-prijs en wat erbij zit.
- Plaatspagina's moeten echt over die plaats gaan: bedrijventerreinen, wijken, het soort ondernemers, afstand en reistijd vanaf Assen, regionale concurrentie in Google (zonder concurrenten bij naam af te kraken). Elke plaatspagina is anders; kopieer geen alinea's tussen plaatsen.

## 8. Huisstijl na het expertpanel (18-10-2026)

De tekstcheck keurt deze punten nu af (zie `STIJL` in `scripts/tekstcheck.mjs`):
- "eerlijk" hooguit één keer per pagina, nooit in een kop of meta description. "Eerlijk is eerlijk" schrappen en meteen met het feit beginnen. Laat zien dat je eerlijk bent, zeg het niet.
- "gewoon" hooguit één keer, en alleen in de betekenis "normaal". Nooit in een kop of meta description.
- "in gewone taal" niet meer gebruiken. Zeg wat de klant concreet krijgt, bijvoorbeeld "elke maand één A4: wat we deden, wat het opleverde en wat we nu doen".
- AI-patronen: hooguit twee keer "niet/geen X, maar Y" per pagina, hooguit één zin die met "Niet" begint, geen "Dat is geen …", geen "zegt alles/niets/weinig/genoeg", geen "goud waard".
- "Uit interesse, niet om te verkopen" niet meer gebruiken. Schrijf: "Thorgall vraagt eerst wat je wilt bereiken."
- "gelikte pitch" alleen op /over-ons/. "De koffie staat klaar" alleen op /contact/. Het penaltyverhaal (eigen site kreeg een straf) uitgebreid alleen op /proeflab/ en /linkbuilding/, elders hooguit één zin met een link.
- Geen "rapport van dertig/veertig pagina's". Zeg wat je wel krijgt: één A4 per maand.
- Kop "Fouten die we vaak zien" wordt "Veelgemaakte fouten".
- "binnen 15 minuten" altijd met "op werkdagen" (of "tussen 8.00 en 17.00 uur") op dezelfde pagina; bij een losse belofte in de zin zelf.
- Schrijfwijze: zoekmachineoptimalisatie, Google-reviews, SEO-bureau, SEO-specialist, Google Ads-specialist, brandingbureau, socialemediabureau, contentmarketing, AI-overzicht (AI Overviews alleen als productnaam), Apple Business (niet meer "Apple Business Connect"), vóór 8.15 uur, "een vaste groep freelancers die we al jaren kennen". "p/m" alleen in tabellen en prijskaarten, in lopende tekst "per maand".
- Termijnen ("hoe snel zie ik resultaat?") komen uit `src/data/termijnen.ts`. Opzeggen: "per maand, met één maand opzegtermijn, per e-mail".
- Wat we niet doen komt uit `src/data/niet.ts`. Nooit iets toevoegen dat daar niet staat. Webshops: "bouwen of optimaliseren doen we niet; Google Shopping voor een bestaande webshop wel".
- Garantie: alleen bij maandelijkse diensten, met een doel en datum die we bij de start vastleggen. Bij eenmalig werk (website, logo, huisstijl, audit) beloof je een vaste prijs vooraf, geen garantie.
- Klantnamen (Kärcher, bol.com, Nyenrode, Glaspunt): "we werkten onder meer voor", nooit "vertrouwd door" of "op onze klantenlijst".
- FAQ-vragen specifiek per pagina maken ("Hoe snel sta ik hoger in Zwolle?" in plaats van "Hoe snel zie ik resultaat?"), met het antwoord uit termijnen.ts.
- Geen zelfverdediging ("zonder trucs", "zonder verkooppraatje", "geen marketingpraatje") en geen afzetten tegen andere bureaus ("cowboys"). Laat zien wat je doet.
