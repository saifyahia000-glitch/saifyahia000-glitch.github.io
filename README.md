# SAIF.DEV : Plateforme de simulation WAN

Site statique pour GitHub Pages (branche `main`, racine). HTML, CSS et JavaScript uniquement.
Les interactions de la topologie sont des **simulations visuelles** ; rien n'est relié à de vrais routeurs.

## Fichiers à la racine du dépôt
`index.html`, `style.css`, `script.js`, `data.js`, `favicon.svg`, `README.md`, dossier `tps/`

## Où placer vos documents (dépôt de fichiers = site mis à jour, sans modifier le code)
Un dossier par TP, dans `tps/` (noms sans espaces ni majuscules, car les URL GitHub Pages sont sensibles à la casse) :

| Votre dossier        | Dossier du dépôt          |
|----------------------|---------------------------|
| tp1 partie 1 et 2    | `tps/tp1/`                |
| TP2                  | `tps/tp2/`                |
| TP3                  | `tps/tp3/`                |
| TP4                  | `tps/tp4/`                |
| TP5                  | `tps/tp5/`                |
| Redistribution       | `tps/redistribution/`     |
| lab Redistribution   | `tps/lab-redistribution/` |
| lab bgp              | `tps/lab-bgp/`            |

Dans chaque dossier, ces trois noms sont détectés automatiquement :
- `compte-rendu.pdf` : compte-rendu (aperçu intégré, bouton Voir, bouton Télécharger)
- `topologie.png` : **vraie** capture EVE-NG / Packet Tracer
- `config.txt` : configuration réseau (affichée et téléchargeable)

Autres éléments (captures de commandes, PDF supplémentaires) : mettez-les dans le même dossier et déclarez-les dans `data.js`.

## Texte des TP (dans `data.js`, copié de vos documents)
`objectives`, `commands` (`{cmd, explain}`), `verification` (`{cmd, result, image}`), `docs` (PDF supplémentaires), `video`.
- Vidéo YouTube : `video:{youtube:"ID_OU_URL"}` ; lien externe (Drive...) : `video:{link:"https://..."}`
- Évitez les gros fichiers vidéo dans le dépôt (limite GitHub : 100 Mo).

## Carte de navigation
`devices` et `links` dans `data.js` décrivent le schéma cliquable. C'est un index générique, pas la topologie d'un laboratoire.
L'association routeur → TP (`tps:[...]`) est **provisoire** : ajustez-la après lecture de vos documents.

## Publier
```
git add .
git commit -m "Plateforme WAN"
git push origin main
```
Attendez 1 à 2 minutes puis actualisez (Ctrl+Shift+R). Supprimez l'ancien dossier `assets/` s'il existe.
