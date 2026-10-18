// Scrollverhaal op de homepage: Gevonden, Genoemd, Gekozen.
// Eén tijdlijn van 0 tot 1, gestuurd door de scrollpositie. Zonder JavaScript staat er een stilstaand beeld.
export function startVerhaal(){
const stage=document.getElementById("stage");
if(!stage) return;
stage.innerHTML="";
const NS="http://www.w3.org/2000/svg";
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
const seg=(p,a,b)=>clamp((p-a)/(b-a));
const lerp=(a,b,t)=>a+(b-a)*t;
const el=(tag,attrs={},parent)=>{const n=document.createElementNS(NS,tag);for(const k in attrs)n.setAttribute(k,attrs[k]);if(parent)parent.appendChild(n);return n};
const txt=(parent,attrs,s)=>{const t=el("text",Object.assign({"font-family":"Albert Sans Variable, Albert Sans, sans-serif"},attrs),parent);t.textContent=s;return t};

/* kleuren van de tekening (vast, de tekening heeft een eigen vlak) */
const C={navy:"#074663",blue:"#4f7aa3",grey:"#dbe3eb",grey2:"#a9b8c8",white:"#ffffff",orange:"#ff6600",tint:"#fff4ec",green:"#1f8a5b",red:"#c9443c",bg:"#e3ebf3",soft:"#eef2f7"};

const svg=el("svg",{viewBox:"0 0 600 480",role:"img","aria-label":"Een zoekresultaat klimt naar plek 1, wordt genoemd in een AI-antwoord en eindigt in een telefoontje van een nieuwe klant"});
stage.appendChild(svg);
el("rect",{width:600,height:480,fill:C.bg},svg);
for(let i=0;i<8;i++)el("circle",{cx:30+i*80,cy:470-(i%3)*10,r:46,fill:"#d6e1ec"},svg);

/* --- 1. zoekresultaten --- */
const L1=el("g",{},svg);
el("rect",{x:40,y:36,width:520,height:408,rx:16,fill:C.white,stroke:"#c7d3df"},L1);
[0,1,2].forEach(i=>el("circle",{cx:62+i*14,cy:56,r:4,fill:"#d3dce6"},L1));
el("rect",{x:64,y:74,width:472,height:40,rx:20,fill:C.soft},L1);
const q1=txt(L1,{x:88,y:99,fill:C.navy,"font-size":16},"");
el("circle",{cx:508,cy:92,r:8,fill:"none",stroke:C.navy,"stroke-width":2.4},L1);
el("line",{x1:514,y1:98,x2:521,y2:105,stroke:C.navy,"stroke-width":2.4,"stroke-linecap":"round"},L1);
const ROW0=140,STEP=58;
const rows=[[290,410],[240,380],[320,360],[270,400]].map(([a,b])=>{
  const g=el("g",{},L1);
  el("rect",{x:72,y:0,width:120,height:7,rx:3.5,fill:C.grey2},g);
  el("rect",{x:72,y:14,width:a,height:12,rx:4,fill:C.blue},g);
  el("rect",{x:72,y:33,width:b,height:7,rx:3.5,fill:C.grey},g);
  return g;
});

/* --- 2. AI-gesprek --- */
const L2=el("g",{opacity:0},svg);
el("rect",{x:40,y:36,width:520,height:408,rx:16,fill:C.white,stroke:"#c7d3df"},L2);
el("path",{d:"M70 62 l4 -10 l4 10 l10 4 l-10 4 l-4 10 l-4 -10 l-10 -4z",fill:C.navy},L2);
txt(L2,{x:96,y:72,fill:C.navy,"font-size":15,"font-weight":800},"AI-assistent");
el("line",{x1:40,y1:92,x2:560,y2:92,stroke:"#e3e9ef"},L2);
const qBubble=el("g",{},L2);
const qRect=el("rect",{x:200,y:110,width:336,height:44,rx:14,fill:C.navy},qBubble);
const q2=txt(qBubble,{x:518,y:138,fill:C.white,"font-size":15,"text-anchor":"end"},"");
const ans=el("g",{},L2);
el("circle",{cx:76,cy:188,r:14,fill:C.soft},ans);
el("path",{d:"M76 180 l2.5 6 l6 2.5 l-6 2.5 l-2.5 6 l-2.5 -6 l-6 -2.5 l6 -2.5z",fill:C.navy},ans);
const aLines=[[340],[300],[360]].map((w,i)=>el("rect",{x:102,y:180+i*22,width:0,height:9,rx:4.5,fill:C.grey,"data-w":w[0]},ans));
const pick=el("g",{opacity:0},ans);
const pickT=txt(pick,{x:102,y:262,fill:C.navy,"font-size":15},"");
const pickN=txt(pick,{x:0,y:262,fill:C.navy,"font-size":15,"font-weight":800},"Jouw bedrijf");
const pickU=el("rect",{x:0,y:267,width:0,height:3,rx:1.5,fill:C.orange},pick);
const srcLbl=txt(L2,{x:102,y:312,fill:C.grey2,"font-size":12.5,"font-weight":700,"letter-spacing":"0.06em",opacity:0},"BRONNEN");
const others=[0,1].map(i=>{const g=el("g",{opacity:0},L2);el("rect",{x:282+i*128,y:334,width:118,height:34,rx:17,fill:C.soft},g);el("rect",{x:300+i*128,y:348,width:80,height:7,rx:3.5,fill:C.grey2},g);return g});

/* --- jouw resultaat, dat van scène 1 naar scène 2 reist --- */
const ME=el("g",{},svg);
const meRow=el("g",{},ME);
el("rect",{x:60,y:-8,width:480,height:52,rx:9,fill:C.tint},meRow);
el("rect",{x:60,y:-8,width:4,height:52,rx:2,fill:C.orange},meRow);
el("rect",{x:72,y:0,width:130,height:7,rx:3.5,fill:C.grey2},meRow);
const meTitle=txt(meRow,{x:72,y:25,fill:C.navy,"font-size":15,"font-weight":800},"");
el("rect",{x:72,y:33,width:330,height:7,rx:3.5,fill:"#e9d8cb"},meRow);
const badge=el("g",{},meRow);
const bc=el("circle",{cx:510,cy:18,r:16,fill:C.navy},badge);
const bt=txt(badge,{x:510,y:23.5,"text-anchor":"middle",fill:C.white,"font-size":15,"font-weight":800},"5");
const spark=el("g",{opacity:0},meRow);
for(let k=0;k<6;k++){const a=k/6*Math.PI*2;el("line",{x1:510+Math.cos(a)*22,y1:18+Math.sin(a)*22,x2:510+Math.cos(a)*30,y2:18+Math.sin(a)*30,stroke:C.orange,"stroke-width":2.6,"stroke-linecap":"round"},spark)}
const meChip=el("g",{opacity:0},ME);
el("rect",{x:60,y:-8,width:150,height:34,rx:17,fill:C.tint,stroke:C.orange,"stroke-width":2},meChip);
const chipT=txt(meChip,{x:135,y:14,"text-anchor":"middle",fill:C.navy,"font-size":13,"font-weight":800},"jouwbedrijf.nl");
const ripple=el("circle",{cx:135,cy:9,r:0,fill:"none",stroke:C.orange,"stroke-width":3,opacity:0},ME);

/* --- cursor --- */
const cursor=el("g",{opacity:0},svg);
el("path",{d:"M0 0 L0 26 L7 19 L12 31 L17 29 L12 17 L22 17 Z",fill:C.navy,stroke:C.white,"stroke-width":2,"stroke-linejoin":"round"},cursor);

/* --- 3. telefoon --- */
const L3=el("g",{opacity:0},svg);
const phone=el("g",{},L3);
el("rect",{x:196,y:26,width:208,height:428,rx:34,fill:C.navy},phone);
el("rect",{x:208,y:40,width:184,height:400,rx:24,fill:"#f5f8fb"},phone);
el("rect",{x:270,y:48,width:60,height:8,rx:4,fill:"#c9d4df"},phone);
const ringV=el("g",{},phone);
txt(ringV,{x:300,y:118,"text-anchor":"middle",fill:C.grey2,"font-size":13,"font-weight":700,"letter-spacing":"0.05em"},"INKOMEND GESPREK");
el("circle",{cx:300,cy:182,r:38,fill:C.soft},ringV);
el("circle",{cx:300,cy:172,r:13,fill:C.grey2},ringV);
el("path",{d:"M276 206 q24 -26 48 0",fill:C.grey2},ringV);
const caller=txt(ringV,{x:300,y:252,"text-anchor":"middle",fill:C.navy,"font-size":18,"font-weight":800},"");
txt(ringV,{x:300,y:276,"text-anchor":"middle",fill:"#6b7d90","font-size":13.5},"via jouw website");
const waves=el("g",{},ringV);
[0,1,2].forEach(i=>el("circle",{cx:340,cy:380,r:24,fill:"none",stroke:C.green,"stroke-width":2,opacity:0,class:"wave","data-i":i},waves));
el("circle",{cx:260,cy:380,r:24,fill:C.red},ringV);
el("path",{d:"M249 382 q11 -8 22 0",stroke:C.white,"stroke-width":4,fill:"none","stroke-linecap":"round"},ringV);
el("circle",{cx:340,cy:380,r:24,fill:C.green},ringV);
el("path",{d:"M331 372 q2 12 18 18 l4 -4 l-5 -5 l-3 3 q-6 -3 -9 -9 l3 -3 l-5 -5z",fill:C.white},ringV);
const doneV=el("g",{opacity:0},phone);
el("circle",{cx:300,cy:168,r:40,fill:C.green},doneV);
el("path",{d:"M281 168 l13 13 l25 -27",fill:"none",stroke:C.white,"stroke-width":7,"stroke-linecap":"round","stroke-linejoin":"round"},doneV);
txt(doneV,{x:300,y:246,"text-anchor":"middle",fill:C.navy,"font-size":21,"font-weight":900},"Nieuwe klant");
const doneSub=txt(doneV,{x:300,y:272,"text-anchor":"middle",fill:"#6b7d90","font-size":13},"");
el("rect",{x:226,y:300,width:148,height:58,rx:12,fill:C.white,stroke:"#dbe3eb"},doneV);
txt(doneV,{x:300,y:324,"text-anchor":"middle",fill:"#6b7d90","font-size":12.5},"Afspraak");
txt(doneV,{x:300,y:345,"text-anchor":"middle",fill:C.navy,"font-size":15,"font-weight":800},"dinsdag 10.00 uur");
txt(doneV,{x:300,y:410,"text-anchor":"middle",fill:C.navy,"font-size":12.5,"font-weight":800},"Gevonden. Genoemd. Gekozen.");

/* --- tekst uit het invoerveld --- */
const vakIn=document.getElementById("vak"),plaatsIn=document.getElementById("plaats");
let vak="loodgieter",plaats="Emmen";
function clean(s,fallback){s=(s||"").trim().replace(/\s+/g," ").slice(0,22);return s||fallback}
function words(){
  vak=clean(vakIn.value,"loodgieter");plaats=clean(plaatsIn.value,"Emmen");
  const lc=vak.toLowerCase();
  q1.textContent=`${lc} ${plaats.toLowerCase()}`;
  meTitle.textContent=`Jouw bedrijf · ${plaats}`;
  caller.textContent=`Klant uit ${plaats}`;
  doneSub.textContent=`${plaats} · via je website`;
  document.querySelectorAll("[data-vak]").forEach(n=>n.textContent=lc);
  document.querySelectorAll("[data-plaats]").forEach(n=>n.textContent=plaats);
  const cue=document.getElementById("cue"); if(cue) cue.textContent=`Scroll en kijk hoe een ${lc} in ${plaats} aan klanten komt`;
  fullQ=`Wie is een goede ${lc} in ${plaats}?`;
  fullPick="Een goede keuze in "+plaats+" is ";
  q2.textContent=fullQ;
  const qw=q2.getComputedTextLength?q2.getComputedTextLength():280;
  const bw=Math.min(480,qw+36);qRect.setAttribute("x",536-bw);qRect.setAttribute("width",bw);
  render(lastP);
}
const cap=s=>s.charAt(0).toUpperCase()+s.slice(1);
let fullQ="",fullPick="";

/* --- alles op één tijdlijn van 0 tot 1 --- */
let lastP=0;
function render(p){
  lastP=p;
  // 1. klimmen
  const climb=ease(seg(p,.04,.26));
  const s=4-4*climb;
  rows.forEach((g,i)=>{const sh=clamp(i+1-s);g.setAttribute("transform",`translate(0 ${ROW0+(i+sh)*STEP})`)});
  const rank=Math.round(s)+1;bt.textContent=rank;
  bc.setAttribute("fill",rank===1?C.orange:C.navy);bt.setAttribute("fill",rank===1?C.navy:C.white);
  spark.setAttribute("opacity",seg(p,.26,.30)*(1-seg(p,.36,.40)));
  // 1 → 2: zoekscherm weg, gesprek erin
  const out1=ease(seg(p,.34,.42));
  L1.setAttribute("opacity",1-out1);
  L1.setAttribute("transform",`translate(${-30*out1} 0)`);
  const in2=ease(seg(p,.38,.46));
  const out2=ease(seg(p,.70,.77));
  L2.setAttribute("opacity",in2*(1-out2));
  L2.setAttribute("transform",`translate(${30*(1-in2)-40*out2} 0)`);
  // vraag typen
  const n=Math.round(fullQ.length*seg(p,.45,.52));
  q2.textContent=fullQ.slice(0,n)+(n>0&&n<fullQ.length?"|":"");
  qBubble.setAttribute("opacity",seg(p,.44,.46));
  // antwoord
  aLines.forEach((r,i)=>r.setAttribute("width",(+r.dataset.w)*ease(seg(p,.52+i*.02,.56+i*.02))));
  ans.setAttribute("opacity",seg(p,.51,.53));
  const pk=seg(p,.58,.61);
  pick.setAttribute("opacity",pk);
  pickT.textContent=fullPick;
  const tw=pickT.getComputedTextLength?pickT.getComputedTextLength():180;
  pickN.setAttribute("x",102+tw+5);
  const nw=pickN.getComputedTextLength?pickN.getComputedTextLength():90;
  pickU.setAttribute("x",102+tw+5);pickU.setAttribute("width",nw*ease(seg(p,.60,.63)));
  srcLbl.setAttribute("opacity",seg(p,.60,.62));
  others.forEach((g,i)=>g.setAttribute("opacity",seg(p,.61+i*.01,.63+i*.01)));
  // jouw resultaat reist
  const rowY=ROW0+s*STEP;
  const lift=ease(seg(p,.34,.42));
  const fly=ease(seg(p,.60,.66));
  // rij → zweeft midden → wordt bron-chip linksonder
  let x=0,y=rowY,sc=1;
  if(p<.60){y=lerp(rowY,226,lift);sc=lerp(1,1.04,lift)}
  else{x=lerp(0,42,fly);y=lerp(226,342,fly);sc=lerp(1.04,1,fly)}
  const chipOn=seg(p,.60,.64);
  meRow.setAttribute("opacity",p<.60?1-seg(p,.44,.47):0);
  meChip.setAttribute("opacity",chipOn*(1-out2));
  ME.setAttribute("transform",`translate(${x} ${y}) scale(${sc})`);
  // cursor klikt op jouw bron
  const cIn=seg(p,.65,.69),cGo=ease(seg(p,.66,.70));
  cursor.setAttribute("opacity",cIn*(1-seg(p,.72,.74)));
  cursor.setAttribute("transform",`translate(${lerp(520,180,cGo)} ${lerp(470,354,cGo)})`);
  const rp=seg(p,.70,.74);
  ripple.setAttribute("r",8+28*rp);ripple.setAttribute("opacity",rp>0&&rp<1?(1-rp)*.9:0);
  // 3. telefoon
  const in3=ease(seg(p,.75,.82));
  L3.setAttribute("opacity",in3);
  L3.setAttribute("transform",`translate(${60*(1-in3)} 0)`);
  const accepted=seg(p,.92,.95);
  const ringing=p>.80&&p<.92&&!reduced();
  phone.classList.toggle("ringing",ringing);
  doneV.setAttribute("opacity",accepted);
  ringV.setAttribute("opacity",1-accepted);
  // stappen
  const step=p<.36?1:p<.74?2:3;
  ["s1","s2","s3"].forEach((id,i)=>document.getElementById(id).classList.toggle("on",i<step));
}

/* belgolven, los van scrollen */
let wt=0;
function waveLoop(now){
  if(!reduced()&&lastP>.80&&lastP<.92){
    document.querySelectorAll(".wave").forEach(w=>{const ph=((now/1000)+(+w.dataset.i)*.33)%1;w.setAttribute("r",24+22*ph);w.setAttribute("opacity",.6*(1-ph))});
  }else document.querySelectorAll(".wave").forEach(w=>w.setAttribute("opacity",0));
  wt=requestAnimationFrame(waveLoop);
}

const mql=window.matchMedia("(prefers-reduced-motion: reduce)");
const reduced=()=>mql.matches;

/* scrollpositie → tijdlijn */
const story=document.getElementById("verhaal");
let ticking=false;
function onScroll(){
  if(ticking)return;ticking=true;
  requestAnimationFrame(()=>{
    ticking=false;
    const r=story.getBoundingClientRect();
    const total=Math.max(1,r.height-window.innerHeight);
    let p=clamp(-r.top/total);
    if(reduced())p=p<.34?.31:p<.72?.64:1; // minder beweging: alleen de eindbeelden per hoofdstuk
    render(p);
  });
}
window.addEventListener("scroll",onScroll,{passive:true});
window.addEventListener("resize",onScroll);

vakIn.addEventListener("input",words);plaatsIn.addEventListener("input",words);
words();onScroll();requestAnimationFrame(waveLoop);
}
