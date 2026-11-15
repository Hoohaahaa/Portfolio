# MONO. Portfolio — Continuation Handoff

## Active working branch
`chatgpt/mono-scroll-portfolio-2026-11-15`

Repository: https://github.com/Hoohaahaa/Portfolio

## Preview / deployment
Preview is deployed and READY: https://mo-portfolio-dz2qtxokq-mos-projects-efbc27a5.vercel.app
Stable staging alias: https://mo-portfolio-mos-projects-efbc27a5.vercel.app
The preview was uploaded directly to Vercel because the Git-connected auto-deploy was blocked by Vercel's verified-commit policy. The GitHub branch remains the editable source of truth. Do not merge to `main` until assets and responsive behavior have been reviewed.

## Design / interaction
- Dark editorial MONO. visual direction, bilingual English/Persian toggle, RTL support.
- Pinned cinematic project stage: scroll progress advances the active project while three overlapping 3D cards rotate/reposition.
- Previous/next controls, click-to-open project detail, full-screen image zoom, responsive layout and reduced-motion fallback.
- Project cards and galleries use `object-fit: contain`, auto dimensions and max bounds only. No forced crop or aspect-ratio distortion.
- Original archive files are loaded from the repository's `main` branch through raw.githubusercontent.com and unpacked client-side with JSZip. The archives are not recompressed or modified.

## Project order (editable)
1. Pinket
2. Pulse Check
3. VEBLEN
4. FIELD
5. Humaani / Arzhang (Rastar)
6. MaaniJect (Rastar)
7. Mirana / JobVision
8. Iran Unseen (MONO LAB)
9. Entity (MONO LAB)
10. ATS Dashboard

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
- Some ZIP entries may not contain project-identifying filenames. Confirm each file's assignment before launch; do not combine Humaani and MaaniJect.
- The current first pass does not compress or transform image files. Very large archives may take a few seconds to download and unpack.
- Test raw GitHub CORS, all archive requests, mobile layout, keyboard access and reduced-motion behavior on the actual Vercel Preview URL before promoting.
- Never modify `main` or unrelated projects while continuing this work.
