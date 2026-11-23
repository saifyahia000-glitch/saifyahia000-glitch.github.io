# SAIF.DEV · Plateforme de simulation WAN

Site statique pour GitHub Pages (branche `main`, racine). HTML, CSS et JavaScript uniquement, sans backend.
La topologie interactive est une **simulation visuelle** : aucune connexion à de vrais routeurs.

## Contenu du dépôt (racine)
`index.html`, `style.css`, `script.js`, `data.js`, `favicon.svg`, `README.md`, dossier `tps/`

## Organisation des TP (d'après vos documents réels)
| Dossier du site | Votre dossier d'origine | PDF (noms d'origine, octet pour octet identiques) |
|---|---|---|
| `tps/tp1/` | tp1 partie 1 et 2 | `TP1_MPLS_partie1 (2).pdf`, `1_TP1 - MPLS - partie2 (1).pdf` |
| `tps/tp2/` | TP2 | `tp2_saif_eddine comptrendu.pdf` (compte-rendu), `3_TP2 - MPLS (2).pdf` |
| `tps/tp3/` | TP3 | `4_TP-NAT-PAT-DHCP (1).pdf` |
| `tps/redistribution/` | Redistribution | `2_Redistribution_de_routes (1).pdf` |
| `tps/lab-redistribution/` | lab Redistribution | `2_TP_redis_ospf_eigrp_rip (3).pdf` |
| `tps/lab-bgp/` | lab bgp | `2_lab_bgp (1).pdf` |
| `tps/tp4/`, `tps/gre/` | vidéos à la racine du ZIP | aucun PDF fourni |

Les PDF ne sont ni modifiés ni renommés. Les chemins sont encodés par le site (espaces, parenthèses) ; ne changez pas la casse des noms.
Chaque TP a ses boutons « Voir le PDF » et « Télécharger ».

## Vidéos : hébergées sur Google Drive, jamais dans GitHub
Tout est géré dans `data.js` (champ `video` de chaque TP) :
| TP | Fichier Drive |
|---|---|
| Lab BGP | BGP.mp4 |
| Lab Redistribution | redistribution2.mp4 |
| Redistribution | redistribution.mp4 |
| TP 4 (IPsec) | Tp4 Ipsec2.mp4 |
| GRE | Video Gre(3).mp4 |
| TP 1, TP 2, TP 3 | aucun lien : « Vidéo bientôt disponible » |

- Lecteur intégré (Google Drive) + bouton « Regarder la vidéo » qui ouvre le lien dans un nouvel onglet.
- **Important :** dans Drive, chaque fichier doit être partagé en « Tout utilisateur disposant du lien » (lecteur), sinon le professeur verra une demande de connexion.
- Pour ajouter un lien : `video:{youtube:null, link:"https://drive.google.com/file/d/ID/view"}`. YouTube : `video:{youtube:"ID_OU_URL", link:null}`.

## Points à connaître
- **Énoncé / Cours** = documents de l'enseignant ; **Compte-rendu** = document de l'étudiant. Seul le TP 2 a un compte-rendu dans le ZIP.
- Les topologies, noms d'équipements et sous-réseaux de la carte sont repris des schémas des énoncés.
- Les `config.txt` (lab BGP, lab Redistribution) contiennent les commandes **de l'énoncé**, pas des résultats de test.
- Les énoncés TP 1 partie I et TP 3 sont des PDF scannés : seuls les titres lisibles ont été repris dans les pages.
- Non inclus (trop lourds / vidéos) : `tp1.approj` (305 Mo), `tp1.1.2 wan.zip` (enregistrement HTML de 48 Mo), toutes les vidéos .mp4.

## Ajouter un document, un TP ou un équipement
- PDF : copiez-le dans `tps/<id>/` puis ajoutez `{title, kind:"Compte-rendu", file, pages, orig}` dans `docs`.
- Nouveau TP : copiez un bloc de `tps`. Carte : `zones`, `devices`, `links` (ajoutez l'id du TP dans `zone.tps`).

## Publier
```
git add .
git commit -m "Plateforme WAN avec les TP"
git push origin main
```
Attendez 1 à 2 minutes puis actualisez (Ctrl+Shift+R). Supprimez les anciens fichiers inutiles du dépôt (ex. dossier `assets/`).
