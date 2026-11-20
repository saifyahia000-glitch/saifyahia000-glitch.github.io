# Saif | Network Engineering & Cybersecurity

Static portfolio for GitHub Pages (`main` branch, `/` root). HTML, CSS and vanilla JavaScript only. No build step.

## Upload
1. Copy everything in this folder into the root of `saifyahia000-glitch.github.io`, keeping `index.html` at the top level.
2. If the repo already has files, compare first; this site only needs `index.html`, `README.md` and `assets/`.
3. `git add . && git commit -m "Add portfolio" && git push origin main`. Pages redeploys in a minute or two.

## Everything is edited in `assets/js/data.js`
- **PDF report:** put the file in `assets/documents/<topic>/`, then set `file: "assets/documents/WAN/wan-report.pdf"` on the report. View and Download buttons appear.
- **YouTube video:** set `youtube: "VIDEO_ID"` (or paste the full URL). Drive or other links go in `link`.
- **Screenshot / topology:** put images in `assets/images/...`, then set `image` (projects), `topology` or `screenshots` (labs).
- **New lab or report:** copy an existing block in `labs` or `reports`.
- **CV:** set `cv: "assets/documents/Saif-CV.pdf"`. The button stays hidden until then.
- **Email / LinkedIn:** fill in `contact.email` and `contact.linkedin`.

Keep videos out of the repo (GitHub file limit is 100 MB); use YouTube or Drive.

## Remaining placeholders
CV, email, LinkedIn, all PDF reports, all lab topologies/screenshots/configs/results, project screenshots and resource links, all videos.
