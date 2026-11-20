/* ============================================================
   EDIT THIS FILE to add content. Nothing else needs touching.
   Any field set to null shows a clean "not uploaded yet" placeholder.
   All local paths are relative to the repository root.
   ============================================================ */
window.SITE = {
  cv: null, // e.g. "documents/Saif-CV.pdf" (button appears only when set)

  skills: {
    "Networking": ["TCP/IP","VLAN","STP","EtherChannel","Static Routing","OSPF","Network Troubleshooting"],
    "Security": ["pfSense","Firewall Rules","Network Segmentation","Basic Security Testing"],
    "Linux & Infrastructure": ["Ubuntu","Bash Scripting","Apache","LDAP","SSH","Docker"],
    "Virtualization & Labs": ["EVE-NG","GNS3","VMware","VirtualBox","Cisco Packet Tracer"],
    "Automation": ["n8n","Python","MCP","AI Agents"]
  },

  projects: [
    { title:"WAN Multi-Site Network", status:"Documentation in progress",
      desc:"Design and implementation of a multi-site WAN network using routing, network segmentation and security mechanisms.",
      tech:["EVE-NG","pfSense","Static Routing","OSPF","Firewall Rules"],
      repo:"https://github.com/saifyahia000-glitch/TPS-WAN",
      image:null, // e.g. "images/projects/wan.png"
      resources:[
        {label:"Technical report (PDF)", href:null},
        {label:"Network topology screenshots", href:null},
        {label:"Configuration files", href:null},
        {label:"Demonstration videos", href:null},
        {label:"Connectivity tests", href:null}
      ]},
    { title:"Network Infrastructure & Switching", status:"Documentation in progress",
      desc:"Layer 2 switching practice: VLAN design, trunking, spanning tree and link aggregation.",
      tech:["VLAN","STP","EtherChannel","Trunking","Cisco Switching"], repo:null, image:null, resources:[] },
    { title:"Linux & Network Services", status:"Documentation in progress",
      desc:"Deploying and configuring core network services on Ubuntu.",
      tech:["Ubuntu","LDAP","SSH","Apache","Bash"], repo:null, image:null, resources:[] },
    { title:"AI & Network Automation", status:"Work in progress",
      desc:"Practical work involving AI agents, MCP tools, Python network analysis and n8n automation.",
      tech:["Python","n8n","MCP","Docker","AI Agents"], repo:null, image:null, resources:[] }
  ],

  /* Copy one block to add a lab. */
  labs: [
    { title:"WAN Multi-Site Lab (EVE-NG)",
      desc:"Multi-site topology connected through routed WAN links with pfSense firewalls.",
      objectives:["Connect remote sites over a routed WAN","Segment traffic between sites","Apply firewall rules","Verify end-to-end connectivity"],
      topology:null,            // "images/topology/wan.png"
      screenshots:[],           // ["images/screenshots/wan-1.png"]
      commands:null,            // paste configs as a string
      results:null,             // short text, or null
      report:null,              // "documents/WAN/wan-report.pdf"
      video:null                // YouTube ID or full URL
    },
    { title:"Switching Lab",
      desc:"VLANs, trunking, STP and EtherChannel on Cisco switches.",
      objectives:["Segment a LAN with VLANs","Configure trunks","Observe STP behaviour","Bundle links with EtherChannel"],
      topology:null, screenshots:[], commands:null, results:null, report:null, video:null }
  ],

  /* date: "2026-01-15" or null. file: relative PDF path or null. */
  reports: [
    { title:"WAN Technical Report", desc:"Design, configuration and testing of the multi-site WAN.", date:null, file:null /* "documents/WAN/wan-report.pdf" */ },
    { title:"Routing Configuration Documentation", desc:"Static routing and OSPF configuration notes.", date:null, file:null },
    { title:"Switching Laboratory Report", desc:"VLAN, STP and EtherChannel laboratory write-up.", date:null, file:null },
    { title:"Linux Services Documentation", desc:"Setup notes for Ubuntu network services.", date:null, file:null },
    { title:"Cybersecurity Practical Work", desc:"Practical security exercises and findings.", date:null, file:null }
  ],

  /* youtube: video ID or URL; link: any external URL (Drive, etc.). */
  videos: [
    { title:"WAN lab demonstration", desc:"Walkthrough of the multi-site WAN.", youtube:null, link:null },
    { title:"Switching lab recording", desc:"VLAN and trunk verification.", youtube:null, link:null }
  ],

  contact: {
    github:"https://github.com/saifyahia000-glitch",
    email:null,     // "name@example.com"
    linkedin:null   // "https://www.linkedin.com/in/your-profile"
  }
};
