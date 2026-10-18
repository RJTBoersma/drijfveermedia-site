# Maakt per pagina een eigen deelafbeelding (1200 x 630) in public/og/<slug>.jpg, op basis van de <title> in dist.
# Draai na een build: python3 scripts/og.py  (daarna opnieuw bouwen, zodat de pagina's naar hun eigen afbeelding wijzen).
import json, re, os, html
from PIL import Image, ImageDraw, ImageFont
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
F8 = os.path.join(R, 'scripts/fonts/albert-800.ttf'); F6 = os.path.join(R, 'scripts/fonts/albert-600.ttf')
NAVY, ORANJE, WIT, STIL = (7, 70, 99), (255, 102, 0), (255, 255, 255), (169, 186, 203)
soort = {'gids': 'Gids', 'begrip': 'Begrip', 'pillar': 'Dienst', 'cluster': 'Dienst', 'plaats': 'In jouw regio', 'provincie': 'In jouw regio',
         'case': 'Case', 'blog': 'Kennisbank', 'logboek': 'Logboek', 'hub': 'Overzicht', 'vast': 'Drijfveer Media', 'home': 'Online marketingbureau'}
avatar = Image.open(os.path.join(R, 'public/img/team/thorgall-klein.webp')).convert('RGBA')
def regels(d, tekst, font, breed):
    woorden, uit, nu = tekst.split(), [], ''
    for w in woorden:
        test = (nu + ' ' + w).strip()
        if d.textlength(test, font=font) <= breed: nu = test
        else: uit.append(nu); nu = w
    return uit + [nu]
def maak(titel, label, pad):
    im = Image.new('RGB', (1200, 630), NAVY); d = ImageDraw.Draw(im)
    # subtiel raster rechts
    for x in range(760, 1200, 36):
        for y in range(40, 600, 36): d.ellipse((x, y, x + 3, y + 3), fill=(28, 92, 122))
    d.text((72, 64), 'Drijfveer Media', font=ImageFont.truetype(F8, 34), fill=WIT)
    w = d.textlength('Drijfveer Media', font=ImageFont.truetype(F8, 34)); d.text((72 + w, 64), '.', font=ImageFont.truetype(F8, 34), fill=ORANJE)
    d.text((72, 150), label.upper(), font=ImageFont.truetype(F6, 26), fill=ORANJE)
    for grootte in (68, 62, 56, 50, 46):
        f = ImageFont.truetype(F8, grootte); r = regels(d, titel, f, 900)
        if len(r) <= 3: break
    y = 196
    for regel in r[:4]:
        d.text((72, y), regel, font=f, fill=WIT); y += int(grootte * 1.18)
    d.text((72, 540), 'Gevonden. Genoemd. Gekozen.', font=ImageFont.truetype(F6, 28), fill=STIL)
    # Thorgall rechtsonder in een lichte cirkel
    c = Image.new('RGBA', (150, 150), (0, 0, 0, 0)); cd = ImageDraw.Draw(c); cd.ellipse((0, 0, 149, 149), fill=(232, 238, 244, 255))
    a = avatar.resize((150, 150)); m = Image.new('L', (150, 150), 0); ImageDraw.Draw(m).ellipse((0, 0, 149, 149), fill=255)
    c.paste(a, (0, 0), Image.composite(a.split()[3], Image.new('L', (150, 150), 0), m) if a.mode == 'RGBA' else m)
    im.paste(c, (980, 440), m)
    im.save(pad, 'JPEG', quality=84, optimize=True, progressive=True)
paginas = {p['url']: p for p in json.load(open(os.path.join(R, 'scripts/paginas.json')))}
os.makedirs(os.path.join(R, 'public/og'), exist_ok=True)
n = 0
for url, p in paginas.items():
    f = os.path.join(R, 'dist' + url, 'index.html')
    if not os.path.exists(f): continue
    t = html.unescape(re.search(r'<title>(.*?)</title>', open(f).read(), re.S).group(1))
    t = re.sub(r'\s*\|\s*Drijfveer Media\s*$', '', t).strip()
    slug = url.strip('/').replace('/', '--') or 'home'
    maak(t, soort.get(p['type'], 'Drijfveer Media'), os.path.join(R, 'public/og', slug + '.jpg')); n += 1
print(n, 'deelafbeeldingen')
