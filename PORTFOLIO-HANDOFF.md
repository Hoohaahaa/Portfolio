# MONO. Portfolio — Continuation Handoff

## Active working branch
`chatgpt/mono-scroll-portfolio-2026-11-15`

Repository: https://github.com/Hoohaahaa/Portfolio

## Preview / deployment
Preview is deployed and READY: https://mo-portfolio-iv51055f7-mos-projects-efbc27a5.vercel.app
Stable staging alias: https://mo-portfolio-mos-projects-efbc27a5.vercel.app
The preview was uploaded directly to Vercel because the Git-connected auto-deploy was blocked by Vercel's verified-commit policy. The GitHub branch remains the editable source of truth. Do not merge to `main` until assets and responsive behavior have been reviewed.

## Design / interaction
- Dark editorial MONO. visual direction, bilingual English/Persian toggle, RTL support.
- Pinned cinematic project stage: scroll progress advances the active project while three overlapping 3D cards rotate/reposition.
- Previous/next controls, click-to-open project detail, full-screen image zoom, responsive layout and reduced-motion fallback.
- Project media uses natural image proportions. Images fill the available media height; wide screenshots receive subtle horizontal drift while tall screens remain fully visible. No forced crop or aspect-ratio distortion.
- Work index is grouped by Commerce, Talent, Rastar, AI & Workflows and MONO LAB. Product type is the headline; brand/client is secondary.
- Project detail pages use a compact passport (product type, brand, scope, role), then context, design challenge, approach and scope, followed by full-height image frames with click-to-zoom.
- Original archive files are loaded from the repository's `main` branch through raw.githubusercontent.com and unpacked client-side with JSZip. The archives are not recompressed or modified.

## Project order (editable)
1. FMCG Marketplace — Pinket
2. Executive Talent Platform — Mirana
3. Recruitment & ATS Platform — JobVision
4. Talent Acquisition Dashboard — JobVision
5. Employee Experience Platform — Pulse Check
6. Parametric Fashion System — VEBLEN
7. Generative Audio Instrument — FIELD
8. Generative AI Workspace — Humaani (Rastar)
9. Product Content Studio — MaaniJect (Rastar)
10. Interactive Cultural Atlas — Iran Unseen (MONO LAB)
11. Gestural Audio Instrument — Entity (MONO LAB)

Humaani and MaaniJect are distinct Rastar products and must not share case-study galleries. Iran Unseen and Entity belong under MONO LAB — AI Workflows.

## Source archives included in this feature branch
- `pinket.zip`
- `jobvis.zip`
- `rastar.zip`
- `ai works.zip`

Standalone source PNGs are also in the repository root. Their names and current project hints are listed in `portfolio.config.json`.

## Editing
- Open **ASSETS ↗** in the header.
- Select a project; drag its image tiles to reorder.
- Drag project names to change project order.
- Open **UNASSIGNED SOURCES** to manually assign archive images whose filenames do not identify a project.
- Remove a tile from the visible gallery without deleting its source.
- Export `portfolio.config.json` after changes; import it to restore a saved ordering.
- The exported config is a local download. To make changes permanent for every visitor, commit the exported file to the branch.

## Important limitations / next verification
- The ZIP archives and standalone PNGs are included in this feature branch. Keep their filenames and root paths stable; the page reads them from this branch.
- Case-study copy is currently a concise editorial scaffold based on known project descriptions and supplied context. Before calling it final, inspect the text/brief files inside the original ZIPs and replace generic challenge/approach copy with verified project-specific facts. Do not invent metrics, outcomes or client claims.
- Some ZIP entries may not contain project-identifying filenames. Confirm each file's assignment before launch; do not combine Humaani and MaaniJect.
- The current first pass does not compress or transform image files. Very large archives may take a few seconds to download and unpack.
- Test raw GitHub CORS, all archive requests, mobile layout, keyboard access and reduced-motion behavior on the actual Vercel Preview URL before promoting.
- Never modify `main` or unrelated projects while continuing this work.


## Current editing pass (2026-11-15 · second visual pass)
- Updated card media to fill the media viewport by height while retaining intrinsic aspect ratio. Extra-wide images drift horizontally in a restrained loop; no image is cropped or recompressed.
- Replaced brand-led headlines with product-type headlines and subdued brand labels.
- Split Mirana from JobVision and added Talent / Rastar / MONO LAB / AI & Workflows grouping.
- Added Project Passport and structured case-study sections. Generic challenge/approach text is intentionally a scaffold until the source text files are reviewed.
- Next: validate archive filename mapping (especially JobVision vs Mirana vs ATS), inspect the text/brief files inside ZIP archives and replace generic case-study scaffold copy with verified project-specific facts, then test mobile scroll/GSAP and keyboard/reduced-motion behavior.
- Latest staging deployment: https://mo-portfolio-iv51055f7-mos-projects-efbc27a5.vercel.app (READY). Stable staging alias remains https://mo-portfolio-mos-projects-efbc27a5.vercel.app.


## Current pass — mobile / cinematic revision
- Rebuilt mobile-specific typography, header, pinned card dimensions, controls, work cards and spacing instead of compressing desktop rules.
- Added a lightweight real WebGL fragment-shader canvas behind the cinematic project deck (with a reduced-motion / no-WebGL fallback).
- ScrollTrigger now scrubs the orbit and deck tilt while advancing the active project; card transitions remain GSAP-driven.
- Project-card and editorial-card images now have a restrained independent 2px float; extra-wide captures keep horizontal drift. No image is stretched or recompressed.
- Added restrained editorial image grading / glass-mask overlays and preserved native aspect ratios.
- Pinket cover is now selected from its own archive by landscape/dashboard-like aspect ratio and filename hints, after saved assignments are applied. Verify visually that the selected frame is an actual dashboard, not a mockup.
- Replaced long case-study blocks with a compact context / scope / contribution strip and one large image carousel with selectable thumbnail rail, previous/next controls and click-to-zoom.
- Gallery shows one source image at a time; no contact-sheet wall and no automatic image recompression.
- Current limitations: archive asset matching is still heuristic for multi-project ZIPs; the Asset Desk remains the manual correction path. Review the selected Pinket cover and the Mirana / JobVision / Rastar assignments on desktop and mobile before promoting this branch.

- Latest mobile/cinematic preview deployment (READY): https://mo-portfolio-290aod6wd-mos-projects-efbc27a5.vercel.app
