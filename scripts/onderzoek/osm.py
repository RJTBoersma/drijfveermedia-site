import osmium, json, sys, re
from urllib.parse import urlparse
SOORT = {'craft': None, 'shop': None, 'office': {'company','estate_agent','accountant','lawyer','insurance','architect','consulting','it','financial','notary','tax_advisor','tax','advertising_agency','engineer','surveyor','employment_agency','therapist'},
         'amenity': {'restaurant','cafe','bar','pub','dentist','veterinary','driving_school','fast_food','ice_cream','childcare'},
         'healthcare': None, 'tourism': {'hotel','guest_house','camp_site','chalet','apartment'}}
class H(osmium.SimpleHandler):
    def __init__(s, prov): super().__init__(); s.prov = prov; s.uit = []
    def doe(s, o):
        t = o.tags
        w = t.get('website') or t.get('contact:website') or t.get('url')
        if not w: return
        if 'brand' in t or 'brand:wikidata' in t: return
        for k, waarden in SOORT.items():
            v = t.get(k)
            if v and (waarden is None or v in waarden):
                s.uit.append({'w': w.strip(), 'n': t.get('name', ''), 'c': t.get('addr:city', ''), 't': f'{k}:{v}', 'p': s.prov}); return
    def node(s, n): s.doe(n)
    def way(s, w): s.doe(w)
alle = []
for prov in ('drenthe', 'groningen'):
    h = H(prov); h.apply_file(f'/tmp/claude-0/onderzoek/osm/{prov}.osm.pbf'); alle += h.uit; print(prov, len(h.uit))
# Ontdubbelen op domein; grote ketens en platforms eruit
weg = re.compile(r'(facebook|instagram|linkedin|google|wikipedia|booking\.com|tripadvisor|airbnb|thuisbezorgd|marktplaats|werkspot|youtube|twitter|x\.com|nl\.wix|\.gov|\.overheid\.nl|gemeente|rijksoverheid)', re.I)
gezien = {}; 
for r in alle:
    w = r['w'] if '://' in r['w'] else 'http://' + r['w']
    d = urlparse(w).netloc.lower().removeprefix('www.')
    if not d or weg.search(d) or ' ' in d: continue
    r['d'] = d; r['w'] = w
    gezien.setdefault(d, []).append(r)
uniek = []
for d, rs in gezien.items():
    if len(rs) > 3: continue   # zelfde domein op veel plekken = keten of franchise
    uniek.append(rs[0])
for i, r in enumerate(uniek): r['id'] = i
json.dump(uniek, open('/tmp/claude-0/onderzoek/sites.json', 'w'), ensure_ascii=False)
import collections
print('uniek', len(uniek), collections.Counter(r['p'] for r in uniek), collections.Counter(r['t'].split(':')[0] for r in uniek))
