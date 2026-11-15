# MONO Portfolio — Continuation / Handoff

Updated: 2026-11-15  
Repository: https://github.com/Hoohaahaa/Portfolio  
Production source branch: `main`  
Asset directory: `mono-assets/`

## Current state

The portfolio uses a static `index.html` site. A manifest-driven asset layer has been added to load real project images from `/mono-assets/manifest.json`.

## Active projects

1. Pinket — FMCG Marketplace
2. Pulse Check — Employee Experience Platform
3. Veblen — Parametric Garment System
4. Humaani — AI Creative Workspace
5. Mirana — Executive Talent Platform
6. Iran Unseen — Interactive Cultural Atlas
7. Jobvision — Applicant Tracking System

Entity is intentionally excluded for now. The image `mono audio visual engine.jpg` is unassigned until the owner confirms its project.

## Source of truth

- Image mapping, covers and gallery order: `mono-assets/manifest.json`
- Human-readable asset inventory: `mono-assets/ASSET-REGISTER.md`
- Original image files: `mono-assets/*`

## Important implementation rules

- Do not infer project ownership from an ambiguous filename.
- Do not mix images between projects.
- Do not crop, stretch, recompress or upscale original screenshots.
- Use `object-fit: contain` for screenshots and long mobile flows.
- Preserve exact file paths, including current filename typos, unless the file is actually renamed and the manifest is updated in the same change.
- Do not add Entity back unless the owner explicitly asks.
- Do not assign `mono audio visual engine.jpg` to FIELD without confirmation.
- Keep the portfolio static-host friendly: no build step is currently required for the asset manifest.

## Gallery behavior

The asset layer replaces synthetic project-card artwork with the selected cover image. Opening a project adds a gallery using the manifest order. Users can switch images with thumbnails and previous/next controls; double-clicking the main image opens the full-screen viewer. Escape closes the viewer and arrow keys navigate while it is open.

## Next work

- Verify every image visually against its project and adjust order if needed.
- Refine the project detail page into the requested compact editorial passport + appendix layout.
- Add verified project year, client, role, team, scope and outcomes only when supported by the owner's résumé or project materials.
- Confirm whether the unassigned Mono Audio Visual Engine image belongs to FIELD or another concept.


## Project passport metadata (résumé + owner confirmations)

| Project | Display period | Organization / context | Role | Date confidence |
|---|---|---|---|---|
| Pinket — FMCG Marketplace | 2022–2023 | Pinket | UI/UX Designer | Confirmed employment dates (Jan 2022–Jun 2023) |
| Pulse Check — Employee Experience Platform | 2023–2025 | Jobvision | Product Designer | Jobvision employment window; exact project dates unknown |
| Jobvision — Applicant Tracking System | 2023–2025 | Jobvision | Product Designer | Jobvision employment window; exact project dates unknown |
| Mirana — Executive Talent Platform | 2023–2025 | Jobvision | Product Designer | Owner confirmed Jobvision period; exact project dates unknown |
| Humaani — AI Creative Workspace | 2025 | Rastar | Product Designer | Owner confirmed Rastar period (May–Sep 2025) |
| Veblen — Parametric Garment System | 2025–2026 | Independent / MoNo | Product Designer · Creative Technology | Period explicitly confirmed by owner |
| Iran Unseen — Interactive Cultural Atlas | 2025–2026 (provisional) | Independent / MoNo | Independent Product Designer | Independent status confirmed; years estimated, exact dates unconfirmed |

The machine-readable passport metadata lives in each project's `passport` object in `mono-assets/manifest.json`. Do not present employment-window dates as exact project dates. Iran Unseen's 2025–2026 range is provisional and must be replaced if the owner supplies more precise dates. Team size, collaborators, outcomes and metrics remain unspecified unless supported by project files or owner confirmation.
