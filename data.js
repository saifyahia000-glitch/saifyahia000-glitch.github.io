/* ===== EDIT THIS FILE to manage all content. =====
   Paths are relative to the repo root (e.g. "documents/WAN/report.pdf").
   null = not provided yet; the site shows an honest empty state.
   LAB STEPS: add one {text, cmd, out, prompt, device} per command, copied from your TP.
   Never add commands you did not take from your TP documents. */
window.SITE = {
  cv: null,
  contact: { github:"https://github.com/saifyahia000-glitch", email:null, linkedin:null },
  about: {
    summary:"Student in Network Services and Cybersecurity, working toward a career as a network engineer. I focus on network infrastructure, routing and switching, firewall configuration, Linux administration, network security and infrastructure automation.",
    education:[{ title:"Network Services and Cybersecurity", detail:"Current student" }]
  },
  skills: {
    "Networking":["TCP/IP","VLAN","STP","EtherChannel","Static Routing","OSPF","Network Troubleshooting"],
    "Security":["pfSense","Firewall Rules","Network Segmentation","Basic Security Testing"],
    "Linux & Infrastructure":["Ubuntu","Bash Scripting","Apache","LDAP","SSH","Docker"],
    "Virtualization & Labs":["EVE-NG","GNS3","VMware","VirtualBox","Cisco Packet Tracer"],
    "Automation":["n8n","Python","MCP","AI Agents"]
  },
  projects: [
    { id:"wan", title:"WAN Multi-Site Network", project:"WAN", status:"Documentation in progress",
      desc:"Design and implementation of a multi-site WAN network using routing, network segmentation and security mechanisms (pfSense and OSPF).",
      tech:["EVE-NG","pfSense","Static Routing","OSPF","Firewall Rules"], repo:"https://github.com/saifyahia000-glitch/TPS-WAN" },
    { id:"eve", title:"EVE-NG Network Laboratories", project:"Switching", status:"Documentation in progress",
      desc:"Network infrastructure and switching practice: VLAN, STP, EtherChannel and trunking on Cisco switching.",
      tech:["EVE-NG","VLAN","STP","EtherChannel","Trunking"], repo:null },
    { id:"linux", title:"Linux Administration & Network Services", project:"Linux", status:"Documentation in progress",
      desc:"Ubuntu administration and network services.",
      tech:["Ubuntu","LDAP","SSH","Apache","Bash"], repo:null },
    { id:"auto", title:"Docker & Automation", project:"Automation", status:"Work in progress",
      desc:"Practical work involving AI agents, MCP tools, Python network analysis and n8n automation.",
      tech:["Python","n8n","MCP","Docker","AI Agents"], repo:null },
    { id:"sec", title:"Network Security", project:"WAN", status:"Work in progress",
      desc:"Firewall rules, network segmentation and basic security testing.",
      tech:["pfSense","Firewall Rules","Network Segmentation"], repo:null }
  ],
  /* Interactive labs. devices: x,y inside a 600x200 canvas. links: [deviceIdA, deviceIdB]. */
  labs: [
    { id:"cli-tutorial", title:"Simulator tutorial: IOS mode navigation", project:"Tutorial", status:"Simulation demo",
      desc:"Learn how this simulated terminal works using generic IOS mode changes. This lab is a tutorial for the simulator and is not one of my TP results.",
      tags:["Simulation","CLI basics"], prompt:"Router>",
      devices:[{id:"r1",name:"Router",x:300,y:100}], links:[],
      steps:[
        {text:"Enter privileged mode",cmd:"enable",out:"",prompt:"Router#",device:"r1"},
        {text:"Enter global configuration mode",cmd:"configure terminal",out:"Enter configuration commands, one per line.  End with CNTL/Z.",prompt:"Router(config)#",device:"r1"},
        {text:"Set the device hostname",cmd:"hostname R1",out:"",prompt:"R1(config)#",device:"r1"},
        {text:"Return to privileged mode",cmd:"end",out:"",prompt:"R1#",device:"r1"}
      ],
      verify:["After the last step the prompt reads R1#, showing the hostname change took effect."],
      troubleshoot:["Commands must be typed exactly as shown, in order. Type hint to see the next one."] },
    { id:"wan-lab", title:"WAN Multi-Site Lab (EVE-NG)", project:"WAN", status:"Awaiting TP commands",
      desc:"Multi-site topology with routing and pfSense firewalls. The topology and guided commands appear here once added from the TP documents.",
      tags:["EVE-NG","pfSense","OSPF"], prompt:"Router>", devices:[], links:[], steps:[], verify:[], troubleshoot:[] }
  ],
  /* WAN practical works. Each section: string, array of strings, or null. configs: string or null. */
  wan: [
    { id:"wan-multisite", title:"WAN Multi-Site Network",
      summary:"Multi-site WAN using routing, network segmentation and security mechanisms, built in EVE-NG with pfSense.",
      repo:"https://github.com/saifyahia000-glitch/TPS-WAN", tech:["EVE-NG","pfSense","Static Routing","OSPF","Firewall Rules"],
      sections:{ routing:["Static routing","OSPF"], switching:null, protocols:null, configs:null, topology:null, results:null } }
  ],
  reports: [
    { title:"WAN Technical Report", project:"WAN", desc:"Design, configuration and testing of the multi-site WAN.", date:null, file:null },
    { title:"Routing Configuration Documentation", project:"WAN", desc:"Static routing and OSPF configuration notes.", date:null, file:null },
    { title:"Switching Laboratory Report", project:"Switching", desc:"VLAN, STP and EtherChannel laboratory write-up.", date:null, file:null },
    { title:"Linux Services Documentation", project:"Linux", desc:"Setup notes for Ubuntu network services.", date:null, file:null },
    { title:"Cybersecurity Practical Work", project:"Security", desc:"Practical security exercises and findings.", date:null, file:null }
  ],
  /* youtube: ID or URL. file: local video path (small files only). link: external URL. */
  videos: [
    { title:"WAN lab demonstration", project:"WAN", desc:"Walkthrough of the multi-site WAN.", youtube:null, file:null, link:null },
    { title:"Switching lab recording", project:"Switching", desc:"VLAN and trunk verification.", youtube:null, file:null, link:null }
  ]
};
