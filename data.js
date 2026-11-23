/* ============================================================
   data.js : tout le contenu de la plateforme WAN.
   Contenu construit UNIQUEMENT à partir des documents fournis (wan.zip).
   - kind "Énoncé" / "Cours" = document fourni par l'enseignant (pas un compte-rendu).
   - kind "Compte-rendu"     = document rédigé par l'étudiant (seul : TP 2).
   Aucun résultat de test n'est inventé : ce qui manque est indiqué comme tel.
   PDF : fichiers d'origine, noms inchangés, dans tps/<id>/.
   VIDÉOS : jamais dans GitHub ; liens externes uniquement (video.link = URL Google Drive, ou video.youtube = ID/URL).
   video:NOV (link null) = « Vidéo bientôt disponible ».
   ============================================================ */
(function(){
var TP2_SHOTS=[{"src": "tps/tp2/captures/capture-p02-000.jpg", "caption": "SP1 – VRF Client_A (page 2 du compte-rendu)"}, {"src": "tps/tp2/captures/capture-p03-001.jpg", "caption": "SP1 – VRF Client_A (page 3 du compte-rendu)"}, {"src": "tps/tp2/captures/capture-p04-002.jpg", "caption": "SP3 – VRF Client_A (page 4 du compte-rendu)"}, {"src": "tps/tp2/captures/capture-p05-003.jpg", "caption": "SP3 – EIGRP dans la VRF (page 5 du compte-rendu)"}, {"src": "tps/tp2/captures/capture-p06-004.jpg", "caption": "SP1 – EIGRP dans la VRF (page 6 du compte-rendu)"}, {"src": "tps/tp2/captures/capture-p07-005.jpg", "caption": "SP1 – EIGRP dans la VRF (page 7 du compte-rendu)"}, {"src": "tps/tp2/captures/capture-p08-006.jpg", "caption": "SP1 – EIGRP dans la VRF (page 8 du compte-rendu)"}, {"src": "tps/tp2/captures/capture-p09-007.jpg", "caption": "SP1 – EIGRP dans la VRF (page 9 du compte-rendu)"}, {"src": "tps/tp2/captures/capture-p10-008.jpg", "caption": "SP3 – EIGRP dans la VRF (page 10 du compte-rendu)"}, {"src": "tps/tp2/captures/capture-p11-009.jpg", "caption": "SP3 – EIGRP dans la VRF (page 11 du compte-rendu)"}, {"src": "tps/tp2/captures/capture-p12-010.jpg", "caption": "SP3 – EIGRP dans la VRF (page 12 du compte-rendu)"}, {"src": "tps/tp2/captures/capture-p13-011.jpg", "caption": "SP1 – BGP et redistribution (page 13 du compte-rendu)"}, {"src": "tps/tp2/captures/capture-p14-012.jpg", "caption": "SP1 – BGP et redistribution (page 14 du compte-rendu)"}, {"src": "tps/tp2/captures/capture-p15-013.jpg", "caption": "SP1 – BGP et redistribution (page 15 du compte-rendu)"}, {"src": "tps/tp2/captures/capture-p16-014.jpg", "caption": "SP1 – BGP et redistribution (page 16 du compte-rendu)"}, {"src": "tps/tp2/captures/capture-p17-015.jpg", "caption": "SP1 – BGP et redistribution (page 17 du compte-rendu)"}, {"src": "tps/tp2/captures/capture-p18-016.jpg", "caption": "SP1 – BGP et redistribution (page 18 du compte-rendu)"}, {"src": "tps/tp2/captures/capture-p19-017.jpg", "caption": "SP1 – BGP et redistribution (page 19 du compte-rendu)"}, {"src": "tps/tp2/captures/capture-p20-018.jpg", "caption": "SP1 – BGP et redistribution (page 20 du compte-rendu)"}, {"src": "tps/tp2/captures/capture-p21-019.jpg", "caption": "SP1 – BGP et redistribution (page 21 du compte-rendu)"}, {"src": "tps/tp2/captures/capture-p22-020.jpg", "caption": "SP1 – BGP et redistribution (page 22 du compte-rendu)"}, {"src": "tps/tp2/captures/capture-p23-021.jpg", "caption": "SP1 – BGP et redistribution (page 23 du compte-rendu)"}, {"src": "tps/tp2/captures/capture-p24-022.jpg", "caption": "SP1 – BGP et redistribution (page 24 du compte-rendu)"}, {"src": "tps/tp2/captures/capture-p25-023.jpg", "caption": "SP1 – BGP et redistribution (page 25 du compte-rendu)"}, {"src": "tps/tp2/captures/capture-p26-024.jpg", "caption": "SP1 – BGP et redistribution (page 26 du compte-rendu)"}, {"src": "tps/tp2/captures/capture-p27-025.jpg", "caption": "SP1 – BGP et redistribution (page 27 du compte-rendu)"}, {"src": "tps/tp2/captures/capture-p28-026.jpg", "caption": "SP3 – BGP et redistribution (page 28 du compte-rendu)"}, {"src": "tps/tp2/captures/capture-p29-027.jpg", "caption": "SP3 – BGP et redistribution (page 29 du compte-rendu)"}, {"src": "tps/tp2/captures/capture-p30-028.jpg", "caption": "SP3 – BGP et redistribution (page 30 du compte-rendu)"}, {"src": "tps/tp2/captures/capture-p31-029.jpg", "caption": "SP3 – BGP et redistribution (page 31 du compte-rendu)"}, {"src": "tps/tp2/captures/capture-p32-030.jpg", "caption": "SP3 – BGP et redistribution (page 32 du compte-rendu)"}, {"src": "tps/tp2/captures/capture-p33-031.jpg", "caption": "SP3 – BGP et redistribution (page 33 du compte-rendu)"}, {"src": "tps/tp2/captures/capture-p34-032.jpg", "caption": "SP3 – BGP et redistribution (page 34 du compte-rendu)"}, {"src": "tps/tp2/captures/capture-p35-033.jpg", "caption": "SP3 – BGP et redistribution (page 35 du compte-rendu)"}, {"src": "tps/tp2/captures/capture-p36-034.jpg", "caption": "SP3 – BGP et redistribution (page 36 du compte-rendu)"}, {"src": "tps/tp2/captures/capture-p37-035.jpg", "caption": "SP3 – BGP et redistribution (page 37 du compte-rendu)"}, {"src": "tps/tp2/captures/capture-p38-036.jpg", "caption": "SP3 – BGP et redistribution (page 38 du compte-rendu)"}, {"src": "tps/tp2/captures/capture-p39-037.jpg", "caption": "SP3 – BGP et redistribution (page 39 du compte-rendu)"}, {"src": "tps/tp2/captures/capture-p40-038.jpg", "caption": "SP3 – BGP et redistribution (page 40 du compte-rendu)"}, {"src": "tps/tp2/captures/capture-p41-039.jpg", "caption": "SP3 – BGP et redistribution (page 41 du compte-rendu)"}, {"src": "tps/tp2/captures/capture-p42-040.jpg", "caption": "SP3 – BGP et redistribution (page 42 du compte-rendu)"}, {"src": "tps/tp2/captures/capture-p43-041.jpg", "caption": "SP1 – BGP et redistribution (page 43 du compte-rendu)"}, {"src": "tps/tp2/captures/capture-p44-042.jpg", "caption": "SP1 – BGP et redistribution (page 44 du compte-rendu)"}, {"src": "tps/tp2/captures/capture-p45-043.jpg", "caption": "SP3 – test de connectivité (page 45 du compte-rendu)"}, {"src": "tps/tp2/captures/capture-p46-044.jpg", "caption": "AGENCE – test de connectivité (page 46 du compte-rendu)"}, {"src": "tps/tp2/captures/capture-p47-045.jpg", "caption": "SIEGE – test de connectivité (page 47 du compte-rendu)"}, {"src": "tps/tp2/captures/capture-p48-046.jpg", "caption": "SIEGE – test de connectivité (page 48 du compte-rendu)"}, {"src": "tps/tp2/captures/capture-p49-047.jpg", "caption": "Wireshark – paquets MPLS (SP2–SP3) (page 49 du compte-rendu)"}, {"src": "tps/tp2/captures/capture-p50-048.jpg", "caption": "AGENCE – test de connectivité (page 50 du compte-rendu)"}, {"src": "tps/tp2/captures/capture-p51-049.jpg", "caption": "Wireshark – paquets MPLS (SP2–SP3) (page 51 du compte-rendu)"}, {"src": "tps/tp2/captures/capture-p52-050.jpg", "caption": "Wireshark – paquets MPLS (SP2–SP3) (page 52 du compte-rendu)"}];
var NOV={youtube:null,link:null};
window.SITE={
  tps:[
    { id:"tp1", folder:"tp1 partie 1 et 2", label:"TP 1", title:"Configuration d'un backbone MPLS (parties I et II)",
      desc:"Mise en place d'un backbone MPLS sous GNS3 (routeurs Cisco 7200) : backbone OSPF zone 0 pour l'opérateur, réseau client SIEGE / AGENCE en EIGRP AS 100, puis activation de MPLS et LDP.",
      tech:["MPLS","LDP","OSPF","EIGRP","GNS3"],
      objectives:["Concevoir et configurer le cœur du réseau de l'opérateur : le backbone MPLS.","Intégrer le service MPLS pour un client qui relie deux sites (LAN SIEGE et LAN AGENCE).","Activer MPLS et LDP sur les routeurs de l'opérateur et vérifier les adjacences."],
      topology:"tps/tp1/topologie.png", topologyNote:"Schéma « Topologie à mettre en place » de l'énoncé (partie II) : SP1, SP2, SP3 (backbone MPLS, OSPF zone 0), SIEGE et AGENCE (client, EIGRP AS 100).",
      steps:["Partie I – Étape 1 : configuration de base des équipements : créer la maquette sous GNS3 et configurer les interfaces physiques selon les plages d'adresses du schéma.","Partie II – Étape 1 : activation de MPLS sur les routeurs de l'opérateur.","Partie II – Étape 2 : vérification des configurations."],
      config:null, configNote:null,
      commands:[
        {cmd:"mpls ldp router-id <interface> force", explain:"Partie II, étape 1 : force LDP à utiliser l'interface loopback 0 comme router ID, afin que sa valeur reste stable malgré les changements de topologie et les redémarrages (syntaxe telle que citée dans l'énoncé)."},
        {cmd:"mpls ip", explain:"Valide MPLS sur toutes les interfaces physiques du domaine MPLS ; les routeurs deviennent adjacents via LDP."}],
      verification:[
        {cmd:"show mpls ldp neighbor", explain:"Vérifier que les adjacences LDP sont formées."},
        {cmd:"show mpls interfaces", explain:"Sur SP3 : voir les interfaces qui fonctionnent avec MPLS."},
        {cmd:"show mpls forwarding-table", explain:"Sur SP3 : afficher la LFIB."},
        {cmd:"show mpls ldp bindings", explain:"Afficher les labels associés aux préfixes (LDP)."}],
      verifNote:"Les résultats de ces commandes ne figurent pas dans les documents fournis pour ce TP.",
      screenshots:[],
      docs:[{title:"Énoncé – partie I",kind:"Énoncé",file:"tps/tp1/TP1_MPLS_partie1 (2).pdf",pages:2,orig:"TP1_MPLS_partie1 (2).pdf"},
            {title:"Énoncé – partie II",kind:"Énoncé",file:"tps/tp1/1_TP1 - MPLS - partie2 (1).pdf",pages:2,orig:"1_TP1 - MPLS - partie2 (1).pdf"}],
      video:NOV },
    { id:"tp2", folder:"TP2", label:"TP 2", title:"Configuration d'un VPN MPLS",
      desc:"VRF Client_A sur les routeurs PE, EIGRP dans la VRF, MP-BGP VPNv4 avec redistribution, tests de connectivité SIEGE / AGENCE et capture Wireshark des paquets MPLS. Compte-rendu complet de 52 pages.",
      tech:["MPLS VPN","VRF","EIGRP","MP-BGP VPNv4","Wireshark"],
      objectives:["Configurer une instance VRF pour le client (Client A : sites LAN SIEGE et LAN AGENCE) sur chaque PE concerné (SP1 et SP3).","Associer le client au backbone MPLS avec RD et Route Target."],
      topology:"tps/tp2/topologie.png", topologyNote:"Schéma de la maquette MPLS du TP 1 (énoncé). Le compte-rendu du TP 2 indique les équipements SP1, SP3, SIEGE et AGENCE.",
      steps:["Étape 1 de l'énoncé : configuration d'une instance VRF pour le client sur chaque PE concerné.","Compte-rendu : SP1 et SP3 – VRF Client_A.","Compte-rendu : SP1 et SP3 – EIGRP dans la VRF.","Compte-rendu : SP1 et SP3 – BGP et redistribution.","Compte-rendu : tests de connectivité (SIEGE, AGENCE, SP3) et Wireshark – paquets MPLS (SP2–SP3)."],
      config:null, configNote:null,
      commands:[
        {cmd:"ip vrf Client_A", explain:"Crée la VRF « Client_A » sur SP1 et SP3 (ip vrf nom_client)."},
        {cmd:"rd 100:1", explain:"Route Distinguisher de la VRF, valeur donnée par l'énoncé."},
        {cmd:"route-target both 1:100", explain:"Route Target 1:100 ; « both » car les PE importent et exportent pour cette VRF (énoncé)."},
        {cmd:"ip vrf forwarding <nom_client>", explain:"En mode interface : associe la VRF à l'interface qui fait face au routeur CE."}],
      verification:[], verifNote:"Les tests de connectivité et les sorties de commandes sont dans les captures ci-dessous et dans le compte-rendu PDF.",
      screenshots:TP2_SHOTS,
      docs:[{title:"Compte-rendu TP 2 (Saif Eddine Ben El Haj Yahia)",kind:"Compte-rendu",file:"tps/tp2/tp2_saif_eddine comptrendu.pdf",pages:52,orig:"tp2_saif_eddine comptrendu.pdf"},
            {title:"Énoncé du TP 2 – MPLS",kind:"Énoncé",file:"tps/tp2/3_TP2 - MPLS (2).pdf",pages:6,orig:"3_TP2 - MPLS (2).pdf"}],
      video:NOV },
    { id:"tp3", folder:"TP3", label:"TP 3", title:"Configuration du DHCP et NAT",
      desc:"Configuration du DHCP et de la traduction d'adresses pour la société ABC (maquette Packet Tracer) : routes statiques, routes par défaut, services DHCP et NAT.",
      tech:["DHCP","NAT","PAT","Routes statiques"],
      objectives:[], topology:"tps/tp3/topologie.png", topologyNote:"Schéma de l'énoncé : routeurs R1, R2, R3, ISP, Router4, zones privée / publique de la société ABC et zone d'hébergement ISP.",
      steps:["Tâche 1 : configurer les routes statiques et les routes par défaut au niveau de l'intranet de la société ABC (routeurs R1, R2, ...)."],
      config:null, configNote:null, commands:[], verification:[],
      verifNote:"L'énoncé est un PDF scanné (images) : seul le titre de la tâche 1 a été repris ici. Consultez le PDF pour les autres tâches.",
      screenshots:[],
      docs:[{title:"Énoncé du TP 3 – DHCP et NAT",kind:"Énoncé",file:"tps/tp3/4_TP-NAT-PAT-DHCP (1).pdf",pages:6,orig:"4_TP-NAT-PAT-DHCP (1).pdf"}],
      video:NOV },
    { id:"tp4", folder:"(vidéo à la racine du ZIP)", label:"TP 4", title:"IPsec (démonstration vidéo)",
      desc:"Vidéo de démonstration IPsec (7 min 10 s). Aucun document PDF n'a été fourni pour ce TP.",
      tech:["IPsec"], objectives:[], topology:null, topologyNote:null, steps:[], config:null, configNote:null, commands:[], verification:[], verifNote:null, screenshots:[], docs:[],
      video:{youtube:null,link:"https://drive.google.com/file/d/1Cx6sydIl9rr3-m5GFUN_dDAnnWQDn0y6/view?usp=drive_link",note:"Vidéo hébergée sur Google Drive (fichier « Tp4 Ipsec2.mp4 »)."} },
    { id:"gre", folder:"(vidéo à la racine du ZIP)", label:"GRE", title:"GRE (démonstration vidéo)",
      desc:"Vidéo de démonstration GRE (7 min 46 s). Aucun document PDF n'a été fourni. Numéro de TP à confirmer.",
      tech:["GRE"], objectives:[], topology:null, topologyNote:null, steps:[], config:null, configNote:null, commands:[], verification:[], verifNote:null, screenshots:[], docs:[],
      video:{youtube:null,link:"https://drive.google.com/file/d/1q-K_KpdKEaxekE7-OYrdyVXOc-M845ng/view?usp=drive_link",note:"Vidéo hébergée sur Google Drive (fichier « Video Gre(3).mp4 »)."} },
    { id:"redistribution", folder:"Redistribution", label:"Cours", title:"La redistribution de routes",
      desc:"Support de cours « Module : Routage et commutation » (10 pages) sur la redistribution de routes, avec la vidéo du dossier Redistribution (4 min 45 s).",
      tech:["Redistribution"],
      objectives:["Annoncer une route venant d'un protocole de routage vers un réseau qui fonctionne avec un autre protocole (but de la redistribution, d'après le cours)."],
      topology:null, topologyNote:null, steps:[], config:null, configNote:null, commands:[], verification:[], verifNote:null, screenshots:[],
      docs:[{title:"Cours – La redistribution de routes",kind:"Cours",file:"tps/redistribution/2_Redistribution_de_routes (1).pdf",pages:10,orig:"2_Redistribution_de_routes (1).pdf"}],
      video:{youtube:null,link:"https://drive.google.com/file/d/126UVqq5kglkQ0rZdaVY8nZvFwAaSRW9i/view?usp=drive_link",note:"Vidéo hébergée sur Google Drive (fichier « redistribution.mp4 »)."} },
    { id:"lab-redistribution", folder:"lab Redistribution", label:"Lab", title:"Redistribution de routes OSPF / RIPv2 / EIGRP",
      desc:"Trois domaines de routage (OSPF, EIGRP, RIP) reliés par R1 à R6 : configuration de base, puis redistribution OSPF vers EIGRP et EIGRP vers OSPF.",
      tech:["OSPF","EIGRP","RIPv2","Redistribution"],
      objectives:["Configurer la redistribution de routes entre OSPF, RIPv2 et EIGRP (titre de l'énoncé).","Vérifier que les routes se propagent, puis constater les routes externes « EX » importées dans EIGRP."],
      topology:"tps/lab-redistribution/topologie.png", topologyNote:"Schéma de l'énoncé : OSPF (zone 0), EIGRP et RIP, routeurs R1 à R6.",
      steps:["Configuration de base : adresses IP des interfaces et interfaces Loopback.","Configuration du routage : OSPF, EIGRP, RIP.","Vérification de la propagation des routes avant la redistribution.","Redistribution basique : OSPF dans EIGRP (sur R2 et R3), en spécifiant la métrique.","Redistribution des routes EIGRP dans OSPF."],
      config:"tps/lab-redistribution/config.txt", configNote:"Commandes extraites de l'énoncé (configuration donnée dans le document, pas un résultat de test).",
      commands:[{cmd:"redistribute ... metric ...", explain:"Dans EIGRP (et RIP), préciser la métrique est indispensable : sans métrique choisie, les routes sont annoncées avec une métrique infinie (énoncé). Les commandes exactes sont dans le fichier de configuration."}],
      verification:[{cmd:"show ip route  (R3, R5, R2)", explain:"Vérifier la propagation des routes avant la redistribution."},{cmd:"show ip route  (R4)", explain:"Les routes préfixées « EX » sont des routes externes importées dans EIGRP."}],
      verifNote:"Les sorties de ces commandes sont dans le PDF de l'énoncé.", screenshots:[],
      docs:[{title:"Énoncé – redistribution OSPF / RIPv2 / EIGRP",kind:"Énoncé",file:"tps/lab-redistribution/2_TP_redis_ospf_eigrp_rip (3).pdf",pages:7,orig:"2_TP_redis_ospf_eigrp_rip (3).pdf"}],
      video:{youtube:null,link:"https://drive.google.com/file/d/1qcWQ1BjF6AUkVLr2jaNCROGZWagax1w9/view?usp=drive_link",note:"Vidéo hébergée sur Google Drive (fichier « redistribution2.mp4 »)."} },
    { id:"lab-bgp", folder:"lab bgp", label:"Lab", title:"Configuration d'un routeur avec le protocole BGP",
      desc:"Un routeur client (CR) se connecte à ISP1 (AS 100) ; ISP1 échange ses routes avec ISP2 (AS 200) en BGP4.",
      tech:["BGP","eBGP","Routes statiques"],
      objectives:["Configurer le routeur client avec un réseau interne annoncé par l'ISP1 via BGP.","Configurer BGP pour l'échange d'informations de routage entre ISP1 (AS 100) et ISP2 (AS 200)."],
      topology:"tps/lab-bgp/topologie.png", topologyNote:"Schéma de l'énoncé : CR, FAI1 (AS 100), FAI2 (AS 200).",
      steps:["Étape 1 : configuration des informations de base sur chaque routeur.","Étape 2 : configuration des routes par défaut et des routes statiques.","Étape 3 : configuration du protocole BGP sur les deux routeurs FAI.","Étape 4 : affichage des tables de routage.","Étape 5 : vérification de la connectivité.","Étape 6 : affichage des informations BGP sur les routeurs FAI.","Étape 7 : remarques générales."],
      config:"tps/lab-bgp/config.txt", configNote:"Commandes extraites de l'énoncé (configuration donnée dans le document, pas un résultat de test).",
      commands:[
        {cmd:"router bgp 100", explain:"Sur ISP1 : démarre BGP dans l'AS 100."},
        {cmd:"neighbor 172.16.1.2 remote-as 200", explain:"Sur ISP1 : déclare ISP2 (AS 200) comme voisin BGP."},
        {cmd:"router bgp 200", explain:"Sur ISP2 : démarre BGP dans l'AS 200."},
        {cmd:"neighbor 172.16.1.1 remote-as 100", explain:"Sur ISP2 : déclare ISP1 (AS 100) comme voisin BGP."},
        {cmd:"ip route 0.0.0.0 0.0.0.0 10.10.10.2", explain:"Sur CR : route par défaut vers ISP1."}],
      verification:[{cmd:"Tables de routage (étape 4), connectivité (étape 5), informations BGP (étape 6)", explain:"Étapes de vérification de l'énoncé."}],
      verifNote:"Les résultats attendus figurent dans le PDF de l'énoncé.", screenshots:[],
      docs:[{title:"Énoncé – configuration d'un routeur avec BGP",kind:"Énoncé",file:"tps/lab-bgp/2_lab_bgp (1).pdf",pages:8,orig:"2_lab_bgp (1).pdf"}],
      video:{youtube:null,link:"https://drive.google.com/file/d/1OLR6_d112WYPHEpwyJwM-qm3CNxB5zRW/view?usp=drive_link",note:"Vidéo hébergée sur Google Drive (fichier « BGP.mp4 »)."} }
  ],
  /* Carte interactive : schémas REELS repris des énoncés (noms d'équipements et sous-réseaux lus sur les schémas). */
  zones:[
    {id:"mpls",title:"Backbone MPLS · TP 1 et TP 2",sub:"Backbone MPLS (OSPF zone 0) · client en EIGRP AS 100",x:10,y:10,w:560,h:410,tps:["tp1","tp2"]},
    {id:"bgp",title:"Lab BGP",sub:"AS 100 · AS 200",x:590,y:10,w:400,h:410,tps:["lab-bgp"]},
    {id:"redis",title:"Lab Redistribution",sub:"OSPF · EIGRP · RIP",x:10,y:435,w:980,h:255,tps:["lab-redistribution"]},
    {id:"nat",title:"TP 3 · DHCP et NAT (société ABC)",sub:"Zone privée · zone publique · zone ISP",x:10,y:705,w:980,h:305,tps:["tp3"]}
  ],
  devices:[
    {id:"SP1",zone:"mpls",type:"router",name:"SP1",x:120,y:175},{id:"SP2",zone:"mpls",type:"router",name:"SP2",x:290,y:90},{id:"SP3",zone:"mpls",type:"router",name:"SP3",x:460,y:175},
    {id:"SIEGE",zone:"mpls",type:"router",name:"SIEGE",x:120,y:275},{id:"AGENCE",zone:"mpls",type:"router",name:"AGENCE",x:460,y:275},
    {id:"m-SW1",zone:"mpls",type:"switch",name:"SW1",x:120,y:360},{id:"m-SW2",zone:"mpls",type:"switch",name:"SW2",x:460,y:360},
    {id:"FAI1",zone:"bgp",type:"router",name:"FAI1 (AS 100)",x:700,y:100},{id:"FAI2",zone:"bgp",type:"router",name:"FAI2 (AS 200)",x:900,y:100},{id:"CR",zone:"bgp",type:"router",name:"CR",x:700,y:210},
    {id:"b-SW",zone:"bgp",type:"switch",name:"Commutateur",x:700,y:295},{id:"b-PC",zone:"bgp",type:"pc",name:"PC",x:700,y:365},
    {id:"R1",zone:"redis",type:"router",name:"R1",x:300,y:490},{id:"R2",zone:"redis",type:"router",name:"R2",x:470,y:565},{id:"R3",zone:"redis",type:"router",name:"R3",x:130,y:565},
    {id:"R4",zone:"redis",type:"router",name:"R4",x:230,y:630},{id:"R5",zone:"redis",type:"router",name:"R5",x:560,y:630},{id:"R6",zone:"redis",type:"router",name:"R6",x:800,y:595},
    {id:"n-R1",zone:"nat",type:"router",name:"R1",x:200,y:905},{id:"n-R2",zone:"nat",type:"router",name:"R2",x:330,y:795},{id:"n-R3",zone:"nat",type:"router",name:"R3",x:520,y:905},
    {id:"ISP",zone:"nat",type:"router",name:"ISP",x:600,y:795},{id:"n-R4",zone:"nat",type:"router",name:"Router4",x:830,y:745},
    {id:"n-S3",zone:"nat",type:"switch",name:"Switch3",x:130,y:765},{id:"n-S1",zone:"nat",type:"switch",name:"Switch1",x:70,y:905},{id:"n-S4",zone:"nat",type:"switch",name:"Switch4",x:330,y:965},
    {id:"n-S2",zone:"nat",type:"switch",name:"Switch2",x:520,y:975},{id:"n-S5",zone:"nat",type:"switch",name:"Switch5",x:810,y:880},{id:"n-PC",zone:"nat",type:"pc",name:"Internaute",x:940,y:745}
  ],
  links:[
    ["SP1","SP2","192.168.23.0/24"],["SP2","SP3","192.168.34.0/24"],["SP1","SIEGE","192.168.12.0/24"],["SP3","AGENCE","192.168.45.0/24"],["SIEGE","m-SW1"],["AGENCE","m-SW2"],
    ["FAI1","FAI2","172.16.1.0/24"],["FAI1","CR","10.10.10.0/24"],["CR","b-SW"],["b-SW","b-PC"],
    ["R1","R3","10.0.13.0/24"],["R1","R2","10.0.12.0/24"],["R3","R4","10.0.34.0/24"],["R2","R5","10.0.25.0/24"],["R4","R5","10.0.45.0/24"],["R5","R6","10.0.56.0/24"],
    ["n-R2","n-S3","192.168.20.0/29"],["n-R2","ISP","209.165.200.224/30"],["ISP","n-R4","209.165.200.228/30"],["n-R4","n-PC","192.168.1.0/24"],["ISP","n-S5","192.168.10.0/24"],
    ["n-R2","n-R1","10.10.10.0/30"],["n-R2","n-R3","10.10.9.0/30"],["n-R1","n-S1","192.168.10.0/24"],["n-R1","n-S4","192.168.11.0/24"],["n-R3","n-S2","192.168.30.0/24"]
  ],
  /* TP sans routeur sur la carte (pas de schéma fourni) */
  extras:["tp4","gre","redistribution"]
};
})();
