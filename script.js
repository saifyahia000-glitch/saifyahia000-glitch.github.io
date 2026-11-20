(function(){
"use strict";
var S=window.SITE||{};
function el(tag,attrs,kids){var n=document.createElement(tag);
  Object.keys(attrs||{}).forEach(function(k){
    if(k==="text")n.textContent=attrs[k];else if(k==="class")n.className=attrs[k];else n.setAttribute(k,attrs[k]);});
  (kids||[]).forEach(function(c){if(c)n.appendChild(c);});return n;}
function $(id){return document.getElementById(id);}
function link(label,href,cls,extra){var a=el("a",Object.assign({href:href,"class":cls||"btn",text:label},extra||{}));
  if(/^https?:/.test(href)){a.target="_blank";a.rel="noopener";}return a;}
function off(label){return el("span",{"class":"btn off","aria-disabled":"true",text:label});}
function badges(list){return el("div",{"class":"badges"},list.map(function(t){return el("span",{"class":"badge",text:t});}));}
function ytId(v){var m=String(v).match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/);return m?m[1]:(/^[\w-]{11}$/.test(v)?v:null);}
function video(src){
  if(!src)return el("div",{"class":"vid empty",text:"Video not uploaded yet"});
  var id=ytId(src);
  if(!id)return el("div",{"class":"vid empty",text:"Invalid YouTube ID or URL"});
  var box=el("div",{"class":"vid"});
  var b=el("button",{type:"button",text:"Play video"});
  b.addEventListener("click",function(){
    var f=el("iframe",{src:"https://www.youtube-nocookie.com/embed/"+id+"?autoplay=1",title:"Video player",allow:"autoplay; encrypted-media; picture-in-picture",allowfullscreen:"",referrerpolicy:"strict-origin-when-cross-origin"});
    box.replaceChild(f,b);});
  box.appendChild(b);return box;}

Object.keys(S.skills||{}).forEach(function(cat){
  $("skillGrid").appendChild(el("div",{"class":"card"},[el("h3",{text:cat}),badges(S.skills[cat])]));});

(S.projects||[]).forEach(function(p){
  var thumb=el("div",{"class":"thumb"});
  if(p.image){thumb.appendChild(el("img",{src:p.image,alt:p.title+" screenshot",loading:"lazy"}));}
  else thumb.textContent="Screenshot not uploaded yet";
  var kids=[thumb,el("span",{"class":"status",text:p.status||""}),el("h3",{text:p.title}),el("p",{text:p.desc}),badges(p.tech)];
  if(p.resources&&p.resources.length){
    kids.push(el("ul",{"class":"res"},p.resources.map(function(r){
      return el("li",{},[r.href?link(r.label,r.href,""):el("span",{"class":"soon",text:r.label})]);})));}
  if(p.repo)kids.push(el("div",{"class":"actions",style:"margin-top:1rem"},[link("View on GitHub",p.repo,"btn")]));
  $("projectGrid").appendChild(el("article",{"class":"card",style:"display:flex;flex-direction:column"},kids));});

function section(title,node){return el("div",{},[el("h4",{text:title}),node]);}
function ph(t){return el("div",{"class":"ph",text:t});}
(S.labs||[]).forEach(function(l){
  var body=el("div",{"class":"lab-body"});
  body.appendChild(el("p",{text:l.desc,style:"margin:0;color:#cbd5e1"}));
  body.appendChild(section("Objectives",el("ul",{},(l.objectives||[]).map(function(o){return el("li",{text:o});}))));
  body.appendChild(section("Network topology",l.topology?el("img",{src:l.topology,alt:l.title+" topology",loading:"lazy",style:"max-width:100%;border-radius:8px;border:1px solid var(--line)"}):ph("Topology image not uploaded yet")));
  body.appendChild(section("Configuration screenshots",(l.screenshots&&l.screenshots.length)?el("div",{"class":"shots"},l.screenshots.map(function(s){return el("img",{src:s,alt:"Configuration screenshot",loading:"lazy",style:"width:100%;border-radius:8px"});})):ph("Screenshots not uploaded yet")));
  body.appendChild(section("Commands & configuration",l.commands?el("pre",{},[el("code",{text:l.commands})]):ph("Commands not added yet")));
  body.appendChild(section("Testing results",l.results?el("p",{text:l.results,style:"margin:0"}):ph("Results not added yet")));
  body.appendChild(section("Report",l.report?el("div",{"class":"actions"},[link("View PDF",l.report),link("Download PDF",l.report,"btn",{download:""})]):ph("PDF report not uploaded yet")));
  body.appendChild(section("Demonstration video",video(l.video)));
  $("labList").appendChild(el("details",{"class":"lab"},[el("summary",{text:l.title}),body]));});

(S.reports||[]).forEach(function(r){
  var kids=[el("h3",{text:r.title})];
  if(r.date)kids.push(el("span",{"class":"status",text:r.date}));
  kids.push(el("p",{text:r.desc}));
  kids.push(el("div",{"class":"actions"},r.file?[link("View PDF",r.file),link("Download",r.file,"btn",{download:""})]:[off("PDF not uploaded yet")]));
  $("reportGrid").appendChild(el("article",{"class":"card",style:"display:flex;flex-direction:column"},kids));});

(S.videos||[]).forEach(function(v){
  var kids=[video(v.youtube),el("h3",{text:v.title}),el("p",{text:v.desc})];
  if(v.link)kids.push(el("div",{"class":"actions"},[link("Open video",v.link)]));
  $("videoGrid").appendChild(el("article",{"class":"card"},kids));});

var ct=S.contact||{};
function row(label,val,href){var li=el("li",{},[el("span",{text:label})]);
  li.appendChild(val?link(label==="Email"?val:"Open profile",href,""):el("span",{"class":"soon",text:"Not added yet"}));
  $("contactList").appendChild(li);}
row("GitHub",ct.github,ct.github);
row("Email",ct.email,"mailto:"+ct.email);
row("LinkedIn",ct.linkedin,ct.linkedin);

if(S.cv){var cvb=$("cv");cvb.href=S.cv;cvb.hidden=false;}
$("yr").textContent=new Date().getFullYear();

var burger=$("burger"),menu=$("menu");
function closeMenu(){menu.classList.remove("open");burger.setAttribute("aria-expanded","false");}
burger.addEventListener("click",function(){var o=menu.classList.toggle("open");burger.setAttribute("aria-expanded",String(o));});
menu.addEventListener("click",function(e){if(e.target.tagName==="A")closeMenu();});
document.addEventListener("keydown",function(e){if(e.key==="Escape")closeMenu();});

var links=[].slice.call(menu.querySelectorAll("a"));
if("IntersectionObserver" in window){
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){
    links.forEach(function(a){a.classList.toggle("on",a.getAttribute("href")==="#"+e.target.id);});}});},{rootMargin:"-45% 0px -50% 0px"});
  document.querySelectorAll("main section[id]").forEach(function(s){io.observe(s);});}

var cv2=$("net"),ctx=cv2.getContext("2d"),nodes=[],W=0,H=0,raf=0;
var still=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function size(){var d=window.devicePixelRatio||1;W=cv2.clientWidth;H=cv2.clientHeight;cv2.width=W*d;cv2.height=H*d;ctx.setTransform(d,0,0,d,0,0);
  var n=Math.min(48,Math.round(W*H/22000));nodes=[];
  for(var i=0;i<n;i++)nodes.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.25,vy:(Math.random()-.5)*.25});}
function draw(){ctx.clearRect(0,0,W,H);var D=150;
  for(var i=0;i<nodes.length;i++){var a=nodes[i];
    if(!still){a.x+=a.vx;a.y+=a.vy;if(a.x<0||a.x>W)a.vx*=-1;if(a.y<0||a.y>H)a.vy*=-1;}
    for(var j=i+1;j<nodes.length;j++){var b=nodes[j],dx=a.x-b.x,dy=a.y-b.y,d=Math.sqrt(dx*dx+dy*dy);
      if(d<D){ctx.strokeStyle="rgba(34,211,238,"+(.22*(1-d/D))+")";ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}}
    ctx.fillStyle=i%5===0?"rgba(52,211,153,.9)":"rgba(34,211,238,.6)";ctx.beginPath();ctx.arc(a.x,a.y,i%5===0?3:2,0,6.283);ctx.fill();}
  if(!still)raf=requestAnimationFrame(draw);}
size();draw();
window.addEventListener("resize",function(){cancelAnimationFrame(raf);size();draw();});
document.addEventListener("visibilitychange",function(){if(!still){cancelAnimationFrame(raf);if(!document.hidden)draw();}});
})();
