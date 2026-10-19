import json, collections, sys
res = json.load(open('/tmp/claude-0/onderzoek/uit2.json'))
ok = [r for r in res if r.get('bereikbaar')]
def pct(n, d): return round(100 * n / d, 1) if d else 0
def tel(rows, f): return sum(1 for r in rows if f(r))
out = {}
for naam, rows in (('alle', ok), ('drenthe', [r for r in ok if r['prov'] == 'drenthe']), ('groningen', [r for r in ok if r['prov'] == 'groningen'])):
    n = len(rows)
    jaren = [r['copyright'] for r in rows if r.get('copyright')]
    rob = [r for r in rows if r.get('robots')]
    o = {
        'n': n,
        'https': pct(tel(rows, lambda r: r['https']), n),
        'geen_https': tel(rows, lambda r: not r['https']),
        'http_naar_https': pct(tel(rows, lambda r: r.get('http_naar_https') is True), tel(rows, lambda r: r['https'])),
        'viewport': pct(tel(rows, lambda r: r['viewport']), n),
        'titel': pct(tel(rows, lambda r: r['titel']), n),
        'description': pct(tel(rows, lambda r: r['description']), n),
        'geen_description': pct(tel(rows, lambda r: not r['description']), n),
        'h1': pct(tel(rows, lambda r: r['h1']), n),
        'jsonld': pct(tel(rows, lambda r: r['jsonld']), n),
        'localbusiness': pct(tel(rows, lambda r: r['localbusiness']), n),
        'tel_link': pct(tel(rows, lambda r: r['tel_link']), n),
        'robots': pct(len(rob), n),
        'ai_geblokkeerd': pct(tel(rows, lambda r: bool(r.get('ai_geblokkeerd'))), n),
        'ai_geblokkeerd_n': tel(rows, lambda r: bool(r.get('ai_geblokkeerd'))),
        'gptbot_geblokkeerd': pct(tel(rows, lambda r: 'gptbot' in (r.get('ai_geblokkeerd') or [])), n),
        'alles_dicht': tel(rows, lambda r: r.get('alles_dicht')),
        'llms': pct(tel(rows, lambda r: r.get('llms')), n),
        'llms_n': tel(rows, lambda r: r.get('llms')),
        'copyright_n': len(jaren),
        'copyright_oud_2023': pct(sum(1 for j in jaren if j <= 2023), len(jaren)),
        'copyright_oud_2020': pct(sum(1 for j in jaren if j <= 2020), len(jaren)),
        'copyright_2026': pct(sum(1 for j in jaren if j >= 2026), len(jaren)),
        'tijd_mediaan': sorted(r['tijd'] for r in rows)[n // 2] if n else None,
        'traag_3s': pct(tel(rows, lambda r: r['tijd'] > 3), n),
        'kb_mediaan': sorted(r['kb'] for r in rows)[n // 2] if n else None,
        'cms': collections.Counter(r['cms'] for r in rows).most_common(),
    }
    out[naam] = o
out['totaal_gemeten'] = len(res)
out['onbereikbaar'] = len(res) - len(ok)
out['onbereikbaar_pct'] = pct(len(res) - len(ok), len(res))
out['fouten'] = collections.Counter((r.get('fout') or '').split(':')[0] for r in res if not r.get('bereikbaar')).most_common(8)
out['bots'] = collections.Counter(b for r in ok for b in (r.get('ai_geblokkeerd') or [])).most_common()
out['soorten'] = collections.Counter(r['soort'].split(':')[0] for r in ok).most_common()
# Basis op orde: https + viewport + titel + description
basis = lambda r: r['https'] and r['viewport'] and r['titel'] and r['description']
out['basis_op_orde'] = pct(tel(ok, basis), len(ok))
out['basis_plus_ld'] = pct(tel(ok, lambda r: basis(r) and r['localbusiness']), len(ok))
# per soort: description en localbusiness
per = {}
for s, _ in out['soorten']:
    rows = [r for r in ok if r['soort'].startswith(s + ':')]
    per[s] = {'n': len(rows), 'description': pct(tel(rows, lambda r: r['description']), len(rows)), 'localbusiness': pct(tel(rows, lambda r: r['localbusiness']), len(rows)), 'https': pct(tel(rows, lambda r: r['https']), len(rows)), 'basis': pct(tel(rows, basis), len(rows))}
out['per_soort'] = per
json.dump(out, open('/tmp/claude-0/onderzoek/cijfers.json', 'w'), indent=1, ensure_ascii=False)
print(json.dumps(out, indent=1, ensure_ascii=False))
