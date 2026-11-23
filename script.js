(function(){
"use strict";
var D=window.SITE,view=document.getElementById("view"),state={q:"",sel:"SP1",down:{}},NS="http://www.w3.org/2000/svg";
function h(t,a,k){var n=document.createElement(t);Object.keys(a||{}).forEach(function(x){var v=a[x];
  if(x==="text")n.textContent=v;else if(x==="cls")n.className=v;else if(x==="on")Object.keys(v).forEach(function(e){n.addEventListener(e,v[e]);});
  else if(v!==false&&v!=null)n.setAttribute(x,v);});
  (k||[]).forEach(function(c){if(c)n.appendChild(typeof c==="string"?document.createTextNode(c):c);});return n;}
function P(p){return encodeURI(p);}
function A(label,href,cls,dl){var local=!/^(https?:|#|mailto:)/.test(href),e=h("a",{href:local?P(href):href,cls:cls||"btn",text:label,download:dl?"":null});
  if(/^https?:/.test(href)||(local&&!dl&&/\.(pdf|html)$/i.test(href))){e.target="_blank";e.rel="noopener";}return e;}
function off(t){return h("span",{cls:"btn off","aria-disabled":"true",text:t});}
function tags(l){return h("div",{cls:"tags"},(l||[]).map(function(t){return h("span",{cls:"tag",text:t});}));}
function ytId(v){if(!v)return null;var m=String(v).match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/);return m?m[1]:(/^[\w-]{11}$/.test(v)?v:null);}
function driveId(u){var m=u&&String(u).match(/drive\.google\.com\/file\/d\/([\w-]+)/);return m?m[1]:null;}
function hasVid(v){return !!(v&&(ytId(v.youtube)||v.link));}
function tpById(id){return D.tps.filter(function(x){return x.id===id;})[0];}
function hasKind(x,k){return x.docs.some(function(d){return d.kind===k;});}
function match(x){var q=state.q.toLowerCase();return !q||JSON.stringify(x).toLowerCase().indexOf(q)>-1;}
function notFound(){return [h("h1",{text:"Page introuvable"}),h("p",{},[A("Retour à la topologie","#/home","btn primary")])];}

/* video dialog (YouTube) */
var dlg=document.getElementById("dlg"),dbody=document.getElementById("dbody");
function play(title,id){dbody.textContent="";dbody.appendChild(h("iframe",{src:"https://www.youtube-nocookie.com/embed/"+id+"?autoplay=1",title:title,allow:"autoplay; encrypted-media; picture-in-picture",allowfullscreen:"",referrerpolicy:"strict-origin-when-cross-origin"}));
  if(dlg.showModal)dlg.showModal();else window.open("https://youtu.be/"+id,"_blank","noopener");}
document.getElementById("dclose").addEventListener("click",function(){dlg.close();});
dlg.addEventListener("close",function(){dbody.textContent="";});

/* cards */
function bdg(l,ok){return h("span",{cls:"badge"+(ok?" ok":""),text:l+(ok?" ✓":" –")});}
function tpCard(x){
  var th=x.topology?h("img",{cls:"ph",src:P(x.topology),alt:x.label+" : topologie",loading:"lazy"}):h("div",{cls:"ph",text:"Pas de schéma de topologie fourni"});
  var other=x.docs.some(function(d){return d.kind!=="Compte-rendu";});
  return h("a",{cls:"card",href:"#/tps/"+x.id},[th,h("div",{cls:"tb"},[h("span",{cls:"num",text:x.label}),h("h3",{text:x.title}),h("p",{text:x.desc}),tags(x.tech),
    h("div",{cls:"bdgs"},[bdg("Compte-rendu",hasKind(x,"Compte-rendu")),bdg("Énoncé / cours",other),bdg("Vidéo",hasVid(x.video)),bdg("Captures",x.screenshots.length>0)]),h("span",{cls:"open",text:"Ouvrir le TP →"})])]);}

/* interactive topology (visual simulation) */
function sv(t,a,txt){var e=document.createElementNS(NS,t);Object.keys(a||{}).forEach(function(k){e.setAttribute(k,a[k]);});if(txt)e.textContent=txt;return e;}
function icon(d){var g=sv("g",{});
  if(d.type==="router"){g.appendChild(sv("circle",{r:25,"class":"ic"}));g.appendChild(sv("path",{"class":"ar",d:"M-16 0h32M0 -16v32M-18 0l7-4v8zM18 0l-7-4v8zM0 -18l-4 7h8zM0 18l-4-7h8z"}));}
  else if(d.type==="switch"){g.appendChild(sv("rect",{x:-30,y:-15,width:60,height:30,rx:6,"class":"ic"}));g.appendChild(sv("path",{"class":"ar",d:"M-18 -5h36M-18 6h36M18 -5l-6-4v8zM-18 6l6-4v8z"}));}
  else{g.appendChild(sv("rect",{x:-17,y:-14,width:34,height:24,rx:3,"class":"ic"}));g.appendChild(sv("path",{"class":"ar",d:"M-8 16h16M0 10v6",fill:"none"}));}
  return g;}
function lkey(l){return l[0]+"-"+l[1];}
function devTps(d){return D.zones.filter(function(z){return z.id===d.zone;})[0].tps;}
function topo(){
  var svg=sv("svg",{viewBox:"0 0 1000 1020","class":"topo",role:"group","aria-label":"Carte interactive des maquettes WAN (simulation visuelle)"}),pos={};
  D.devices.forEach(function(d){pos[d.id]=d;});
  D.zones.forEach(function(z){svg.appendChild(sv("rect",{x:z.x,y:z.y,width:z.w,height:z.h,rx:14,"class":"zone"}));svg.appendChild(sv("text",{x:z.x+16,y:z.y+26,"class":"zt"},z.title));svg.appendChild(sv("text",{x:z.x+16,y:z.y+44,"class":"zs"},z.sub));});
  D.links.forEach(function(l){var a=pos[l[0]],b=pos[l[1]];if(!a||!b)return;var dn=!!state.down[lkey(l)];
    var g=sv("g",{"class":"lnk"+(dn?" down":""),role:"button",tabindex:0,"aria-label":"Lien "+a.name+" – "+b.name+(l[2]?" ("+l[2]+")":"")+" : "+(dn?"coupé (simulation)":"actif")});
    g.appendChild(sv("line",{"class":"v",x1:a.x,y1:a.y,x2:b.x,y2:b.y}));g.appendChild(sv("line",{"class":"h",x1:a.x,y1:a.y,x2:b.x,y2:b.y}));
    if(l[2])g.appendChild(sv("text",{x:(a.x+b.x)/2,y:(a.y+b.y)/2-6,"class":"ll"},l[2]));
    function tog(){state.down[lkey(l)]=!state.down[lkey(l)];draw();}
    g.addEventListener("click",tog);g.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();tog();}});svg.appendChild(g);});
  D.devices.forEach(function(d){var n=devTps(d).length,g=sv("g",{"class":"dev"+(d.type==="router"?" has":"")+(state.sel===d.id?" sel":""),transform:"translate("+d.x+","+d.y+")",role:"button",tabindex:0,"aria-label":d.name+(d.type==="router"?", routeur, "+n+" TP":"")});
    g.appendChild(icon(d));g.appendChild(sv("text",{y:d.type==="router"?44:32},d.name));if(d.type==="router")g.appendChild(sv("circle",{cx:21,cy:-21,r:4,"class":"dot"}));
    function sel(){state.sel=d.id;draw();}g.addEventListener("click",sel);g.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();sel();}});svg.appendChild(g);});
  return svg;}
function sidePanel(){var d=D.devices.filter(function(x){return x.id===state.sel;})[0];if(!d)return h("p",{cls:"empty",text:"Sélectionnez un équipement."});
  var names={router:"Routeur",switch:"Commutateur",pc:"Poste client"},z=D.zones.filter(function(x){return x.id===d.zone;})[0],nb=D.links.filter(function(l){return l[0]===d.id||l[1]===d.id;});
  function nm(id){return D.devices.filter(function(x){return x.id===id;})[0].name;}
  return h("div",{cls:"side"},[h("span",{cls:"st",text:"Simulation visuelle"}),h("h2",{text:d.name+" · "+names[d.type]}),h("p",{cls:"sub",text:"Maquette : "+z.title}),
    h("h3",{text:d.type==="router"?"Travaux pratiques associés":"TP utilisant cette maquette"}),
    h("div",{},z.tps.map(function(id){var x=tpById(id);return A(x.label+" · "+x.title,"#/tps/"+id,"btn tpb primary");})),
    h("h3",{text:"Liaisons"}),h("ul",{},nb.map(function(l){var o=l[0]===d.id?l[1]:l[0],dn=state.down[lkey(l)];
      return h("li",{},[h("span",{},[nm(o)+(l[2]?" ("+l[2]+")":"")+" : ",h("b",{cls:dn?"dn":"up",text:dn?"coupé (simulé)":"actif"})]),h("button",{cls:"btn sm",type:"button",text:dn?"Rétablir":"Couper",on:{click:function(){state.down[lkey(l)]=!dn;draw();}}})]);}))]);}
var mapBox,sideBox;function draw(){if(!mapBox)return;mapBox.textContent="";mapBox.appendChild(topo());sideBox.textContent="";sideBox.appendChild(sidePanel());}

/* views */
var V={};
V.home=function(){
  var nd=0,nc=0;D.tps.forEach(function(x){nd+=x.docs.length;if(hasKind(x,"Compte-rendu"))nc++;});var nv=D.tps.filter(function(x){return hasVid(x.video);}).length;
  mapBox=h("div",{cls:"panel map"});sideBox=h("aside",{cls:"panel","aria-live":"polite"});
  var st=[[D.tps.length,"travaux pratiques"],[nd,"documents PDF"],[nc,"compte-rendu rédigé"],[nv,"démonstrations vidéo"]];
  setTimeout(draw,0);
  return [h("h1",{text:"Travaux pratiques WAN : topologies interactives"}),h("p",{cls:"sub",text:"Cliquez sur un routeur pour voir les travaux pratiques associés, puis ouvrez le TP pour accéder à ses documents, captures et vidéos."}),
    h("div",{cls:"stats"},st.map(function(s){return h("div",{cls:"stat"},[h("b",{text:String(s[0])}),h("span",{text:s[1]})]);})),
    h("p",{cls:"note",text:"Les schémas viennent des énoncés de vos TP (équipements et sous-réseaux repris tels quels). Couper ou rétablir un lien est une simulation visuelle : aucune connexion à de vrais routeurs."}),
    h("div",{cls:"stage"},[h("div",{},[mapBox,h("div",{cls:"legend"},[h("span",{},["━ ",h("b",{cls:"up",text:"lien actif"})]),h("span",{},["┅ ",h("b",{cls:"dn",text:"lien coupé (simulé)"})]),h("span",{text:"● routeur"})])]),sideBox]),
    h("h2",{text:"Autres travaux (sans schéma de topologie fourni)"}),h("div",{cls:"row"},D.extras.map(function(id){var x=tpById(id);return A(x.label+" · "+x.title,"#/tps/"+id,"btn");})),
    h("h2",{text:"Tous les travaux pratiques"}),h("div",{cls:"grid"},D.tps.map(tpCard))];};
V.tps=function(id){
  if(!id){var f=D.tps.filter(match);return [h("h1",{text:"Travaux pratiques WAN"}),h("p",{cls:"sub",text:"Un dossier par TP. Utilisez la recherche en haut pour filtrer."}),f.length?h("div",{cls:"grid"},f.map(tpCard)):h("p",{cls:"empty",text:"Aucun TP ne correspond à la recherche."})];}
  var x=tpById(id);if(!x)return notFound();
  function sec(t,b){return h("section",{cls:"panel"},[h("h2",{text:t}),b||h("p",{cls:"empty",text:"Non fourni dans les documents reçus."})]);}
  function note(t){return t?h("p",{cls:"sub",text:t}):null;}
  var zone=D.zones.filter(function(z){return z.tps.indexOf(id)>-1;})[0];
  var obj=x.objectives.length?h("ul",{cls:"plain"},x.objectives.map(function(o){return h("li",{text:o});})):null;
  var top=x.topology?h("figure",{cls:"shot"},[h("img",{src:P(x.topology),alt:x.title+" : topologie"}),h("figcaption",{text:x.topologyNote||""}),h("div",{cls:"row",style:"margin-top:.6rem"},[A("Télécharger l'image",x.topology,"btn sm",true)])]):null;
  var steps=x.steps.length?h("ol",{cls:"plain"},x.steps.map(function(s){return h("li",{text:s});})):null;
  var cfg=null;if(x.config){var pre=h("pre",{text:"Chargement…"});cfg=h("div",{cls:"stack"},[note(x.configNote),h("div",{},[A("Télécharger la configuration",x.config,"btn",true)]),pre]);
    fetch(P(x.config)).then(function(r){return r.text();}).then(function(t){pre.textContent=t;}).catch(function(){pre.textContent="Fichier de configuration indisponible.";});}
  var cmds=x.commands.length?h("div",{cls:"stack"},x.commands.map(function(c){return h("div",{cls:"step"},[h("pre",{text:c.cmd}),c.explain?h("p",{text:c.explain}):null]);})):null;
  var ver=(x.verification.length||x.verifNote)?h("div",{cls:"stack"},x.verification.map(function(c){return h("div",{cls:"step"},[h("pre",{text:c.cmd}),c.explain?h("p",{text:c.explain}):null]);}).concat([note(x.verifNote)])):null;
  var shots=x.screenshots.length?h("div",{cls:"shots"},x.screenshots.map(function(s){return h("figure",{cls:"shot"},[h("a",{href:P(s.src),target:"_blank",rel:"noopener"},[h("img",{src:P(s.src),alt:s.caption,loading:"lazy"})]),h("figcaption",{text:s.caption})]);})):null;
  var prim=x.docs.filter(function(d){return d.kind==="Compte-rendu";})[0]||x.docs[0];
  var docs=x.docs.length?h("div",{cls:"stack"},[h("div",{},x.docs.map(function(d){return h("div",{cls:"doc"},[h("span",{},[h("span",{cls:"badge"+(d.kind==="Compte-rendu"?" ok":""),text:d.kind}),"  "+d.title+" · "+d.pages+" p."]),h("span",{cls:"row"},[A("Voir le PDF",d.file),A("Télécharger",d.file,"btn primary",true)])]);})),
    h("iframe",{cls:"pdf",src:P(prim.file),title:prim.title,loading:"lazy"}),h("p",{cls:"sub",text:"Aperçu : "+prim.title+". Si le PDF ne s'affiche pas sur votre appareil, utilisez « Voir le PDF »."})]):null;
  var v=x.video||{},yid=ytId(v.youtube),did=driveId(v.link),vb=h("p",{cls:"empty",text:"Vidéo bientôt disponible"}),parts=[];
  if(did){var box=h("div",{cls:"vbox"});box.appendChild(h("button",{cls:"vplay",type:"button",text:"▶ Lire la vidéo",on:{click:function(){box.textContent="";box.appendChild(h("iframe",{src:"https://drive.google.com/file/d/"+did+"/preview",title:"Vidéo : "+x.title,allow:"autoplay; fullscreen",allowfullscreen:"",loading:"lazy"}));}}}));parts.push(box);}
  if(yid)parts.push(h("button",{cls:"thumb",type:"button",on:{click:function(){play(x.title,yid);}}},[h("img",{src:"https://i.ytimg.com/vi/"+yid+"/hqdefault.jpg",alt:"",loading:"lazy"}),h("b",{text:"Lire la vidéo YouTube"})]));
  if(v.link)parts.push(h("div",{cls:"row"},[A("Regarder la vidéo (nouvel onglet)",v.link,"btn primary")]));
  if(parts.length){parts.push(note(v.note));parts.push(note("Si le lecteur intégré n'affiche pas la vidéo, utilisez « Regarder la vidéo »."));vb=h("div",{cls:"stack"},parts);}
  return [h("a",{cls:"crumb",href:"#/home",text:"← Topologie"}),h("span",{cls:"num",text:x.label+" · dossier d'origine « "+x.folder+" »"}),h("h1",{text:x.title}),h("p",{cls:"sub",text:x.desc}),tags(x.tech),
    zone?h("p",{cls:"sub"},["Maquette sur la carte : ",A(zone.title,"#/home","tpb-link")]):null,
    h("div",{cls:"stack"},[sec("Titre et objectifs",obj),sec("Topologie du réseau",top),sec("Travail pratique",steps),sec("Configuration",cfg),sec("Commandes CLI et explications",cmds),sec("Vérification et résultats",ver),sec("Captures d'écran",shots),sec("Documents PDF",docs),sec("Vidéo de démonstration",vb)])];};
V.docs=function(){var f=D.tps.filter(match);
  return [h("h1",{text:"Documentation"}),h("p",{cls:"sub",text:"Tous les PDF classés par dossier de TP. « Énoncé » et « Cours » sont des documents de l'enseignant ; « Compte-rendu » est un document rédigé par l'étudiant."}),
    h("div",{cls:"stack"},f.map(function(x){return h("section",{cls:"panel"},[h("h2",{},[x.label+" · "+x.title,h("span",{cls:"sub",style:"font-size:.8rem;margin-left:.6rem",text:"dossier « "+x.folder+" »"})]),
      x.docs.length?h("div",{},x.docs.map(function(d){return h("div",{cls:"doc"},[h("span",{},[h("span",{cls:"badge"+(d.kind==="Compte-rendu"?" ok":""),text:d.kind}),"  "+d.title+" · "+d.pages+" p. ",h("small",{cls:"sub",text:"(fichier d'origine : "+d.orig+")"})]),h("span",{cls:"row"},[A("Voir le PDF",d.file),A("Télécharger",d.file,"btn primary",true)])]);})):h("p",{cls:"empty",text:"Aucun document PDF fourni pour ce TP."}),
      h("div",{style:"margin-top:.7rem"},[A("Ouvrir la page du TP","#/tps/"+x.id,"btn sm")])]);}))];};
V.videos=function(){var f=D.tps.filter(function(x){return hasVid(x.video)&&match(x);});
  return [h("h1",{text:"Vidéos de démonstration"}),h("p",{cls:"sub",text:"Les vidéos sont hébergées sur Google Drive et lues depuis la page de chaque TP."}),(f.length?h("div",{cls:"grid"},f.map(tpCard)):h("p",{cls:"empty",text:"Aucune vidéo ne correspond."})),(function(){var w=D.tps.filter(function(x){return !hasVid(x.video);}).map(function(x){return x.label;});return w.length?h("p",{cls:"sub",style:"margin-top:1.2rem",text:"Vidéo bientôt disponible : "+w.join(", ")+"."}):null;})()];};

/* nav + router */
var NAV=[["home","Topologie"],["tps","Travaux pratiques"],["docs","Documentation"],["videos","Vidéos"]],nav=document.getElementById("nav"),burger=document.getElementById("burger");
NAV.forEach(function(n){nav.appendChild(h("a",{href:"#/"+n[0],"data-r":n[0],text:n[1]}));});
function menu(o){nav.classList.toggle("open",o);burger.setAttribute("aria-expanded",String(o));}
burger.addEventListener("click",function(){menu(!nav.classList.contains("open"));});
document.addEventListener("keydown",function(e){if(e.key==="Escape")menu(false);});
function route(){var p=(location.hash||"#/home").replace(/^#\/?/,"").split("/"),r=p[0]||"home";mapBox=null;
  var content=V[r]?V[r](p[1]):notFound();view.textContent="";content.forEach(function(c){if(c)view.appendChild(c);});
  [].forEach.call(nav.children,function(a){var on=a.getAttribute("data-r")===r;a.classList.toggle("on",on);if(on)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current");});
  menu(false);var x=r==="tps"&&p[1]&&tpById(p[1]);document.title=(x?x.label+" "+x.title+" | ":"")+"SAIF.DEV | Plateforme de simulation WAN";}
var qi=document.getElementById("q");
qi.addEventListener("input",function(){state.q=qi.value;if(!/^#\/(tps|docs|videos)$/.test(location.hash))location.hash="#/tps";else route();});
window.addEventListener("hashchange",function(){route();window.scrollTo(0,0);view.focus({preventScroll:true});});
document.getElementById("yr").textContent=new Date().getFullYear();
route();
})();
