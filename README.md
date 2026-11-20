# SAIF.DEV: Network Engineering & Cybersecurity

Static site for GitHub Pages (`main` branch, root). HTML, CSS and vanilla JavaScript only. No build step, no backend.

## Files (all in the repository root)
`index.html`, `style.css`, `script.js`, `data.js`, `favicon.svg`, `README.md`

## Upload
```
git add index.html style.css script.js data.js favicon.svg README.md
git commit -m "Interactive labs platform"
git push origin main
```
Wait 1-2 minutes, then hard-refresh (Ctrl+Shift+R).

## Managing content: only `data.js`
- **Report PDF:** create `documents/WAN/` (etc.), upload the PDF, set `file: "documents/WAN/name.pdf"` and optionally `date`.
- **Video:** `youtube: "VIDEO_ID"` (or URL) for an in-page player; `file: "videos/x.mp4"` for a small local file; `link` for Drive or other sites.
- **Lab:** copy a block in `labs`. Add `devices` (x, y in a 600x200 canvas), `links` (pairs of device ids) and `steps`.
- **Lab step:** `{text, cmd, out, prompt, device}`. `cmd` is what the visitor types, `out` is the output shown, `prompt` is the prompt after the command.
- **WAN page:** fill `sections` (routing, switching, protocols, configs, topology, results) in `wan`.
- **Project / skills / CV / contact:** edit the matching entries.

## Honesty rules
- The CLI is a JavaScript simulation. It only accepts the commands you list, in order.
- Add only commands, outputs and results taken from your own TP documents.
- Anything set to `null` or left empty shows an "not added yet" state instead of fake content.
