# Nieuwe drijfveermedia.nl: stand van zaken en lanceerlijst (bijgewerkt 19 oktober 2026)

## Status in één zin
Na de ronde met het expertpanel (zie claude/panel-18okt-2026.md) zijn inhoud, ontwerp, toegankelijkheid en techniek bijgewerkt en zijn alle controles groen: tekstcheck, linkcheck en axe (WCAG 2.2 AA) op alle 238 pagina's. Voor de livegang zijn nodig: GitHub en Vimexx-toegang, het SPF-record en het deponeren van de voorwaarden.

## Nodig van Robert voor de livegang
1. Een privé GitHub-repository met de geheimen FTP_SERVER, FTP_USERNAME en FTP_PASSWORD (optioneel FTP_MAP), en de naam van die repository, voor admin/config.yml.
2. Een gerepareerd SPF-record (zie punt 2 hieronder).
3. De algemene voorwaarden van oktober 2026 gedeponeerd bij KVK (zie punt 3 hieronder).

## Beslispunten en aanlevering na het expertpanel (19 oktober)

### Moet vóór de livegang (wettelijk of risico)
1. ~~**Btw-id en rechtsvorm.**~~ Verwerkt op 19 oktober: Drijfveer Media v.o.f., btw-id NL854652863B01. Staat in de footer, de privacyverklaring, de disclaimer, de voorwaarden (ook de pdf) en het schema.
2. **SPF-record repareren.** Nu: `v=spf1include:spf.protection.outlook.com-all` (spaties ontbreken, dus ongeldig). Aanvraagmails van de website kunnen daardoor in de spam belanden. Laat Vimexx of je DNS-beheerder er `v=spf1 include:spf.protection.outlook.com include:<spf van Vimexx> -all` van maken en test met een echte aanvraag.
3. **Algemene voorwaarden versie oktober 2026 deponeren bij KVK** (algemene.voorwaarden@kvk.nl, met de vermelding "vervanging"). Volgens artikel 19.7 gaat anders de oude gedeponeerde versie voor, zonder maandelijkse opzegbaarheid en zonder garantie. Overweeg die voorrangszin te schrappen. De pdf staat nu op de site; stuur hem mee met elke offerte.
4. **Jurist laten kijken naar de voorwaarden:** de stapelende boetes tot € 25.000 (art. 14), exclusiviteit (3.9), 7.8, 8.2, 10.5 en de AI-artikelen 4.16 tot 4.18 (die schuiven alle controle naar de klant, terwijl de site zegt dat wij alles controleren). Het nietige "niet voor rechterlijke matiging vatbaar" en de opmaakfouten heb ik al rechtgezet.
5. **Klantnamen:** door Robert bevestigd (19 oktober). Bewaar per naam een opdracht of factuur; een mailtje met toestemming is extra zekerheid.
6. **Casecijfers:** +87%, +47% en +32% staan zonder meetperiode. Kun je de periode uit Search Console of Analytics halen, dan zet ik hem erbij. En: schriftelijke toestemming van de drie caseklanten.

### Bevestigen of schrappen (claims die ik niet kon controleren)
7. ~~Claims~~ door Robert bevestigd (19 oktober). "Geen wanbetalers" is op zijn verzoek weggehaald.
8. "Klanten blijven jaren, bijna niemand vertrekt": een getal maakt het sterk (langstlopende klant of gemiddelde duur).
9. ~~Kwartier per week, controle na elke update~~: bevestigd.
10. Prijsvergelijkingen met concurrenten zonder bron: /webdesign-groningen/ (€ 2.250 tot € 10.000) en de gids wat kost Google Ads (€ 500 tot ruim € 2.000 beheer). Bewaar schermafbeeldingen of laat de zin weghalen. Bij SEO is het nu onderbouwd met vijf openbare prijspagina's.
11. Doen we infographics en een losse concurrentieanalyse echt niet? Dan zet ik ze in de vaste lijst "wat we niet doen".

### Keuzes
12. **Garantie:** de site volgt nu de voorwaarden (alleen maandelijkse diensten, niet bij een Google-update, doel en datum schriftelijk bij de start). Wil je klantvriendelijker (optie A: wij bewijzen dat het níet aan ons lag), dan pas ik artikel 4.19 aan. En: geldt de garantie echt bij álle maandelijkse diensten, ook Shopping, ChatGPT-advertenties, e-mailmarketing, social en onderhoud?
13. **Bewaartermijnen** in de privacyverklaring: aanvraag 12 maanden als iemand geen klant wordt, reservekopie 3 maanden, spamfilter 30 dagen, sollicitaties 4 weken. De techniek ruimt al automatisch op. Akkoord?
14. **AI en klantgegevens:** welke AI-tools krijgen persoonsgegevens, met welk abonnement? Grok en gratis accounts horen daar niet bij. Daarna kan er een zin over in de privacyverklaring en op de AI-pagina.
15. **Termijn voor de scanuitslag** ("uiterlijk de volgende werkdag"?) en **wat er in € 595 uitbesteden zit** (uren of kanalen). Beide maken de belofte concreet.
16. **Terugbelbelofte meten:** houd een maand bij hoe snel je echt terugbelt en regel vervanging bij vakantie. De bedankpagina zegt nu al "of een collega".
17. **Zichtbare datums:** het SEO-panel raadt "bijgewerkt op" aan (Google en AI-zoekmachines kiezen vaker de recentere bron). Jij wilde dat uitdrukkelijk niet, dus het staat er niet. Zeg het als je van gedachten verandert.
18. **Exclusiviteit per vak per plaats** ("we werken in een plaats voor één loodgieter") en een **lokaal 0592-nummer** op plaatspagina's: CRO-ideeën, alleen als het je beleid is.

### Aanleveren (al bekend, nu met reden erbij)
19. Echte Google-reviews, portfolio, sterkere cases, teamfoto. Toegankelijkheid vraagt bij nieuwe foto's een alt-tekst.
20. Herkomst en licentie van de foto van het pand; toestemming van het team voor de portretten (en zijn ze met AI gemaakt?).
21. LinkedIn-profielen van Robert en het team (voor het schema).
22. Oorspronkelijke datums van overgezette blogs en cases.
23. Vóór de livegang: verwerkersovereenkomsten met Vimexx en Microsoft vastleggen, een verwerkingsregister, en één A4 over AI-gebruik voor het team (AI Act art. 4). Daar zijn geen wijzigingen op de site voor nodig.
24. Bedrijfsgrootte bevestigen (minder dan 10 mensen en onder € 2 miljoen omzet): dan geldt de toegankelijkheidswet (EAA) niet. Een toegankelijkheidsverklaring kan erbij zodra je een contactpersoon en reactietermijn kiest; doe vooraf één hertest met een schermlezer.

## Direct na de livegang
- Search Console: de XML-sitemap indienen en een paar oude URL's testen, ook via http en zonder www. Controleren dat /regio/groningen/, /online-marketing-friesland/ en /kennisbank/wat-is/geo/ met een 301 doorsturen.
- Bing Webmaster Tools: importeren vanuit Search Console.
- drijfveermedia.nl/review testen.
- Een testaanvraag doen, met en zonder "Mail me alleen". Controleren:
  - de mail komt aan en niet in de spam (SPF);
  - de bedankpagina klopt;
  - api/data/aanvragen-JJJJ-MM.log wordt aangemaakt.
- De oude voorwaarden-pdf testen: /DM-algemenevoorwaarden.pdf moet naar de versie van maart 2025 gaan.
- SE Ranking: de doel-URL's bijwerken, rekening houdend met de nieuwe zoekwoorden voor SEO-teksten, reviews en SEO-specialist.
- Twee weken na livegang in Search Console nagaan of home en /online-marketing-assen/ elkaar afwisselen op "online marketing assen".
- Na een maand het eerste logboek bijwerken.

## Onderhoud
- Elk kwartaal nalopen: de AI-gidsen, de toolprijzen, de klikprijzen, de lijst met marketingblogs en de prijsbronnen in de gids wat kost SEO.
- Na nieuwe pagina's of een gewijzigde title: python3 scripts/og.py en python3 scripts/llms.py draaien, daarna opnieuw bouwen.
- Na een wijziging in de voorwaarden: node scripts/av-pdf.mjs draaien (de pdf) en de nieuwe versie deponeren.
- Elke maand het logboek bijwerken via /admin/.
