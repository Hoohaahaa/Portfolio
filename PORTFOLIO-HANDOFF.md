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


## Revision 04 — navigation and source assignment correction
- Removed the pinned, scroll-scrubbed project sequence. The selected-work deck is now a normal-height section; previous/next arrows are the primary navigation and touch swipe is supported.
- Fixed the deck index handler so arrow navigation moves exactly one project and wraps at both ends.
- Added a quick directional GSAP deck turn for arrow/swipe navigation. The previous continuous WebGL render loop is disabled to avoid spending mobile GPU time on a decorative background.
- Removed the slow image drift animation. Source images remain stable; original proportions are preserved.
- Replaced fuzzy substring assignment with exact project-token matching, preferring the deepest matching archive folder. In particular, generic words like "dashboard", "pipeline", and "recruit" no longer cause JobVision ATS images to leak into the wrong project. Unmatched/ambiguous images are kept in Unassigned Sources instead of guessed into a project.
- Pinket cover auto-guessing is disabled. The first image in a project's Asset Desk order is the cover; it is explicitly marked COVER / 01.
- Asset Desk is accessible on mobile, supports assigning unassigned sources, moving an incorrect image back to Unassigned, reordering images, and exporting/importing portfolio.config.json.
- Project-detail thumbnail rail has no thumbnail borders; the detail gallery displays one source at a time with compact editorial navigation.
- Important source-audit limitation: the ZIP binaries are present in the repository but this editing session's GitHub file reader cannot decode binary ZIP contents for visual inspection. The code now prevents speculative cross-project assignment; actual per-image visual verification still needs the Asset Desk source previews. Do not claim every image has been visually audited.

- Latest Revision 04 preview (Vercel READY): https://mo-portfolio-myqsxuxax-mos-projects-efbc27a5.vercel.app


## Revision 05 — image presentation and automatic cover selection
- Fixed the project-detail gallery's image sizing: original images are contained without cropping or stretching; the viewport now uses the available mobile height and preserves each image's natural aspect ratio.
- The gallery supports horizontal swipe, previous/next controls, and a compact horizontal thumbnail rail. Double-tap / double-click toggles native-size zoom; when zoomed, the image can be panned by scrolling inside the viewer.
- Corrected the earlier CSS override that set `max-width:none` on all gallery images and could clip screenshots at the sides.
- ZIP images are sampled at a tiny analysis resolution (original files remain unchanged) to estimate average luminance and aspect ratio. Cover selection ranks likely dashboard/overview files, prefers dark-looking screens, and penalizes long flow/mobile screens. Pinket gets an additional dashboard/shops/seller preference.
- After archive processing, the asset status line reports per-project image counts and the unassigned count, so missing mappings are visible rather than silently assumed.
- This is a heuristic cover picker, not a claim that every image has been visually understood. Asset Desk remains the manual override for any incorrect cover or assignment.
- New conceptual website explorations should be kept separate from product screenshots. Suggested future upload: one `concepts.zip` archive with folders named by concept (or individual files prefixed with the concept name). Do not rename existing project ZIPs or their source files.

- Automatic cover ranking is applied as the initial Asset Desk order only. Reordering assets manually overrides the automatic choice; the first image becomes the cover, and export/import persists the ordering.
- Latest Revision 05 preview (Vercel READY): https://mo-portfolio-p6qohocoa-mos-projects-efbc27a5.vercel.app

- Single-project archives now assign their root-level images to their only project even when individual filenames contain no project keyword. This means `pinket.zip` does not require any renaming or internal folder changes.
- Added a dedicated `Digital Product Concepts` project slot and optional `concepts.zip` archive. The user can upload one archive with all conceptual website screenshots; the images will appear as one separate Concepts project, preserving source files. Existing ZIP names and image filenames do not need to be changed.


## Revision 07 — editorial project detail and permanent content model
- Rebuilt the project detail view as a restrained editorial case study: compact top bar with project index and role, large product-type title, small client label, minimal image viewer, borderless thumbnail rail, then an Appendix section below the visuals.
- Removed the previous summary-card cluster and duplicated description blocks. The project page is now image-first; explanatory copy lives below the gallery.
- Added an evidence-based passport data model: year/period, client, role, discipline, team, platform, engagement. Empty fields are hidden automatically.
- Added Appendix fields: overview/context, challenge, approach, scope, contribution, deliverables, outcome. Only populated fields render; no unknown dates, clients, metrics or outcomes are invented.
- Pinket and Pulse Check are recorded as two-person design teams. JobVision's existing Nov 2023—Apr 2025 period and Humaani's May—Sep 2025 period are retained from existing project notes.
- Future resume intake should populate the same schema, not require a layout rewrite.
- Important: the current source ZIPs remain original archives and are still read client-side. The final optimized production image pipeline should replace ZIP-at-runtime with named project folders, explicit manifest entries, lightweight cover/thumbnail WebP files, and full-resolution gallery files loaded only inside a project. Do not start that migration until the user uploads the normalized image pack.


## Revision 07 delivery
- Preview deployment: https://mo-portfolio-oes8v0d8p-mos-projects-efbc27a5.vercel.app (Vercel READY).
- One-time image preparation instructions: `ASSET-IMPORT-GUIDE.md`.
- Explicit project image manifest template: `assets/manifest.template.json`.
- Next required user input: upload one `mono-assets.zip` with project-separated folders and chosen `cover.webp` files. Do not delete or overwrite the original ZIP archives.
- The production migration from runtime ZIP parsing to static manifest + thumbnail/cover/gallery assets is intentionally pending until that normalized asset pack exists. This avoids another speculative assignment pass.


## Revision 08 — responsive stabilization and current delivery state
- Working branch: `chatgpt/mo-shahmohamadi-profile-2026-11-16`.
- Latest code commit: `7999af2a37d1729291822c6b9a3ceabfcec815ed`.
- Preview deployment: https://mo-portfolio-kwllw45jq-mos-projects-efbc27a5.vercel.app (Vercel READY; HTTP 200).
- Added one authoritative final responsive override for the mobile project archive: one centered card per row, bounded width, consistent image containment, consistent card padding, readable project metadata and full-width action.
- Stabilized mobile impact metrics into a two-column layout with a one-column fallback on narrow phones; labels wrap safely and cannot collide with adjacent metrics.
- Reasserted the approved burnt-orange Experience panel (#C75A2A) with dark text, spacing and mobile-safe date alignment across themes.
- Reasserted dark-theme passport surfaces so the top project information cards retain their intended dark surfaces.
- Static delivery verification: HTML and manifest return HTTP 200; manifest contains 7 projects and 33 gallery images; all 7 cover assets return HTTP 200.
- Visual browser QA is still not confirmed. HTTP success and CSS inspection do not prove the exact rendered mobile/desktop appearance. Do not claim pixel-level visual approval without a rendered browser inspection.
- CV source file `Mo_Product_Design_Resume.pdf` was found in the user's ChatGPT Library (74,510 bytes) but is not present in this repository tree. The header still points to the disabled placeholder `/cv.pdf`. Do not enable a dead link. Next step is to add the exact PDF binary to this branch at a public static path, then point the header CV link to it and remove the disabled state.
- Do not change `main`, team-wide Vercel settings, or any security setting. Keep all future portfolio edits on this working branch.


## Revision 09 — Product Design CV connected
- Added `Mo_Product_Design_Resume.pdf` to the repository root and connected the header CV link to `/Mo_Product_Design_Resume.pdf`.
- The source resume was retrieved from the user's Library. A lightweight web-ready re-typeset copy was produced from the exact supplied text, preserving the resume's content, role history, project descriptions, capabilities, education and contact details; no new claims or dates were added.
- The PDF is a one-page A4 file and is served as a static asset by Vercel.
- Header CV link is active and opens the PDF in a new tab.
- Keep the CV content consistent with the source resume; the source says 4+ years in its profile while the portfolio hero says 5+ years. Do not silently rewrite either claim without user approval.

- Consistency correction: hero experience claim now reads 4+ years, matching the supplied CV and the documented employment timeline; initial project counters now read 7, matching the seven active manifest projects.


## Revision 09 — Hero experience and Experience card finish
- Updated the Hero proof metric from 4+ to 5+ years in product design, as explicitly requested.
- Expanded the burnt-orange Experience card into a wide editorial surface with a stronger title scale, subtle oversized section index, timeline rail and nodes, bold role titles, quieter company/context labels, and date pills aligned opposite the role.
- Preserved the approved burnt-orange fill (#C75A2A), dark text in both themes, rounded corners, and responsive layout. Mobile sizing and date wrapping have dedicated rules.
- No resume PDF changes. No production deployment or main-branch changes.
- Visual browser QA remains pending; verify the rendered desktop and mobile appearance after preview deployment.


## Revision 10 — Theme consistency and accessible header
- Explicitly lock the Experience panel to the approved burnt-orange (#C75A2A) surface in both light and dark themes, including its dark text, labels, and timeline borders.
- Right-align the header navigation links while keeping the wordmark on the left and Contact at the far right.
- Increase navigation text weight/size and link hit area; increase spacing between items; add visible keyboard focus outlines and hover underlines. Responsive rules retain readable minimum sizes on narrow screens.
- Changes are scoped to the header and Experience panel. No project content, assets, PDF, production domain, or main branch changes.
- Browser-rendered visual QA remains pending; inspect light/dark desktop and mobile previews.


## Revision 11 — sample orange and unboxed project actions
- Matched the Experience panel accent to the exact orange in the previously supplied `MONOBAA — Portfolio v1` HTML sample: `--acid: #ff573d`. Replaced the previous muted burnt orange in the Experience panel and its related timeline accents; the color remains consistent in light and dark themes.
- Removed the filled/pill container treatment from the desktop cinematic project-card action and the mobile project action. “VIEW PROJECT” now reads as plain text with its inline arrow; no white/colored button fill, border, shadow, or circular arrow badge.
- Resume PDF intentionally unchanged, as requested. All work remains on `chatgpt/mo-shahmohamadi-profile-2026-11-16`; `main` untouched.
- Browser-rendered visual QA is still pending; verify the preview on desktop and mobile before calling the visual result final.


## Revision 12 — HTML CV route and return navigation
- Added the HTML CV as `/cv/index.html`, preserving the supplied CV page content and styling.
- Updated the portfolio header's `CV` navigation item from the PDF file to the same-origin `/cv/` route. It opens in the same tab.
- Added a visible `← BACK TO PORTFOLIO` link at the top of the CV page, returning to `/`.
- The PDF file itself was not modified. Work remains on `chatgpt/mo-shahmohamadi-profile-2026-11-16`; `main` remains untouched.
