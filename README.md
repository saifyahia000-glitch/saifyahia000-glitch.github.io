# Saif | Network Engineering & Cybersecurity

Static portfolio for GitHub Pages (`main` branch, `/` root). HTML, CSS and vanilla JavaScript only. No build step.

## Upload
1. Upload `index.html`, `style.css`, `script.js`, `data.js`, `favicon.svg` and `README.md` to the repository root (all six files side by side).
2. If the repo already has files, compare first; the site only needs these six files. Create `documents/` and `images/` folders later for PDFs and screenshots.
3. `git add . && git commit -m "Add portfolio" && git push origin main`. Pages redeploys in a minute or two.

## Everything is edited in `data.js`
- **PDF report:** put the file in `documents/<topic>/`, then set `file: "documents/WAN/wan-report.pdf"` on the report. View and Download buttons appear.
- **YouTube video:** set `youtube: "VIDEO_ID"` (or paste the full URL). Drive or other links go in `link`.
- **Screenshot / topology:** put images in `images/...`, then set `image` (projects), `topology` or `screenshots` (labs).
- **New lab or report:** copy an existing block in `labs` or `reports`.
- **CV:** set `cv: "documents/Saif-CV.pdf"`. The button stays hidden until then.
- **Email / LinkedIn:** fill in `contact.email` and `contact.linkedin`.

Keep videos out of the repo (GitHub file limit is 100 MB); use YouTube or Drive.

## Remaining placeholders
CV, email, LinkedIn, all PDF reports, all lab topologies/screenshots/configs/results, project screenshots and resource links, all videos.
