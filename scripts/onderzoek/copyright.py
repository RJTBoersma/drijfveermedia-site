import json,re,urllib.request,ssl,concurrent.futures as cf
u=json.load(open('uit2.json'))
ok=[x for x in u if x.get('bereikbaar')]
UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/126.0 (onderzoek Drijfveer Media)'
def jaar(x):
    try:
        h=urllib.request.urlopen(urllib.request.Request(x['eind'],headers={'User-Agent':UA}),timeout=20).read(1500000).decode('utf-8','ignore')
    except Exception: return x['id'],None,'fout'
    h=re.sub(r'<script[\s\S]*?</script>|<style[\s\S]*?</style>|<!--[\s\S]*?-->|<noscript[\s\S]*?</noscript>',' ',h,flags=re.I)
    tekst=re.sub(r'<[^>]+>',' ',h); tekst=tekst.replace('&copy;','©').replace('&#169;','©').replace('&#xa9;','©')
    tekst=re.sub(r'\s+',' ',tekst)
    m=[(int(a), int(b) if b else None) for a,b in re.findall(r'©\s*(?:[^\d©]{0,30}?)((?:19|20)\d\d)(?:\s*[-–]\s*((?:19|20)\d\d))?',tekst)]
    jaren=[max(a,b or 0) for a,b in m if 1990<=max(a,b or 0)<=2026]
    return x['id'],(max(jaren) if jaren else None),''
with cf.ThreadPoolExecutor(40) as ex: r={i:(j,f) for i,j,f in ex.map(jaar,ok)}
for x in u:
    if x['id'] in r: x['copyright']=r[x['id']][0]; x['copyright_meetfout']=r[x['id']][1]=='fout'
json.dump(u,open('uit2.json','w'),ensure_ascii=False)
import collections; print(sorted(collections.Counter(j for j,f in r.values() if j).items())); print('fouten',sum(1 for j,f in r.values() if f))
