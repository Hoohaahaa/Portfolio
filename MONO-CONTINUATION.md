# MONO. Portfolio — Continuation Handoff
Last updated: 2026-11-16
Status: active implementation; do not restart from a template.

## Canonical project state
- Repository: `Hoohaahaa/Portfolio`
- Working branch: `chatgpt/mono-scroll-portfolio-2026-11-15`
- Current implementation file: `index.html`
- Asset source of truth: `mono-assets/manifest.json` on `main` (seven projects, original image paths and order); do not rename or crop originals.
- Asset register: `mono-assets/ASSET-REGISTER.md`
- Main branch must not be overwritten or used as the design source. It has an older light editorial template.
- Vercel project: `mo-portfolio` / project ID `prj_F5vSmSRBm3P1fzl9b71M4uyseaeA`
- Share URL alias: `https://mono-selected.vercel.app`
- Latest deployed implementation commit: `07d37ffeb9fe88dad22cec3c6a3ac59e683df70a`
- Keep the stable alias and deploy only from the working branch.

## Product/design intent
MONO. is a portfolio, not a template demo. Preserve the existing dark cinematic visual identity and the Swiss/editorial restraint where it helps, but avoid generic slogans, decorative clutter, fake metrics, invented impact, and fake case-study narratives. Keep copy short, precise, factual, and in English for now. Persian localization is intentionally disabled: the previous Persian translation was inconsistent and weak. Do not reintroduce a language toggle until a fully rewritten Persian experience and proper RTL layouts are ready.

## Current project order and content
1. Veblen — Parametric Garment System
2. Pulse Check — Employee Experience Platform
3. Iran Unseen — Interactive Cultural Atlas
4. ATS — Applicant Tracking System
5. Humaani — AI Creative Workspace
6. Mirana — Executive Talent Platform
7. Pinket — FMCG Marketplace

Seven project covers and galleries come from `mono-assets/manifest.json`. Preserve exact filenames, native aspect ratios, and complete screenshots. Use `object-fit: contain` for UI screens; never crop source UI just to fill a card. Pinket and Pulse Check were two-person design teams. Do not invent business impact or metrics. The separate file `mono audio visual engine.jpg` is a visual signature/hero asset, not an eighth case study unless explicitly confirmed.

## Implemented in latest working commit
- Replaced generic “Structure before surface” hero headline with a changing field of UI/product-design line symbols. The symbol field periodically resolves into short terms (PRODUCT, SYSTEMS, INTERACTION, EXPERIENCE, MOTION, INTERFACE, CREATIVE). Motion should feel organic and controlled, not like a random screensaver.
- Preserved the MONO Audio Visual Engine image as the hero visual; do not reuse Veblen cover in the hero.
- Replaced static “Let’s make it clear” contact headline with a fixed-height typewriter loop:
  - “Let's make it” / “clear” with three blinking loading dots after “clear”
  - “Or make a” / “beautiful problem.”
  - It must loop without the heading container changing size or causing layout shift.
- Mobile project navigation is a horizontal snap carousel/rail, not a two-column grid and not the desktop 3D deck shrunk down. Cards should reveal the next item slightly, show one project clearly, keep the full cover image visible, and open the matching project detail on tap.
- Project detail gallery uses a bounded stage, contain-fit image, thumb rail, arrows, tap-to-expand lightbox, keyboard navigation and swipe navigation. The stage must not stretch to full viewport height. Keep controls minimal and borderless.
- Existing theme system supports dark and light palettes; theme toggle belongs in the footer only. Check every section, project detail, gallery, lightbox, and controls in both themes. Never leave dark-only text or surfaces unreadable in light mode.
- The Asset Desk/editor is hidden from the public UI.

## Remaining QA / acceptance checklist
1. Open `https://mono-selected.vercel.app` on a real Android phone and verify the latest deployment is served (hard refresh if cached).
2. Hero: icon matrix is visible, symbols animate/rotate/change, and words resolve cleanly; no old “Structure before surface” copy remains. Verify no overlap with hero image or navigation.
3. Contact: verify exact phrase sequence and that dots sit immediately after “clear”; typewriter does not resize the section, jump the footer, or clip the second phrase on narrow devices.
4. Mobile Work: one horizontal carousel row, not a grid; adjacent card peeks in; all seven covers load; no card overlaps the Practice heading; tapping any card opens its own case study.
5. Desktop Work: preserve existing 3D deck behavior unless a bug is found; do not change it just to match mobile.
6. Project detail: image stage is a compact bounded area, never full-height by accident; images fit entirely; thumbnails scroll horizontally; arrows work; swipe changes image; tapping image opens lightbox; lightbox arrows, swipe, close and zoom work.
7. Verify all seven project galleries and the final Pinket card specifically; ensure the gallery does not render beyond the stage or collide with Practice.
8. Test light and dark mode across landing, Work, About/Practice, Contact, project detail, gallery, and lightbox. Theme control only in footer; preference persists.
9. Check reduced-motion behavior, keyboard focus, touch target size, no console errors, and no broken image requests.
10. Only after checks pass, describe the site as ready to share. Do not claim real-device testing unless it was actually performed.

## Do not do
- Do not deploy the old `main` branch or replace the current MONO design with the beige starter template.
- Do not reintroduce the disliked mobile two-column project grid.
- Do not make the mobile deck a scaled-down desktop 3D carousel.
- Do not crop project UI screenshots or modify original assets.
- Do not add unsupported impact numbers, testimonials, or generic case-study copy.
- Do not re-enable incomplete Persian translation.
- Do not add the Audio Visual Engine as a project without confirmation.
- Do not move the theme toggle back into the header.
- Do not silently change project order, cover assignments, or metadata.

## User's latest explicit requests
- Hero should use a lively but refined field of changing UI/open-source-style interface symbols, sometimes resolving into relevant words from the design practice.
- Contact copy should communicate both possibilities: clarify/solve a problem, or create a beautiful problem worth solving. The exact intended pair is “Let's make it clear” and “Or make a beautiful problem.”
- Fix the overlapping mobile project grid; user dislikes it. Choose a more considered mobile presentation inspired by compact multi-collection navigation, with visible distinct projects and full images.
- Fix the project-detail gallery: no full-height stage/label strip; bounded image container; smoother carousel/swipe/thumbnail/lightbox UX.
- Preserve the rest of the current site; clean and refine rather than redesign from scratch.

## Continuation protocol
Before editing, fetch the latest `index.html` from the working branch and read this file. Make sequential writes to the same file only (fetch latest SHA before update). Deploy from the working branch, then verify the stable alias. If the conversation context is lost, this handoff plus the working branch is the source of truth.


## 2026-11-16 responsive repair (deployed)
- User supplied two Android screenshots showing severe mobile overlap: project cards ran into each other and the Practice/service list; images and labels exceeded their intended bounds. Treat these screenshots as a regression reference.
- Root cause: an earlier mobile rule used the more specific selector `#cinema .mobile-project-grid{display:grid!important;grid-template-columns:repeat(2,...)}`. A later generic `.mobile-project-grid{display:flex!important}` could not override it. Fix now uses equally/more specific selectors and explicit flex row constraints.
- Mobile project list is a horizontal snap rail: `#cinema .mobile-project-grid` is flex row nowrap; each card is 82vw, bounded, non-shrinking, with a 1.28 image stage; image is contain-fit. No two-column mobile grid. Practice section follows in normal document flow and its service rows are full-width, static, wrapping blocks. No overlap or absolute positioning.
- Hero clarified per user: remove the large text/word resolution and any icon tile/border/container aesthetic. The former headline zone is now a free-floating, irregular field of small UI/product symbols only. Symbols include search, expand, location, communication, route, home, nature, people, compass, layers, cursor, calendar, spark and globe. Each is outline or filled, independently changes orientation only in 90-degree increments, and periodically disperses/reforms. No boxes, frames, grids, captions or words around icons. Motion respects reduced-motion preference.
- Hero layout is explicit two-column desktop and single-column mobile; icon field is bounded, clipped within its own region, and does not overflow viewport. Hero visual is constrained on mobile.
- Deployed production code commit: `07d37ffeb9fe88dad22cec3c6a3ac59e683df70a`; Vercel deployment `dpl_3eQE6xJPnhQS3bSRwNpGksF7m9ZE`; stable alias `https://mono-selected.vercel.app`. Server fetch verified HTTP 200 and presence of icon initializer, manifest loading, and high-specificity mobile flex rules.
- Remaining: user-side Android visual/touch check is still required. Do not claim physical-device QA based only on HTML fetch.


## Latest update — 2026-11-16
- Added a separate **Selected Works** highlight stage between the hero and the main cinematic project carousel. It is a contained viewport with a thin bottom progress line, project title, category, description and external-open affordance.
- Current highlighted project: **ENTITY / 01 — Gestural instrument · Field / Resonance**. Preview points to the existing public project at `https://entity-bymo.vercel.app`. This is an embedded live preview, not a flattened screenshot. The user has earlier Entity screenshots in the conversation Library named `entity-hand-instrument.vercel.app_ (3).png`, `(4).png`, and `(5).png`; use these exact images if a static screenshot-based carousel is implemented later.
- **FIELD is excluded** from this section because the user does not want the music-related FIELD project represented here. Do not confuse FIELD with ENTITY; the user explicitly asked to include ENTITY for now.
- The highlight rotator is configured for a 6.5-second cycle, pauses on hover/focus and while the tab is hidden, and respects reduced motion. Current list has one slide only; add each further confirmed one-screen project to the `slides` array in `initFeaturedWork()`. Do not invent project names or add FIELD.
- Main cinematic project carousel caption is now much larger and more editorial, with GSAP fade / lift / blur transition on next/previous. Keep controls visible and separate from the title block, including on mobile.
- Removed the small `04 / HAVE A GOOD PROBLEM?` kicker above the contact typewriter. Contact itself and its contact links remain.
- Latest public alias remains `https://mono-selected.vercel.app`; deployment from commit `0c95ca1f6f0175714acf4805b2c15294e8b777d8` returned HTTP 200 and was assigned to the stable alias.
