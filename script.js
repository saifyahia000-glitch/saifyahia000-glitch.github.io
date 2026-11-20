(function(){
"use strict";
var D=window.SITE||{},view=document.getElementById("view"),state={q:"",tag:"All"},timer=0;
function h(t,a,k){var n=document.createElement(t);Object.keys(a||{}).forEach(function(x){var v=a[x];
  if(x==="text")n.textContent=v;else if(x==="cls")n.className=v;
  else if(x==="on")Object.keys(v).forEach(function(e){n.addEventListener(e,v[e]);});
  else if(v!==false&&v!=null)n.setAttribute(x,v);});
  (k||[]).forEach(function(c){if(c)n.appendChild(typeof c==="string"?document.createTextNode(c):c);});return n;}
function A(label,href,cls,dl){var e=h("a",{href:href,cls:cls||"btn",text:label,download:dl?"":null});
  if(/^https?:/.test(href)){e.target="_blank";e.rel="noopener";}return e;}
function off(t){return h("span",{cls:"btn off","aria-disabled":"true",text:t});}
function tags(l){return h("div",{cls:"tags"},(l||[]).map(function(t){return h("span",{cls:"tag",text:t});}));}
function filt(items){var q=state.q.toLowerCase();return items.filter(function(i){
  return (state.tag==="All"||i.project===state.tag)&&(!q||JSON.stringify(i).toLowerCase().indexOf(q)>-1);});}
function chips(items){var set=["All"];items.forEach(function(i){if(i.project&&set.indexOf(i.project)<0)set.push(i.project);});
  if(set.length<3)return null;
  return h("div",{cls:"chips",role:"group","aria-label":"Filter by project"},set.map(function(t){
    return h("button",{cls:"chip"+(state.tag===t?" on":""),type:"button","aria-pressed":String(state.tag===t),text:t,on:{click:function(){state.tag=t;route();}}});}));}
function head(title,sub){return [h("h1",{text:title}),sub?h("p",{cls:"sub",text:sub}):null];}
function grid(items,card,emptyMsg){var f=filt(items);
  return f.length?h("div",{cls:"grid"},f.map(card)):h("p",{cls:"empty",text:state.q||state.tag!=="All"?"Nothing matches your search or filter.":emptyMsg});}
function ytId(v){if(!v)return null;var m=String(v).match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/);return m?m[1]:(/^[\w-]{11}$/.test(v)?v:null);}

/* cards */
function projectCard(p){return h("article",{cls:"card"},[h("span",{cls:"status",text:p.status}),h("h3",{text:p.title}),h("p",{text:p.desc}),tags(p.tech),
  h("div",{cls:"row"},[p.repo?A("View on GitHub",p.repo):null])]);}
function labCard(l){return h("a",{cls:"card",href:"#/labs/"+l.id},[h("span",{cls:"status",text:l.status}),h("h3",{text:l.title}),h("p",{text:l.desc}),tags(l.tags),
  h("span",{text:l.steps.length?l.steps.length+" guided commands":"No guided commands yet",cls:"status"})]);}

/* views */
var V={};
V.home=function(){
  var rep=D.reports.filter(function(r){return r.file;}).length,vid=D.videos.filter(function(v){return v.youtube||v.file||v.link;}).length;
  return [h("section",{cls:"hero"},[h("h1",{text:"Building, Securing & Connecting Networks."}),
    h("p",{cls:"sub",text:"SAIF.DEV is where I document my Network Engineering and Cybersecurity practical work: topologies, configurations, reports and recordings, with simulated CLI labs you can try in the browser."}),
    h("div",{cls:"row"},[A("Open network labs","#/labs","btn primary"),A("WAN practical works","#/wan"),A("GitHub","https://github.com/saifyahia000-glitch")])]),
    h("div",{cls:"stats"},[[D.labs.length,"labs"],[D.projects.length,"projects"],[rep+" of "+D.reports.length,"reports uploaded"],[vid+" of "+D.videos.length,"videos available"]].map(function(s){
      return h("div",{cls:"stat"},[h("b",{text:String(s[0])}),h("span",{text:s[1]})]);})),
    h("h2",{text:"Featured projects"}),h("div",{cls:"grid"},D.projects.slice(0,3).map(projectCard)),
    h("h2",{text:"Latest labs"}),h("div",{cls:"grid"},D.labs.slice(0,2).map(labCard))];};
V.projects=function(){return head("Projects","Networking and cybersecurity work. Status labels show what is finished and what is still in progress.").concat([chips(D.projects),grid(D.projects,projectCard,"No projects yet.")]);};
V.labs=function(){return head("Network labs","Each lab has a topology, ordered configuration steps and a simulated CLI. The terminal is a JavaScript simulation, not a connection to real Cisco devices.").concat([chips(D.labs),grid(D.labs,labCard,"No labs yet.")]);};
V.about=function(){var s=D.about,c=D.contact;
  return head("About").concat([h("p",{cls:"sub",text:s.summary}),h("h2",{text:"Education"}),
    h("ul",{cls:"plain"},s.education.map(function(e){return h("li",{text:e.title+" ("+e.detail+")"});})),
    h("h2",{text:"Technical skills"}),
    h("div",{cls:"grid"},Object.keys(D.skills).map(function(k){return h("div",{cls:"card"},[h("h3",{text:k}),tags(D.skills[k])]);})),
    h("h2",{text:"Contact"}),
    h("div",{cls:"row"},[A("GitHub",c.github),c.email?A("Email","mailto:"+c.email):null,c.linkedin?A("LinkedIn",c.linkedin):null,D.cv?A("Download CV",D.cv,"btn",true):null])]);};
V.reports=function(){return head("Reports & documentation","View a PDF in the browser or download it. Reports are grouped by project.").concat([chips(D.reports),
  grid(D.reports,function(r){return h("article",{cls:"card"},[h("span",{cls:"status",text:r.project+(r.date?" · "+r.date:"")}),h("h3",{text:r.title}),h("p",{text:r.desc}),
    h("div",{cls:"row"},r.file?[A("View PDF",r.file),A("Download",r.file,"btn",true)]:[off("PDF not uploaded yet")])]);},"No reports yet.")]);};
V.videos=function(){return head("Videos & demonstrations","Recordings grouped by project. Large videos are hosted on YouTube or Drive.").concat([chips(D.videos),
  grid(D.videos,function(v){var id=ytId(v.youtube),playable=id||v.file,th;
    if(playable){th=h("button",{cls:"thumb",type:"button","aria-label":"Play "+v.title,on:{click:function(){play(v,id);}}},[id?h("img",{src:"https://i.ytimg.com/vi/"+id+"/hqdefault.jpg",alt:"",loading:"lazy"}):null,h("b",{text:"Play"})]);}
    else th=h("div",{cls:"thumb",text:v.link?"External video":"Video not uploaded yet"});
    return h("article",{cls:"card"},[th,h("span",{cls:"status",text:v.project}),h("h3",{text:v.title}),h("p",{text:v.desc}),h("div",{cls:"row"},[v.link?A("Open video",v.link):null])]);},"No videos yet.")]);};
V.wan=function(p){
  if(p){var w=D.wan.filter(function(x){return x.id===p;})[0];if(!w)return notFound();
    var S=w.sections,names={routing:"Routing",switching:"Switching",protocols:"WAN protocols",configs:"Configurations",topology:"Topology",results:"Results"};
    return [h("a",{cls:"crumb",href:"#/wan",text:"← All WAN works"})].concat(head(w.title,w.summary),[tags(w.tech),h("div",{cls:"sec3"},Object.keys(names).map(function(k){var v=S[k],body;
      if(!v)body=h("p",{cls:"empty",text:"Not documented yet. Add it from the TP in data.js."});
      else if(k==="configs")body=h("pre",{},[h("code",{text:v})]);
      else if(k==="topology")body=h("img",{src:v,alt:w.title+" topology",loading:"lazy",style:"max-width:100%;border-radius:8px"});
      else if(Array.isArray(v))body=h("ul",{cls:"plain"},v.map(function(x){return h("li",{text:x});}));else body=h("p",{text:v});
      return h("div",{cls:"panel"},[h("h2",{text:names[k]}),body]);})),
      h("div",{cls:"row",style:"margin-top:1.4rem"},[w.repo?A("View on GitHub",w.repo):null,A("Related reports","#/reports")])]);}
  return head("WAN technologies","One page per WAN practical work.").concat([grid(D.wan,function(w){return h("a",{cls:"card",href:"#/wan/"+w.id},[h("h3",{text:w.title}),h("p",{text:w.summary}),tags(w.tech)]);},"No WAN works yet.")]);};
function notFound(){return head("Page not found").concat([h("p",{},[A("Back to home","#/home")])]);}

/* video dialog */
var dlg=document.getElementById("dlg"),dbody=document.getElementById("dbody");
function play(v,id){dbody.textContent="";dbody.appendChild(id?h("iframe",{src:"https://www.youtube-nocookie.com/embed/"+id+"?autoplay=1",title:v.title,allow:"autoplay; encrypted-media; picture-in-picture",allowfullscreen:"",referrerpolicy:"strict-origin-when-cross-origin"}):h("video",{src:v.file,controls:"",autoplay:""}));
  if(dlg.showModal)dlg.showModal();else window.open(id?"https://youtu.be/"+id:v.file,"_blank","noopener");}
document.getElementById("dclose").addEventListener("click",function(){dlg.close();});
dlg.addEventListener("close",function(){dbody.textContent="";});

/* lab view with simulated CLI */
V.lab=function(id){
  var l=D.labs.filter(function(x){return x.id===id;})[0];if(!l)return notFound();
  var idx=0,prompt=l.prompt||"Router>",NS="http://www.w3.org/2000/svg";
  var out=h("div",{cls:"tout",role:"log","aria-live":"polite",tabindex:"0"}),pr=h("span",{text:prompt}),inp=h("input",{type:"text","aria-label":"CLI input",autocomplete:"off",autocapitalize:"off",spellcheck:"false"});
  var ol=h("ol",{cls:"steps"}),devEls={};
  function print(t,c){out.appendChild(h("div",{cls:c||"",text:t}));out.scrollTop=out.scrollHeight;}
  function paintSteps(){ol.textContent="";l.steps.forEach(function(s,i){ol.appendChild(h("li",{cls:i<idx?"done":i===idx?"next":""},[s.text,h("code",{text:s.cmd})]));});
    Object.keys(devEls).forEach(function(k){devEls[k].setAttribute("class","dev");});
    var cur=l.steps[idx];if(cur&&cur.device&&devEls[cur.device])devEls[cur.device].setAttribute("class","dev on");}
  function exec(c){c=c.trim();print(prompt+" "+c);var s=l.steps[idx];
    if(!c)return;
    if(!s){print("All guided steps completed. Press Reset to start again.","info");return;}
    if(c.toLowerCase()==="hint"){print("Next expected command: "+s.cmd,"info");return;}
    if(c.replace(/\s+/g," ").toLowerCase()===s.cmd.toLowerCase()){if(s.out)print(s.out);if(s.prompt){prompt=s.prompt;pr.textContent=prompt;}idx++;paintSteps();
      if(!l.steps[idx])print("Lab complete (simulation).","info");}
    else print("% Not recognised by this simulation. Type 'hint' for the next expected command.","err");}
  function stop(){clearInterval(timer);}
  function reset(){stop();idx=0;prompt=l.prompt||"Router>";pr.textContent=prompt;out.textContent="";print("Simulated terminal. Not connected to real devices.","info");
    if(!l.steps.length)print("No guided commands have been added for this lab yet.","info");paintSteps();inp.focus();}
  function demo(){if(!l.steps.length)return;reset();timer=setInterval(function(){var s=l.steps[idx];if(!s){stop();return;}exec(s.cmd);},900);}
  var svg=document.createElementNS(NS,"svg");svg.setAttribute("viewBox","0 0 600 200");svg.setAttribute("class","topo");svg.setAttribute("role","img");svg.setAttribute("aria-label",l.title+" topology");
  function sv(t,a){var e=document.createElementNS(NS,t);Object.keys(a).forEach(function(k){e.setAttribute(k,a[k]);});return e;}
  var pos={};l.devices.forEach(function(d){pos[d.id]=d;});
  l.links.forEach(function(k){if(pos[k[0]]&&pos[k[1]])svg.appendChild(sv("line",{x1:pos[k[0]].x,y1:pos[k[0]].y,x2:pos[k[1]].x,y2:pos[k[1]].y}));});
  l.devices.forEach(function(d){var g=sv("g",{"class":"dev"}),t=sv("text",{x:d.x,y:d.y+5});t.textContent=d.name;
    g.appendChild(sv("rect",{x:d.x-42,y:d.y-20,width:84,height:40,rx:8}));g.appendChild(t);svg.appendChild(g);devEls[d.id]=g;});
  var topo=l.devices.length?svg:h("p",{cls:"empty",text:"Topology not added yet. Add devices and links to this lab in data.js."});
  function list(t,a){return h("div",{cls:"panel"},[h("h2",{text:t}),a&&a.length?h("ul",{cls:"plain"},a.map(function(x){return h("li",{text:x});})):h("p",{cls:"empty",text:"Nothing added yet."})]);}
  var form=h("form",{cls:"tin",on:{submit:function(e){e.preventDefault();stop();exec(inp.value);inp.value="";}}},[pr,inp]);
  var node=[h("a",{cls:"crumb",href:"#/labs",text:"← All labs"})].concat(head(l.title,l.desc),[
    h("div",{cls:"lab"},[h("div",{style:"display:grid;gap:1rem"},[h("div",{cls:"panel"},[h("h2",{text:"Topology"}),topo]),h("div",{cls:"panel"},[h("h2",{text:"Configuration steps"}),l.steps.length?ol:h("p",{cls:"empty",text:"No steps yet. Add them from your TP in data.js."})])]),
      h("div",{cls:"term"},[h("div",{cls:"tbar"},[h("span",{text:"Simulated CLI"}),h("span",{text:"JavaScript simulation"})]),out,form,
        h("div",{cls:"tbtns"},[h("button",{cls:"btn primary",type:"button",text:"Run demo",on:{click:demo}}),h("button",{cls:"btn",type:"button",text:"Hint",on:{click:function(){stop();exec("hint");}}}),h("button",{cls:"btn",type:"button",text:"Reset",on:{click:reset}})])])]),
    h("div",{cls:"sec3",style:"margin-top:1.2rem"},[list("Verification",l.verify),list("Troubleshooting",l.troubleshoot)])]);
  setTimeout(reset,0);return node;};

/* nav + router */
var NAV=[["home","Home"],["labs","Network labs"],["wan","WAN technologies"],["reports","Reports"],["videos","Videos"],["projects","Projects"],["about","About & skills"]];
var nav=document.getElementById("nav");NAV.forEach(function(n){nav.appendChild(h("a",{href:"#/"+n[0],"data-r":n[0],text:n[1]}));});
var side=document.getElementById("side"),burger=document.getElementById("burger");
function menu(o){side.classList.toggle("open",o);burger.setAttribute("aria-expanded",String(o));}
burger.addEventListener("click",function(){menu(!side.classList.contains("open"));});
document.addEventListener("keydown",function(e){if(e.key==="Escape")menu(false);});
var last="";
function route(){stop0();var p=(location.hash||"#/home").replace(/^#\/?/,"").split("/"),r=p[0]||"home";
  if(r!==last){state.tag="All";last=r;}
  var fn=r==="labs"&&p[1]?V.lab:V[r];var content=fn?(r==="labs"&&p[1]?V.lab(p[1]):V[r](p[1])):notFound();
  view.textContent="";content.forEach(function(c){if(c)view.appendChild(c);});
  [].forEach.call(nav.children,function(a){var on=a.getAttribute("data-r")===r;a.classList.toggle("on",on);if(on)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current");});
  menu(false);document.title=(r==="home"?"":(NAV.filter(function(n){return n[0]===r;})[0]||["","Not found"])[1]+" | ")+"Saif | Network Engineering & Cybersecurity";}
function stop0(){clearInterval(timer);}
var qi=document.getElementById("q");
qi.addEventListener("input",function(){state.q=qi.value;if(!/^#\/(labs|reports|videos|projects)$/.test(location.hash)){location.hash="#/labs";}else route();});
window.addEventListener("hashchange",function(){route();window.scrollTo(0,0);view.focus({preventScroll:true});});
document.getElementById("yr").textContent=new Date().getFullYear();
route();
})();
