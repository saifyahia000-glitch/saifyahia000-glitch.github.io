(function(){
"use strict";
var D=window.SITE||{tps:[],devices:[],links:[]},view=document.getElementById("view"),state={q:"",sel:"R1",down:{}},NS="http://www.w3.org/2000/svg";
function h(t,a,k){var n=document.createElement(t);Object.keys(a||{}).forEach(function(x){var v=a[x];
  if(x==="text")n.textContent=v;else if(x==="cls")n.className=v;else if(x==="on")Object.keys(v).forEach(function(e){n.addEventListener(e,v[e]);});
  else if(v!==false&&v!=null)n.setAttribute(x,v);});
  (k||[]).forEach(function(c){if(c)n.appendChild(typeof c==="string"?document.createTextNode(c):c);});return n;}
function P(p){return encodeURI(p);}
function A(label,href,cls,dl){var local=!/^(https?:|#|mailto:)/.test(href),e=h("a",{href:local?P(href):href,cls:cls||"btn",text:label,download:dl?"":null});
  if(/^https?:/.test(href)||(local&&!dl&&/\.pdf$/i.test(href))){e.target="_blank";e.rel="noopener";}return e;}
function off(t){return h("span",{cls:"btn off","aria-disabled":"true",text:t});}
function tags(l){return h("div",{cls:"tags"},(l||[]).map(function(t){return h("span",{cls:"tag",text:t});}));}
function ytId(v){if(!v)return null;var m=String(v).match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/);return m?m[1]:(/^[\w-]{11}$/.test(v)?v:null);}
function hasVid(v){return !!(v&&(ytId(v.youtube)||v.file||v.link));}
function tpById(id){return D.tps.filter(function(x){return x.id===id;})[0];}
function docsOf(x){return (x.report?[{title:"Compte-rendu "+x.label,file:x.report,date:x.date}]:[]).concat(x.docs||[]);}
function match(x){var q=state.q.toLowerCase();return !q||JSON.stringify(x).toLowerCase().indexOf(q)>-1;}
function notFound(){return [h("h1",{text:"Page introuvable"}),h("p",{},[A("Retour à la topologie","#/home","btn primary")])];}

/* ---- auto-detection of files placed in tps/<id>/ ---- */
var DEF={report:"compte-rendu.pdf",topology:"topologie.png",config:"config.txt"},pending=0,timer0=0;
D.tps.forEach(function(x){Object.keys(DEF).forEach(function(k){if(x[k])return;var p=x.dir+"/"+DEF[k];pending++;
  fetch(P(p),{method:"HEAD"}).then(function(r){if(r.ok)x[k]=p;}).catch(function(){}).then(function(){if(--pending===0)route();});});});

/* ---- video dialog ---- */
var dlg=document.getElementById("dlg"),dbody=document.getElementById("dbody");
function play(title,id,file){dbody.textContent="";dbody.appendChild(id?h("iframe",{src:"https://www.youtube-nocookie.com/embed/"+id+"?autoplay=1",title:title,allow:"autoplay; encrypted-media; picture-in-picture",allowfullscreen:"",referrerpolicy:"strict-origin-when-cross-origin"}):h("video",{src:P(file),controls:"",autoplay:""}));
  if(dlg.showModal)dlg.showModal();else window.open(id?"https://youtu.be/"+id:P(file),"_blank","noopener");}
document.getElementById("dclose").addEventListener("click",function(){dlg.close();});
dlg.addEventListener("close",function(){dbody.textContent="";});

/* ---- TP cards ---- */
function bdg(l,ok){return h("span",{cls:"badge"+(ok?" ok":""),text:l+(ok?" ✓":" –")});}
function tpCard(x){
  var th=x.topology?h("img",{cls:"ph",src:P(x.topology),alt:x.label+" : topologie",loading:"lazy"}):h("div",{cls:"ph",text:"Capture de topologie non fournie"});
  return h("a",{cls:"card",href:"#/tps/"+x.id},[th,h("div",{cls:"tb"},[h("span",{cls:"num",text:x.label}),h("h3",{text:x.title}),h("p",{text:x.desc||""}),tags(x.tech),
    h("div",{cls:"bdgs"},[bdg("Compte-rendu",!!x.report),bdg("Vidéo",hasVid(x.video)),bdg("Configuration",!!x.config)]),h("span",{cls:"open",text:"Ouvrir le TP →"})])]);}

/* ---- interactive topology (visual simulation) ---- */
function sv(t,a,txt){var e=document.createElementNS(NS,t);Object.keys(a||{}).forEach(function(k){e.setAttribute(k,a[k]);});if(txt)e.textContent=txt;return e;}
function icon(d){var g=sv("g",{});
  if(d.type==="router"){g.appendChild(sv("circle",{r:27,"class":"ic"}));g.appendChild(sv("path",{"class":"ar",d:"M-17 0h34M0 -17v34M-19 0l7-4v8zM19 0l-7-4v8zM0 -19l-4 7h8zM0 19l-4-7h8z"}));}
  else if(d.type==="switch"){g.appendChild(sv("rect",{x:-32,y:-16,width:64,height:32,rx:6,"class":"ic"}));g.appendChild(sv("path",{"class":"ar",d:"M-20 -5h40M-20 6h40M20 -5l-6-4v8zM-20 6l6-4v8z"}));}
  else{g.appendChild(sv("rect",{x:-18,y:-15,width:36,height:26,rx:3,"class":"ic"}));g.appendChild(sv("path",{"class":"ar",d:"M-8 17h16M0 11v6",fill:"none"}));}
  return g;}
var info;function selectDev(id){state.sel=id;draw();}
function lkey(l){return l[0]+"-"+l[1];}
function topo(){
  var svg=sv("svg",{viewBox:"0 0 900 470","class":"topo",role:"group","aria-label":"Carte de navigation WAN interactive (simulation)"}),pos={};
  D.devices.forEach(function(d){pos[d.id]=d;});
  D.links.forEach(function(l){var a=pos[l[0]],b=pos[l[1]];if(!a||!b)return;
    var g=sv("g",{"class":"lnk"+(state.down[lkey(l)]?" down":""),role:"button",tabindex:0,"aria-label":"Lien "+l[0]+" – "+l[1]+" : "+(state.down[lkey(l)]?"coupé (simulation)":"actif")});
    g.appendChild(sv("line",{"class":"v",x1:a.x,y1:a.y,x2:b.x,y2:b.y}));g.appendChild(sv("line",{"class":"h",x1:a.x,y1:a.y,x2:b.x,y2:b.y}));
    function tog(){state.down[lkey(l)]=!state.down[lkey(l)];draw();}
    g.addEventListener("click",tog);g.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();tog();}});svg.appendChild(g);});
  D.devices.forEach(function(d){var has=d.tps&&d.tps.length,g=sv("g",{"class":"dev"+(has?" has":"")+(state.sel===d.id?" sel":""),transform:"translate("+d.x+","+d.y+")",role:"button",tabindex:0,
      "aria-label":d.id+(has?", "+d.tps.length+" TP associé(s)":"")});
    g.appendChild(icon(d));g.appendChild(sv("text",{y:d.type==="router"?46:d.type==="switch"?34:34},d.id));
    if(has)g.appendChild(sv("circle",{cx:22,cy:-22,r:4,"class":"dot"}));
    g.addEventListener("click",function(){selectDev(d.id);});g.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();selectDev(d.id);}});svg.appendChild(g);});
  return svg;}
function sidePanel(){var d=D.devices.filter(function(x){return x.id===state.sel;})[0];
  if(!d)return h("p",{cls:"empty",text:"Sélectionnez un équipement."});
  var names={router:"Routeur",switch:"Commutateur",pc:"Poste client"},nb=D.links.filter(function(l){return l[0]===d.id||l[1]===d.id;});
  return h("div",{cls:"side"},[h("span",{cls:"st",text:"Simulation visuelle"}),h("h2",{text:d.id+" · "+names[d.type]}),
    d.type==="router"?h("div",{},[h("h3",{text:"Travaux pratiques associés"}),d.tps.length?h("div",{},d.tps.map(function(id){var x=tpById(id);return x?A(x.label+" · "+x.title,"#/tps/"+id,"btn tpb primary"):null;})):h("p",{cls:"empty",text:"Aucun TP associé à ce routeur."})]):h("p",{cls:"sub",text:"Seuls les routeurs ouvrent des travaux pratiques."}),
    h("h3",{text:"Liaisons"}),h("ul",{},nb.map(function(l){var o=l[0]===d.id?l[1]:l[0],dn=state.down[lkey(l)];
      return h("li",{},[h("span",{},[o+" : ",h("b",{cls:dn?"dn":"up",text:dn?"coupé (simulé)":"actif"})]),h("button",{cls:"btn sm",type:"button",text:dn?"Rétablir":"Couper",on:{click:function(){state.down[lkey(l)]=!dn;draw();}}})]);}))]);}
var mapBox,sideBox;
function draw(){if(!mapBox)return;mapBox.textContent="";mapBox.appendChild(topo());sideBox.textContent="";sideBox.appendChild(sidePanel());}

/* ---- views ---- */
var V={};
V.home=function(){
  var nrep=D.tps.filter(function(x){return x.report;}).length,nv=D.tps.filter(function(x){return hasVid(x.video);}).length;
  mapBox=h("div",{cls:"panel map"});sideBox=h("aside",{cls:"panel","aria-live":"polite"});
  var out=[h("h1",{text:"Plateforme de simulation WAN"}),h("p",{cls:"sub",text:"Cliquez sur un routeur pour voir ses travaux pratiques, puis ouvrez le TP. "+D.tps.length+" TP · "+nrep+" compte(s)-rendu(s) · "+nv+" démonstration(s)."}),
    h("p",{cls:"note",text:"Carte de navigation : schéma générique servant d'index. Ce n'est pas la topologie d'un laboratoire (les vraies topologies sont sur la page de chaque TP). Cliquer un lien le coupe ou le rétablit : simulation visuelle uniquement, aucune connexion à de vrais routeurs."}),
    h("div",{cls:"stage"},[h("div",{},[mapBox,h("div",{cls:"legend"},[h("span",{},["━ ",h("b",{cls:"up",text:"lien actif"})]),h("span",{},["┅ ",h("b",{cls:"dn",text:"lien coupé (simulé)"})]),h("span",{text:"● routeur avec TP associés"})])]),sideBox]),
    h("h2",{text:"Tous les travaux pratiques"}),h("div",{cls:"grid"},D.tps.map(tpCard))];
  setTimeout(draw,0);return out;};
V.tps=function(id){
  if(!id){var f=D.tps.filter(match);return [h("h1",{text:"Travaux pratiques WAN"}),h("p",{cls:"sub",text:"Un dossier par TP. Utilisez la recherche en haut pour filtrer."}),
    f.length?h("div",{cls:"grid"},f.map(tpCard)):h("p",{cls:"empty",text:"Aucun TP ne correspond à la recherche."})];}
  var x=tpById(id);if(!x)return notFound();
  function sec(t,b){return h("section",{cls:"panel"},[h("h2",{text:t}),b||h("p",{cls:"empty",text:"Non fourni pour le moment."})]);}
  var routers=D.devices.filter(function(d){return d.tps&&d.tps.indexOf(id)>-1;}).map(function(d){return d.id;});
  var v=x.video||{},yid=ytId(v.youtube),vb=null;
  if(yid||v.file)vb=h("div",{cls:"stack"},[h("button",{cls:"thumb",type:"button","aria-label":"Lire la vidéo",on:{click:function(){play(x.title,yid,v.file);}}},[yid?h("img",{src:"https://i.ytimg.com/vi/"+yid+"/hqdefault.jpg",alt:"",loading:"lazy"}):null,h("b",{text:"Lire la démonstration"})]),v.link?h("div",{},[A("Ouvrir la vidéo externe",v.link)]):null]);
  else if(v.link)vb=h("div",{},[A("Ouvrir la vidéo externe",v.link,"btn primary")]);
  var cfg=null;if(x.config){cfg=h("div",{cls:"stack"},[h("div",{},[A("Télécharger la configuration",x.config,"btn",true)]),h("pre",{text:"Chargement…"})]);
    fetch(P(x.config)).then(function(r){return r.text();}).then(function(tx){cfg.lastChild.textContent=tx;}).catch(function(){cfg.lastChild.textContent="Impossible de charger le fichier de configuration.";});}
  var cmds=x.commands.length?h("div",{cls:"stack"},x.commands.map(function(c){return h("div",{cls:"step"},[h("pre",{text:c.cmd}),c.explain?h("p",{text:c.explain}):null]);})):null;
  var vf=x.verification.length?h("div",{cls:"stack"},x.verification.map(function(r){return h("div",{cls:"stack"},[r.cmd?h("pre",{text:"> "+r.cmd}):null,r.result?h("pre",{text:r.result}):null,r.image?h("figure",{cls:"shot"},[h("img",{src:P(r.image),alt:r.cmd||"Résultat",loading:"lazy"})]):null]);})):null;
  var obj=x.objectives.length?h("ul",{cls:"plain"},x.objectives.map(function(o){return h("li",{text:o});})):null;
  var pdf=x.report?h("div",{cls:"stack"},[h("div",{cls:"row"},[A("Voir le PDF",x.report),A("Télécharger le PDF",x.report,"btn primary",true)]),h("iframe",{cls:"pdf",src:P(x.report),title:"Compte-rendu "+x.label,loading:"lazy"}),h("p",{cls:"sub",text:"Si le PDF ne s'affiche pas sur votre appareil, utilisez « Voir le PDF »."})]):null;
  var extra=(x.docs||[]).length?h("div",{},x.docs.map(function(d){return h("div",{cls:"doc"},[h("span",{text:d.title+(d.date?" · "+d.date:"")}),h("span",{cls:"row"},[A("Voir",d.file),A("Télécharger",d.file,"btn",true)])]);})):null;
  return [h("a",{cls:"crumb",href:"#/home",text:"← Topologie"}),h("span",{cls:"num",text:x.label+" · dossier « "+x.folder+" »"}),h("h1",{text:x.title}),h("p",{cls:"sub",text:x.desc||""}),tags(x.tech),
    routers.length?h("p",{cls:"sub",text:"Routeur(s) de la carte : "+routers.join(", ")}):null,
    h("div",{cls:"row",style:"margin-bottom:1.2rem"},[x.report?A("Télécharger le compte-rendu (PDF)",x.report,"btn primary",true):off("Compte-rendu PDF non fourni"),x.config?A("Télécharger la configuration",x.config,"btn",true):null]),
    h("div",{cls:"stack"},[sec("Objectifs",obj),sec("Topologie du réseau",x.topology?h("figure",{cls:"shot"},[h("img",{src:P(x.topology),alt:x.title+" : topologie",loading:"lazy"})]):null),
      sec("Configuration réseau",cfg),sec("Commandes CLI et explications",cmds),sec("Vérification et résultats",vf),sec("Compte-rendu complet (PDF)",pdf),extra?sec("Documents complémentaires",extra):null,sec("Vidéo de démonstration",vb)])];};
V.docs=function(){
  var f=D.tps.filter(match);
  return [h("h1",{text:"Documentation"}),h("p",{cls:"sub",text:"Tous les comptes-rendus, classés par dossier de TP. Chaque document peut être consulté dans le navigateur ou téléchargé."}),
    h("div",{cls:"stack"},f.map(function(x){var ds=docsOf(x);
      return h("section",{cls:"panel"},[h("h2",{},[x.label+" · "+x.title,h("span",{cls:"sub",style:"font-size:.8rem;margin-left:.6rem",text:"dossier « "+x.folder+" »"})]),
        ds.length?h("div",{},ds.map(function(d){return h("div",{cls:"doc"},[h("span",{text:d.title+(d.date?" · "+d.date:"")}),h("span",{cls:"row"},[A("Voir le PDF",d.file),A("Télécharger",d.file,"btn primary",true)])]);})):h("p",{cls:"empty",text:"Aucun document détecté pour ce TP."}),
        h("div",{style:"margin-top:.7rem"},[A("Ouvrir la page du TP","#/tps/"+x.id,"btn sm")])]);}))];};
V.videos=function(){
  var f=D.tps.filter(function(x){return hasVid(x.video)&&match(x);});
  return [h("h1",{text:"Vidéos de démonstration"}),h("p",{cls:"sub",text:"Vidéos YouTube intégrées ou liens externes, classés par TP."}),
    f.length?h("div",{cls:"grid"},f.map(tpCard)):h("p",{cls:"empty",text:"Aucune vidéo n'a encore été ajoutée. Renseignez video dans data.js (voir README)."})];};

/* ---- nav + router ---- */
var NAV=[["home","Topologie"],["tps","Travaux pratiques"],["docs","Documentation"],["videos","Vidéos"]],nav=document.getElementById("nav"),burger=document.getElementById("burger");
NAV.forEach(function(n){nav.appendChild(h("a",{href:"#/"+n[0],"data-r":n[0],text:n[1]}));});
function menu(o){nav.classList.toggle("open",o);burger.setAttribute("aria-expanded",String(o));}
burger.addEventListener("click",function(){menu(!nav.classList.contains("open"));});
document.addEventListener("keydown",function(e){if(e.key==="Escape")menu(false);});
function route(){var p=(location.hash||"#/home").replace(/^#\/?/,"").split("/"),r=p[0]||"home";mapBox=null;
  var content=V[r]?V[r](p[1]):notFound();view.textContent="";content.forEach(function(c){if(c)view.appendChild(c);});
  [].forEach.call(nav.children,function(a){var on=a.getAttribute("data-r")===(r==="tps"&&p[1]?"tps":r);a.classList.toggle("on",on);if(on)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current");});
  menu(false);var x=r==="tps"&&p[1]&&tpById(p[1]);document.title=(x?x.label+" "+x.title+" | ":"")+"SAIF.DEV | Plateforme de simulation WAN";}
var qi=document.getElementById("q");
qi.addEventListener("input",function(){state.q=qi.value;if(!/^#\/(tps|docs|videos)$/.test(location.hash))location.hash="#/tps";else route();});
window.addEventListener("hashchange",function(){route();window.scrollTo(0,0);view.focus({preventScroll:true});});
document.getElementById("yr").textContent=new Date().getFullYear();
route();
})();
