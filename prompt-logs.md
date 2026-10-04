# AI Prompt Logs — Airbnb Listing Page Clone

> Prompts used during development of the PlayPower Labs take-home assignment.
> Tool: Antigravity (Google DeepMind AI coding assistant)

---

## Session 1 — Project Setup & Run

**Prompt:** Run this project

**Context:** The project was already scaffolded with Next.js 14, Tailwind CSS, and TypeScript. Needed to start the dev server.

**AI Action:** Identified correct working directory (`airbnb-clone/`) and ran `npm run dev`. Fixed an initial error where `npm run dev` was run from the parent directory instead of the project root.

---

## Session 2 — Logo Update

**Prompt:** Can you replace this with actual Airbnb logo how it is on their page

**Context:** The existing logo was only the Bélo SVG symbol. The real Airbnb header shows the Bélo + "airbnb" wordmark.

**Attempts:**
1. Added SVG path data for the "airbnb" wordmark alongside the Bélo symbol
2. Switched to styled `<span>` text using Nunito font (closer match to Airbnb's custom "Cereal" typeface)
3. Finally used the actual `Airbnb_Logo_Bélo.svg.webp` image file that the user already had locally — moved it to `/public/airbnb-logo.webp` and referenced it via `<img>` tag

**Final solution:** `<img src="/airbnb-logo.webp" alt="Airbnb" className="h-[32px] w-auto" />`

---

## Session 3 — GitHub Push

**Prompt:** Let's push everything to GitHub

**Actions:**
- `git init`
- `git add .`
- `git commit -m "Initial commit: Airbnb clone with listing page"`
- Added remote: `https://github.com/mobilalshaikh0102-art/playpower-take-home-assignment`
- `git push -u origin main`

---

## Session 4 — Submission Prep

**Prompt:** I upload a zip in form and the error shows "Zip is over 50 MB. Remove node_modules and re-zip"

**Action:** Used PowerShell `Compress-Archive` excluding `node_modules` and `.next` directories. Final zip size: ~0.05 MB.

**Prompt:** Create architecture diagram and prompt logs for submission zip.

**Action:** Generated architecture diagram (PNG) and this prompt log file, then re-zipped everything.

---

## Key Decisions

| Decision | Rationale |
|---|---|
| Used actual logo `.webp` file | More accurate than SVG path approximations |
| Excluded `.next/` from zip | Build artifacts not needed, reduces size |
| Used `ViewMode` union type for photo states | Cleaner than multiple boolean flags |
| Sticky booking card with `position: sticky` | Matches Airbnb's UX pattern |

---

*Generated as part of PlayPower Labs take-home submission.*
