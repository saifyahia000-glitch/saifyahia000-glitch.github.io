/* ============================================================
   data.js : contenu de la plateforme WAN
   ------------------------------------------------------------
   FICHIERS : déposez-les dans  tps/<id>/  (aucune modification de ce fichier nécessaire) :
     tps/<id>/compte-rendu.pdf   -> compte-rendu (affiché + téléchargeable)
     tps/<id>/topologie.png      -> capture réelle EVE-NG / Packet Tracer (.png)
     tps/<id>/config.txt         -> configuration réseau (affichée + téléchargeable)
   Le site détecte ces fichiers automatiquement.

   TEXTE (à copier depuis vos documents, jamais inventé) :
     objectives:   ["objectif 1", ...]
     commands:     [{cmd:"commande exacte", explain:"explication"}]
     verification: [{cmd:"show ...", result:"sortie réelle", image:"tps/tp1/verif1.png"}]
     docs:         [{title:"Partie 2", file:"tps/tp1/partie2.pdf", date:"2026-01-15", desc:""}]
     video:        {youtube:"ID_OU_URL", file:null, link:"https://drive.google.com/..."}
   ============================================================ */
(function(){
function tp(id,folder,label,title,desc,tech){return {id:id,dir:"tps/"+id,folder:folder,label:label,title:title,desc:desc,tech:tech||[],
  objectives:[],commands:[],verification:[],docs:[],date:null,report:null,topology:null,config:null,video:{youtube:null,file:null,link:null}};}
window.SITE={
  tps:[
    tp("tp1","tp1 partie 1 et 2","TP 1","Sécuriser un routeur (parties 1 et 2)","Sécurisation d'un routeur : OSPF, SSH v2, AAA, NTP, Syslog et TFTP.",["OSPF","SSH v2","AAA","NTP","Syslog","TFTP"]),
    tp("tp2","TP2","TP 2","MPLS","Travail pratique sur MPLS.",["MPLS"]),
    tp("tp3","TP3","TP 3","NAT / PAT / DHCP","Traduction d'adresses (NAT, PAT) et attribution dynamique d'adresses (DHCP).",["NAT","PAT","DHCP"]),
    tp("tp4","TP4","TP 4","TP 4","Titre et description à compléter d'après le document du TP.",[]),
    tp("tp5","TP5","TP 5","TP 5","Titre et description à compléter d'après le document du TP.",[]),
    tp("redistribution","Redistribution","TP","Redistribution","Travail pratique sur la redistribution de routes.",["Redistribution"]),
    tp("lab-redistribution","lab Redistribution","Lab","Lab Redistribution","Laboratoire de redistribution de routes.",["Redistribution"]),
    tp("lab-bgp","lab bgp","Lab","Lab BGP","Laboratoire sur le protocole BGP.",["BGP"])
  ],
  /* Carte de navigation (schéma générique, PAS la topologie d'un laboratoire).
     tps: liste des TP ouverts en cliquant le routeur. Affectation provisoire : modifiez-la
     après lecture de vos documents. */
  devices:[
    {id:"R1",type:"router",x:150,y:130,tps:["tp1","tp2"]},
    {id:"R2",type:"router",x:450,y:80,tps:["redistribution","lab-redistribution"]},
    {id:"R3",type:"router",x:750,y:130,tps:["tp3"]},
    {id:"R4",type:"router",x:300,y:270,tps:["tp4"]},
    {id:"R5",type:"router",x:600,y:270,tps:["tp5","lab-bgp"]},
    {id:"SW1",type:"switch",x:110,y:350,tps:[]},{id:"SW2",type:"switch",x:790,y:350,tps:[]},
    {id:"PC1",type:"pc",x:50,y:430,tps:[]},{id:"PC2",type:"pc",x:170,y:430,tps:[]},
    {id:"PC3",type:"pc",x:730,y:430,tps:[]},{id:"PC4",type:"pc",x:850,y:430,tps:[]}
  ],
  links:[["R1","R2"],["R2","R3"],["R1","R4"],["R4","R5"],["R5","R3"],["R2","R4"],["R2","R5"],["R1","SW1"],["SW1","PC1"],["SW1","PC2"],["R3","SW2"],["SW2","PC3"],["SW2","PC4"]]
};
})();
