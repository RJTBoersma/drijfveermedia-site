
# Bouwboek
De holistische aanpak voor de nieuwe drijfveermedia.nl: techniek, structuur, tekst, markup, snelheid, conversie, vertrouwen en meten in één standaard. Elke regel is onderbouwd met onze eigen metingen of met onderzoek. Waar het bewijs zwak is, staat dat erbij. Opgesteld 16 oktober 2026.
## Wat bewezen is
### Wat Google zelf zegt
Volgens Google Search Central (bijgewerkt 10 december 2025) gelden voor AI-overzichten en AI Mode geen extra eisen. Er zijn geen speciale bestanden, geen AI-tekstbestanden en geen speciaal schema nodig. Wat wel telt:
De pagina is geïndexeerd en mag als fragment getoond worden.
Crawlen is toegestaan, ook via het CDN.
De pagina is goed bereikbaar via interne links.
De paginabeleving is goed.
De belangrijke inhoud staat in tekst.
Het schema komt overeen met de zichtbare tekst.
Het Bedrijfsprofiel is actueel.
Klikken vanuit AI-resultaten tellen in Search Console mee onder "Web".
Gevolg: llms.txt doet niets voor Google. We zetten hem neer voor andere assistenten, maar verwachten er niets van.
### Wat onderzoek laat zien
Bevinding
Bron
Wat wij ermee doen
Pagina's op positie 1 tot 3 worden in 98,9 procent van de gevallen ergens door AI geciteerd, top 10 in 90 procent, daarbuiten in 49,3 procent
Rankability, augustus 2026, 11 AI-platforms (correlatie)
Google-posities blijven de basis van GEO
Bij organisch verlies daalden de AI-citaties mee: ChatGPT −28 procent, AI Mode −24 procent; Perplexity niet
Lily Ray, februari 2026, 11 sitedelen
ChatGPT, Gemini en AI Mode volgen Google: eerst SEO op orde
AI-overzichten overlappen voor 86 procent (domein) met de top 10, AI Mode voor 54 procent; gemiddeld 3 respectievelijk 7 bronnen per antwoord
Semrush, 5.000 zoekwoorden
Top 10 halen is de toegangskaart
Geciteerde passage in AI Mode: mediaan 117 woorden; in 80 procent staat het antwoord in de eerste zin, onder een kop die als vraag is geformuleerd
Pillarbase via Search Engine Land, juli 2026, 15,7 miljoen citaties (onderzoek van een leverancier)
Vaste alinea-opbouw, zie de tekstregels
Merkvermeldingen op het web correleren het sterkst met zichtbaarheid in AI-overzichten (0,664), sterker dan verwijzende domeinen (0,295)
Ahrefs, 75.000 merken
Genoemd worden telt, ook zonder link: PR en de Noorden Online Index
Citaten toevoegen +41 procent zichtbaarheid, statistieken +31 procent, bronnen noemen +27 procent; zoekwoorden stapelen −8 procent
Princeton/IIT Delhi, KDD 2024 (getest op een GPT-zoekmachine, niet op Google)
Elke pillar krijgt cijfers, een citaat van een expert en bronnen
Ongeveer 85 procent van de AI-citaties komt van content uit de laatste 3 jaar
Seer Interactive, via Search Engine Land
Datum zichtbaar, elk kwartaal bijwerken
Google splitst een vraag in deelvragen ("query fan-out")
iPullRank, via Search Engine Land
Pillars beantwoorden ook de logische vervolgvragen
### Wie nu in Google's AI-antwoord staat voor onze termen
Ik heb 30 van onze zoektermen gecontroleerd in SE Ranking. SE Ranking registreert per term de eerste bron in het AI-overzicht. 16 van de 30 termen tonen een AI-overzicht.
Zoekterm
Bron in het AI-overzicht
Organische positie
zoekmachine optimalisatie
Traffic Today
2
linkbuilding
TriplePro
2
google ads bureau
Traffic Today
3
wat kost een website
Stuurlui
3
leadgeneratie
De Nieuwe Zaak
4
google bedrijfsprofiel optimaliseren
SalesWizard
4
wat is lokale seo
Dtch. Digitals
7
generative engine optimization
Wikipedia (Engels)
7
wat kost een tekstschrijver
Doorlies
35
social media beheer
JA Media (kostenartikel)
niet in top 40
wat is geo
Wikipedia (aardrijkskunde)
-
Geen AI-overzicht bij website laten maken, seo bureau, lokale seo, branding bureau, tekstschrijver, ai automatisering, online marketing bureau en alle stadstermen. Daar tellen het kaartblok en de organische posities.
Twee kansen:
Een helder prijsantwoord haalt het AI-overzicht zelfs zonder topranking (Doorlies op 35, JA Media niet in de top 40). Daarom krijgt elke dienst een kostenpagina met concrete bedragen.
Bij "wat is geo" denkt Google nog aan aardrijkskunde. Wij schrijven GEO daarom altijd voluit als "GEO (Generative Engine Optimization)" en koppelen het aan AI en zoekmachines.
## Techniek en snelheid
### Wat de top laat zien
Site
Gewicht homepage
Requests
JavaScript
Externe domeinen
Exposure Ninja
0,2 MB (vóór cookietoestemming)
28
-
-
Rise at Seven
0,4 MB
75
-
-
SAM Online Marketing
1,0 MB
70
11 scripts
4
Victorious
1,1 MB
115
0,6 MB
6
Directive
1,4 MB
161
1,1 MB
22
Siege Media
1,8 MB
95
0,5 MB
8
Drijfveer (nu)
2,3 MB
48
14 scripts
2
NP Digital
2,5 MB
141
-
-
iPullRank
3,0 MB
115
9 lettertypebestanden
14
Traffic Today
12,8 MB
86
27 scripts
6
De meeste grote bureaus zijn technisch niet snel. Exposure Ninja en Rise at Seven laten zien dat een bureausite onder 0,5 MB kan. Dat wordt onze lat.
### Prestatiebudget (harde grenzen per pagina)
Onderdeel
Grens
Totaal gewicht (eerste bezoek, mobiel)
≤ 500 KB, homepage ≤ 700 KB
HTML
≤ 50 KB gecomprimeerd
CSS
≤ 40 KB, kritieke CSS inline
JavaScript
≤ 80 KB op contentpagina's; tools laden hun eigen code pas bij gebruik
Lettertypen
1 variabel lettertype, zelf gehost, WOFF2, maximaal 2 bestanden
Externe domeinen
maximaal 3 (analytics, consent, boekingstool pas na klik)
Serverreactie (TTFB)
< 200 ms, via CDN met volledige paginacache
Core Web Vitals (75e percentiel, mobiel)
LCP < 2,0 s (Google: goed is < 2,5 s), INP < 150 ms (Google: < 200 ms), CLS < 0,05 (Google: < 0,1)
### Code
HTML-first: alle tekst staat in de HTML die de server stuurt. Niets belangrijks wordt pas later door JavaScript geladen. Dit helpt Google, maar ook AI-crawlers, die vaak geen JavaScript uitvoeren.
Semantische HTML: één H1, een logische H2/H3-volgorde, <main>, <article>, <nav aria-label="Kruimelpad">, <table> voor echte tabellen, <details> voor FAQ's (open en dicht te klappen, maar de tekst staat in de HTML).
Afbeeldingen: AVIF met WebP als terugval, srcset in 3 breedtes, width en height altijd ingevuld, het LCP-beeld met fetchpriority="high" en zonder lazy, de rest lazy.
Vooruit laden: Speculation Rules om de waarschijnlijk volgende pagina vooraf te laden (dienst → prijzen → contact). Dat geeft directe paginawissels.
Geen sliders, geen pop-ups bij binnenkomst, geen pagebuilder. Pagebuilders zoals Elementor (bij SAM) voegen veel extra code toe.
Toegankelijkheid: WCAG 2.2 AA (contrast, toetsenbord, focus, alt-teksten, labels). Dit is goed voor gebruikers, voor SEO en voor de geloofwaardigheid van een bureau.
Beveiliging: HTTPS met HSTS, beveiligingsheaders en automatische updates. Een gehackte site kost alles; we hebben zelf een dienst "WordPress hack".
### Platform: twee routes
A. WordPress, opnieuw opgebouwd
B. Statische site (Astro) met een CMS
Snelheid
Goed haalbaar met een licht blokthema, volledige paginacache en CDN
Het snelst: kale HTML vanaf het CDN, 0 KB JavaScript waar dat kan
Zelf teksten aanpassen
Vertrouwd, zoals nu
Via een CMS-scherm, iets anders werken
Tools (calculators, scans)
Als losse modules
Als "eilandjes" die alleen laden waar nodig
Onderhoud en veiligheid
Plugins en updates bijhouden
Vrijwel geen aanvalsoppervlak
Overstap
Eenvoudiger
Meer werk, daarna minder onderhoud
Mijn advies is route B, omdat "de snelste bureausite van het Noorden" dan haalbaar en aantoonbaar wordt, en omdat de tools er netjes in passen. Route A kan ook binnen het budget hierboven blijven, mits zonder pagebuilder. Dit is jouw keuze.
## Hiërarchie en interne links
De volledige paginalijst staat in het tabblad Sitestructuur. Hier staan de regels.
### URL-boom (maximaal 3 niveaus)
Regels: korte Nederlandse woorden, koppeltekens, geen datum in de URL, geen /diensten/-tussenlaag (die voegt een niveau toe zonder betekenis), een slash aan het eind overal gelijk.
### Navigatie
Hoofdmenu volgens het concept: Gevonden (SEO, lokale SEO, linkbuilding), Genoemd (GEO), Gekozen (website, branding, teksten, adverteren, social, leadgeneratie, AI), plus Tools, Cases, Prijzen en Over ons. Ongeveer 20 links in plaats van de 344 van Dtch. Digitals.
Kruimelpad op elke pagina behalve de homepage, zichtbaar én als BreadcrumbList-schema. Bij geen van de gemeten Nederlandse bureaus is dat consequent geregeld.
Footer met de 12 pillars, de 3 provinciehubs, de tools, prijzen, KvK en adres.
### Linkregels
Van
Naar
Hoeveel
Pillar
Elke eigen steunpagina, de kostenpagina, 2 cases, de tool, 1 pillar uit een andere fase (bijvoorbeeld SEO → GEO)
10 tot 20 in de tekst
Steunpagina
De pillar (eerste alinea) en 2 zusterpagina's
3 tot 6
Begrip of gids
De dienst die het probleem oplost en 2 verwante begrippen
3 tot 5
Stadspagina
De dienstpillar, de provinciehub en 2 nabije steden
4 tot 6
Case
De gebruikte diensten en de stad
3 tot 5
Ankerteksten beschrijven het doel ("technische SEO-checklist"), nooit "klik hier". Ze variëren: niet elke keer exact het zoekwoord.
Geen pagina zonder interne links naar zich toe (weespagina's). Elk kwartaal controleren we dat met een crawl.
Elke pagina is in maximaal 3 klikken bereikbaar vanaf de homepage.
## Bouwstenen per pagina
Elke pagina bestaat uit vaste componenten. Zo is elke pagina even goed en kan ik er snel nieuwe maken. De volgorde per paginatype staat in de blauwdruk (tabblad Concurrentieanalyse).
Component
Wat het is
Regels
Waarvoor
Hero
H1, belofte van 1 tot 2 zinnen, 1 hoofdknop en 1 tweede knop, bewijsregel ("4,9 uit 63 Google-reviews")
Precies 2 knoppen; geen slider; het LCP-beeld klein en snel
Conversie, SEO
Kort antwoord
40 tot 60 woorden direct onder de hero die de hoofdvraag beantwoorden
Eerste zin = het antwoord; feitelijk; zonder verkooptaal
AI-citaat, featured snippet
Vraag-sectie
H2 geformuleerd als vraag + antwoordalinea van 75 tot 150 woorden
Antwoord in de eerste zin, daarna uitleg en voorbeeld
AI Mode-passages, deelvragen
Stappenplan
Genummerde stappen met H3
Elke stap begint met een werkwoord
Leesbaarheid, AI
Vergelijkingstabel
Echte HTML-tabel
Maximaal 5 kolommen; eerlijk, ook waar wij niet de beste keuze zijn
AI haalt tabellen graag aan; vertrouwen
Cijferblok
3 tot 4 resultaten met bron en datum
Alleen echte, controleerbare cijfers
Princeton: statistieken +31 procent; overtuiging
Expertcitaat
Uitspraak van Robert of een klant, met naam en functie
Kort en concreet
Princeton: citaten +41 procent; E-E-A-T
Case-kaart
Klant, plaats, sector, startsituatie, resultaat, looptijd
Link naar de volledige case
Bewijs, lokale relevantie
Prijsblok
Pakketten uit één centrale prijstabel
Overal hetzelfde bedrag; wat je per maand krijgt
Transparantie, AI-kostenantwoord
Tool-blok
De tool van de pagina, ingebouwd
Resultaat direct op het scherm; gegevens alleen voor het volledige rapport
Conversie, links, onderscheid
"Wanneer niet"
Wanneer de dienst niet bij je past
2 tot 3 eerlijke situaties
Vertrouwen
FAQ
5 tot 9 vragen in <details>
Antwoord in de eerste zin; geen herhaling van de pagina
Deelvragen, long tail
Auteursblok
Foto, naam, rol, ervaring, bijgewerkt-datum, wie het gecontroleerd heeft
Op elke pagina met inhoud
E-E-A-T, versheid
Bronnen
Lijst met gebruikte bronnen, met links
Bij elke kennispagina en pillar
Princeton: bronnen noemen +27 procent
Lokaal blok
Plaats, omliggende dorpen, kaart, lokale klant
Alleen op stads- en provinciepagina's
Lokale relevantie
Slot-CTA
Foto van Robert, 1 zin, 3 manieren: bellen, WhatsApp, afspraak inplannen
Responstijd die we echt halen
Conversie
Mobiele balk
Vaste onderbalk op mobiel met "Bel" en "Plan gesprek"
Pas zichtbaar na het scrollen voorbij de hero
Conversie zonder pop-up
Het getal en aantal in de hero ("4,9 uit 63 Google-reviews") is een voorbeeld van de opbouw, geen echte score.
## Schrijven voor Google én AI
De zoekwoordregels (dichtheid, plaats in title en koppen) staan in het tabblad Concurrentieanalyse. Hier staan de regels die een tekst citeerbaar maken.
### Per alinea
Antwoord eerst. De eerste zin van elke sectie beantwoordt de vraag uit de kop volledig. Uitleg en voorbeelden komen daarna.
Zelfstandig leesbaar. Elke alinea van 75 tot 150 woorden moet los te begrijpen zijn. Dus geen "zoals hierboven genoemd" of "dit" zonder onderwerp. Noem de zaak bij naam.
Concreet. Bedragen, aantallen, termijnen, plaatsnamen, gereedschap bij naam ("Google Bedrijfsprofiel", "Search Console", "Zapier"). Vaagheid wordt niet geciteerd.
Bewijs in de tekst. Per pillar minstens 3 cijfers met bron, 1 citaat van een expert of klant, en een bronnenlijst.
Entiteiten vast benoemen. Altijd "Drijfveer Media" (niet "wij" alleen), "Robert Boersma", "Assen", "Drenthe". Zo leert een taalmodel wie we zijn en waar we zitten.
Definities in één zin. Elk begrip krijgt een definitie volgens het patroon "[Begrip] is [categorie] die [functie]". Bijvoorbeeld: "GEO (Generative Engine Optimization) is het optimaliseren van content zodat AI-assistenten zoals ChatGPT en Google AI Mode je bedrijf noemen en als bron citeren."
### Per kop
H2's zijn de vragen die mensen echt stellen. Die halen we uit "Mensen vragen ook", SE Ranking-vragen en de deelvragen van een onderwerp: wat, waarom, hoe, wat kost het, hoe lang duurt het, wat zijn de risico's, zelf doen of uitbesteden.
Een pillar dekt de hoofdvraag en minstens 6 vervolgvragen. Zo pakt Google onze pagina bij het opsplitsen van een vraag in deelvragen.
Geen koppen met alleen een merkwoord of slogan ("Samen winnen!", "Ready voor échte groei?" doen niets voor SEO of AI).
### Per pagina
Versheid: zichtbare datum "Bijgewerkt op", elk kwartaal inhoudelijk gecontroleerd. De datum gaat pas om als er echt iets is veranderd.
Eigen ervaring: elke pagina bevat minstens één waarneming uit eigen werk die nergens anders staat.
Geen opvulling: de woorddoelen in Sitestructuur zijn een bovengrens van wat nodig is, geen verplichting om te vullen.
Taal: B1-niveau, jij-vorm, actief, zinnen van gemiddeld maximaal 15 woorden.
### Merk buiten de site (Genoemd)
Omdat merkvermeldingen het sterkst samenhangen met zichtbaarheid in AI-overzichten (Ahrefs: 0,664), plannen we per kwartaal:
de Noorden Online Index als nieuws voor regionale media;
gastbijdragen en interviews bij noordelijke ondernemersplatforms;
vermeldingen op vergelijkingssites en in bedrijvengidsen met dezelfde naam, hetzelfde adres en hetzelfde telefoonnummer;
actieve reviews op Google.
We gebruiken overal dezelfde omschrijving van Drijfveer Media, zodat AI-modellen één consistent beeld krijgen.
## Markup
### Eerlijk over wat schema oplevert
Wat schema wel doet: Google en AI-systemen begrijpen wie we zijn, wat we aanbieden, waar en door wie. Het verbindt pagina's, personen en het bedrijf tot één entiteit. Google: "zorg dat structured data overeenkomt met de zichtbare tekst".
Wat schema niet doet:
Het is geen ranking- of AI-truc.
Sterren in de zoekresultaten krijg je niet met reviews over je eigen bedrijf op je eigen site. Google toont die sinds 2019 niet voor LocalBusiness en Organization. Dat SAM en iClicks AggregateRating gebruiken, levert hen dus geen sterren op.
FAQ-uitklappers worden sinds 2023 alleen nog bij overheids- en zorgsites getoond, HowTo-resultaten zijn verdwenen.
We gebruiken FAQPage en HowTo alleen nog omdat ze de opbouw beschrijven, niet voor extra plek in Google.
Reviews wel benutten: Google-reviews komen via het Bedrijfsprofiel in het kaartblok, en dat is precies plek 1 bij alle stadstermen.
### Het netwerk
Eén @graph per pagina, met vaste @id's zodat alles naar elkaar verwijst:
Type
Op welke pagina's
Belangrijkste velden
ProfessionalService (bedrijf)
Overal, gedefinieerd op de homepage
name, url, logo, address, geo, telephone, areaServed (Drenthe, Friesland, Groningen), sameAs (LinkedIn, Bedrijfsprofiel, KvK), founder
WebSite
Overal
publisher → bedrijf
WebPage of AboutPage, ContactPage, CollectionPage
Overal
isPartOf, breadcrumb, dateModified, reviewedBy
BreadcrumbList
Alles behalve de homepage
Gelijk aan het zichtbare kruimelpad
Person
Auteurspagina's en als author
name, jobTitle, image, sameAs, knowsAbout, worksFor
Service
Pillars, stadspagina's
serviceType, provider → bedrijf, areaServed (City of AdministrativeArea), offers
Offer met PriceSpecification
Prijs- en kostenpagina's
price of minPrice/maxPrice, priceCurrency EUR, unitText "per maand"
Article of BlogPosting
Gidsen, Lab, nieuws
author, datePublished, dateModified, citation
DefinedTerm in een DefinedTermSet
Begrippenbank
name, description, inDefinedTermSet
FAQPage
Waar een echte FAQ staat
Precies de zichtbare vragen en antwoorden
SoftwareApplication of WebApplication
Tools
name, applicationCategory, offers (gratis)
### Voorbeeld (stadspagina, ingekort)
Het volledige adres, de KvK-gegevens en de prijzen vul ik in zodra ik ze van je heb.
### Meta en overige tags
Title: 50 tot 60 tekens.
Meta-omschrijving: 140 tot 155 tekens.
Open Graph en een eigen deelafbeelding per pillar.
Canonical: naar zichzelf.
Taal: hreflang alleen als er een Engelse versie komt. lang="nl-NL" overal.
Robots: geen nosnippet op inhoud die geciteerd mag worden. data-nosnippet alleen op cookiemelding en formulieren.
## Conversie en UX
### Wat de internationale top doet
Bureau
H1
Knoppen boven de vouw
Opvallend
NP Digital
"We make sure customers find you everywhere from Google to ChatGPT"
Work with us / Get started
Formulier met 7 velden inclusief budget; chat, boekingstool, Trustpilot
Exposure Ninja
"Drive Qualified Leads from Google and AI Search"
Talk To Our Team / Book a Consultation
0,2 MB; Service- en Offer-schema
Siege Media
"Full-service GEO. We make brands the answer in search."
Let's Talk / Get an Assessment
Slechts 4 knoppen op de hele pagina; muur met klantlogo's
Victorious
"Built for the next generation of search."
Get pricing
Aparte routes naar SEO-, AEO- en contentdiensten; 4 keer "Read case study"
iPullRank
"Be recommended by AI and remembered by people"
Start here / Let's talk
Knoppen per probleem ("Show up in LLMs", "Fix crawl issues") plus een diagnosequiz
Directive
"Rethink the Potential of Your B2B Agency"
Explore Partnership / See Our Work
Download van een RFP-template voor inkopers
Patroon:
De H1 noemt Google én AI.
Boven de vouw staan 1 hoofdknop en 1 tweede knop.
Bezoekers worden per probleem doorgestuurd.
Het bewijs komt van logo's, cases en cijfers.
Prijs is een eigen ingang.
Grote bureaus vragen 7 tot 13 velden, omdat ze grote klanten filteren. Voor mkb in het Noorden is dat te zwaar.
### Onze aanpak
Eén duidelijke hoofdactie per paginatype:
homepage → "Doe de gratis scan";
dienstpagina → "Plan een gesprek met Robert";
kennispagina → de tool van de bijbehorende dienst;
prijspagina → "Vraag dit pakket aan".
Routes per probleem op de homepage, naar het voorbeeld van iPullRank: "Ik word niet gevonden" (Gevonden), "ChatGPT kent ons niet" (Genoemd), "Bezoekers worden geen klant" (Gekozen).
Drie manieren van contact, overal dezelfde: bellen, WhatsApp en direct een afspraak inplannen in de agenda van Robert. Geen "we nemen contact met je op".
Korte formulieren: naam, e-mail, website en "waar kunnen we je mee helpen?". Telefoon is optioneel. Maximaal 4 velden.
Prijzen als eigen ingang in het menu, net als Victorious met "Get pricing", maar dan met echte bedragen.
Tools als tussenstap: het resultaat staat direct op het scherm, en het rapport volgt in ruil voor een e-mailadres. Dat zijn de microconversies die het bezoek vasthouden.
Vertrouwen bij de knop: naast elk formulier een foto van Robert, de responstijd en 1 review.
Bedankpagina met vervolg: wat er nu gebeurt, wanneer, en een link naar een relevante case of gids.
Geen pop-ups bij binnenkomst en geen exit-pop-ups. Google waarschuwt voor opdringerige interstitials. Wel een rustige mobiele onderbalk.
Mobiel eerst ontwerpen: knoppen van minimaal 44 bij 44 pixels, telefoonnummer klikbaar, formulieren met het juiste toetsenbord (e-mail, telefoon).
### Testen
Met 245 bezoekers per maand geeft een A/B-test geen betrouwbare uitkomst. Tot het verkeer groeit, leren we van:
klikkaarten en sessie-opnames, alleen met toestemming en met een AVG-proof instelling;
de vraag "Hoe heb je ons gevonden?" in het formulier;
een gesprek met elke nieuwe klant over waarom die voor ons koos.
A/B-testen beginnen we vanaf ongeveer 1.000 conversiegerichte bezoekers per maand per pagina.
## Vertrouwen
Vertrouwen is in een bureaukeuze het laatste zetje, en voor Google en AI het E-E-A-T-signaal. Dit is de complete set, gesorteerd op hoe zwaar het weegt.
Signaal
Waar
Status nu
Wat nodig is
Google-reviews (aantal en score)
Bedrijfsprofiel, hero, naast formulieren
Onbekend, door jou te controleren
Na elk project vragen om een review; reageren op elke review
Cases met naam, plaats en cijfers
Pillars, stadspagina's, /cases/
6 cases
Minstens 2 per pillar, bij voorkeur uit het Noorden
Robert en het team met gezicht
Auteursblok, Over ons, slot-CTA
Beperkt
Auteurspagina's met ervaring, opleiding, certificaten, LinkedIn
Bedrijfsgegevens
Footer, Contact, schema
Deels
Volledig adres, KvK-nummer, btw-nummer, telefoon, openingstijden
Openbare prijzen
Prijzenpagina, prijsblokken
Nee
Eén centrale prijstabel
"Zo scoren we zelf"
Eigen pagina
Nee
Maandelijkse cijfers uit SE Ranking
Certificaten en partnerschappen
Footer, pillars
Onbekend
Alleen wat echt geldt (bijvoorbeeld Google Partner bij voldoende advertentie-uitgaven)
Vermeldingen in de media
Over ons, footer
Nee
Via de Noorden Online Index
Klantlogo's
Homepage, pillars
Onbekend
Alleen met toestemming
Voorwaarden en privacy
Footer, bij formulieren
Aanwezig
Leesbare samenvatting bij elk formulier: wat we met je gegevens doen
Eerlijke grenzen
"Wanneer niet"-blok
Nee
Op elke dienstpagina
Veiligheid
Technisch
HTTPS
Beveiligingsheaders, updates, geen meldingen in Search Console
Zelfde naam, adres en telefoon overal
Gidsen, social, Bedrijfsprofiel
Onbekend
Eenmalig opschonen, daarna bewaken
Uitgangspunt: we claimen niets wat we niet kunnen laten zien. Geen "#1", geen "beste van Nederland", geen stockfoto's van mensen die niet bij ons werken.
## Meten
### Wat we meten
Laag
Meetpunt
Bron
Hoe vaak
Gevonden
Posities op onze ±150 doeltermen, inclusief kaartblok per stad
SE Ranking-project
Wekelijks
Gevonden
Klikken en vertoningen per pagina (inclusief AI-overzichten en AI Mode, die onder "Web" vallen)
Google Search Console
Wekelijks
Gevonden
Indexering, statuscodes, weespagina's, snelheid van echte gebruikers
Search Console, crawl, Core Web Vitals-rapport
Maandelijks
Genoemd
Of AI-overzichten ons citeren voor onze termen
SE Ranking (AI-overzicht-gegevens)
Maandelijks
Genoemd
Of ChatGPT, Gemini, Perplexity, Claude en AI Mode Drijfveer noemen
Vaste set van 50 vragen ("beste webdesign bureau in Assen", "wie kan mijn bedrijf zichtbaar maken in ChatGPT in Groningen")
Maandelijks, dezelfde vragen
Genoemd
Bezoekers die vanuit AI-assistenten komen
Analytics: verwijzers chatgpt.com, perplexity.ai, gemini.google.com, copilot
Doorlopend
Genoemd
Merkvermeldingen op andere sites
Alerts en SE Ranking-backlinks
Maandelijks
Gekozen
Tool gestart, tool afgerond, rapport aangevraagd
Analytics-gebeurtenissen
Doorlopend
Gekozen
Telefoonklik, WhatsApp-klik, afspraak ingepland, formulier verstuurd
Analytics-gebeurtenissen
Doorlopend
Gekozen
Aanvraag → gesprek → klant, met bron
Simpel CRM of spreadsheet
Per aanvraag
### Inrichting
Analytics met cookietoestemming volgens de AVG. Een privacyvriendelijk alternatief kan zonder banner, mits correct ingericht. Dat is een keuze die ik met je wil afstemmen.
Elke knop en elk formulier krijgt een vaste naam voor de meting, zodat het overzicht na de verbouwing klopt.
Eén dashboard met per maand de 3 lagen: gevonden (posities, klikken), genoemd (AI-vermeldingen, AI-bezoekers) en gekozen (aanvragen, klanten). Dit wordt ook de basis van "Zo scoren we zelf".
### Doelen voor het eerste jaar
Ik stel geen getallen voor die ik niet kan onderbouwen. Na fase 1 (lekken dichten) meten we 4 weken de nieuwe beginsituatie. Daarna leggen we samen de doelen vast per laag.
## Kwaliteitscontrole
Geen pagina gaat live voordat alle vakjes zijn afgevinkt. Ik controleer elke pagina zelf met een crawl en een browsertest. De inhoudelijke controle doe jij of een tweede lezer.
### Tekst
Exacte term in title (50 tot 60 tekens), H1, meta (140 tot 155 tekens) en de eerste 100 woorden
Kort antwoord van 40 tot 60 woorden onder de hero
Elke H2 is een echte vraag of taak, en de eerste zin eronder beantwoordt hem
Minstens 3 cijfers met bron, 1 citaat, 1 eigen waarneming
Haalt minstens 8 van de 10 toetsen uit "Winnen van de top"
B1-niveau, geen claims zonder bewijs, geen "#1"
Auteur en bijgewerkt-datum zichtbaar
### Structuur
Precies één H1, logische H2/H3-volgorde
URL volgens de URL-boom, kruimelpad zichtbaar
Interne links volgens de linkregels; minstens 3 pagina's linken naar deze pagina
Canonical naar zichzelf, indexeerbaar, opgenomen in de sitemap
### Markup
JSON-LD-graph valideert zonder fouten (Rich Results Test en schema.org-validator)
Elk schemaveld staat ook zichtbaar op de pagina
Open Graph-afbeelding en -tekst aanwezig
### Snelheid en code
Binnen het prestatiebudget (gewicht, JavaScript, lettertypen, externe domeinen)
Lighthouse mobiel: prestaties, toegankelijkheid, best practices en SEO elk minstens 95
Alle afbeeldingen AVIF of WebP, met afmetingen en alt-tekst; LCP-beeld met voorrang geladen
Alle tekst staat in de server-HTML (controle met JavaScript uit)
### Conversie en vertrouwen
Eén hoofdactie, en die werkt op mobiel en desktop
Formulier maximaal 4 velden, bedankpagina met vervolg
Meting van alle knoppen en formulieren getest
Prijs komt overeen met de centrale prijstabel
Review, case of cijfer in de buurt van de hoofdknop
### Na livegang
Indexering aangevraagd in Search Console
Na 4 weken: posities, klikken en AI-citaties vergeleken met de nulmeting
Na 3 maanden: inhoudelijke herziening op basis van zoekopdrachten uit Search Console
## Wat ik bouw en wat ik van jou nodig heb
### Wat ik kan opleveren
Alle teksten volgens dit bouwboek: pillars, steunpagina's, stadspagina's, begrippen, gidsen, cases (op basis van jouw gegevens).
De complete code: de site als Astro-project of als licht WordPress-blokthema, met de componenten, het schema-netwerk, de sitemap, robots.txt, llms.txt, de redirects van oude URL's en de meting.
De tools: de calculators volledig. Voor de scans die externe gegevens gebruiken (Google, AI-assistenten, SE Ranking) bouw ik de code; daar zijn API-sleutels en een klein maandbudget voor nodig.
Controle: voor elke pagina een crawl, een Lighthouse-test, schemavalidatie en een browsertest volgens de checklist.
Een redirectplan voor alle 151 huidige URL's, zodat we geen opgebouwde waarde verliezen.
### Wat ik niet zelf kan
Live zetten op jouw hosting en DNS aanpassen. Dat doe jij of je hostingpartij, met mijn stappenplan. Of je geeft toegang tot een omgeving waar ik naartoe kan publiceren.
Reviews, cases en cijfers bedenken. Die moeten echt zijn, en komen van jou.
### Voorstel om te beginnen
Ik bouw eerst een proefversie van twee pagina's: de homepage en de GEO-pillar met de tool "Noemt ChatGPT jou?" (eerst als voorbeeld met nepgegevens). Die pagina's laten alles uit dit bouwboek zien. Jij beoordeelt ontwerp, toon en snelheid. Daarna bouwen we in de volgorde van "Winnen van de top".
### Wat ik van jou nodig heb
Platform: route A (WordPress opnieuw) of route B (Astro met CMS).
Hosting: waar de site nu draait en wie erbij kan.
Bedrijfsgegevens: volledig adres, KvK-nummer, telefoon, openingstijden, en de plaatsen waar je echt werkt.
Prijzen per dienst, of bandbreedtes.
Bewijs: cases met toestemming, klantlogo's, Google-reviews (aantal en score), certificaten.
Huisstijl: logo, kleuren, lettertype, foto's van jou en het team. Anders maak ik een voorstel.
Toegang tot Search Console en analytics, voor de nulmeting en de redirects.

