# MONO. — Design & Development Handoff

## Objective
Continue the original spatial editorial prototype as a bilingual, production-ready portfolio. Preserve the established composition and visual hierarchy.

## Locked direction
- Near-black canvas, oversized MONO. typography, visible grid, high contrast and deliberate negative space.
- Three overlapping, angled project screenshots in the hero; cycle through all nine projects.
- Real project interface screenshots remain the main visual material.
- Persian / English language switch with RTL / LTR layout.
- Motion should support depth, typography and navigation without becoming decorative noise.

## Project order
1. Pinket
2. Pulse Check
3. VEBLEN
4. FIELD
5. Humaani (Rastar)
6. Mirana / JobVision
7. Iran Unseen
8. Entity
9. ATS Dashboard

## Verified project notes
- Pinket: digital commerce/product ecosystem; dashboard, Customer App and Shopper App; team of 2 designers; Jan 2022–Jun 2023.
- Pulse Check: user led the design execution across the main dashboard and reporting experience; teammate provided critique and feedback; team of 2.
- VEBLEN: parametric design tool. Do not claim unfinished physical validation or inverse-design work as complete.
- FIELD: generative instrument mapping movement to force, field and sound. References: https://monomatter.dev/field/instrument and https://monomatter.dev/field.
- Humaani / Rastar: user was Lead Designer; May–September 2025. Keep Maniject imagery distinct unless source material confirms a relationship.
- Mirana / JobVision: recruitment platform for senior and executive talent; Nov 2023–Apr 2025.
- Iran Unseen: interactive atlas for exploring Iran.
- Entity: gestural sound instrument. Do not claim unfinished or broken hand/face detection works.
- ATS Dashboard: recruitment operations interface.

## Asset rules
- Use supplied original screenshots; never substitute CSS-built mockups or generated UI.
- Preserve aspect ratio and meaningful UI details; use object-fit: contain.
- Provide click-to-zoom in case studies and lazy-load galleries.
- Keep original exports unchanged; use optimized derivatives for the website.
- Never invent metrics, research findings, outcomes or unverified features.

## Motion and accessibility
- GSAP + ScrollTrigger for typography and section reveals.
- Restrained Three.js / WebGL layer only where it supports the composition.
- Support keyboard, touch and pointer navigation.
- Respect prefers-reduced-motion; no hover-only functionality.
- Test responsive layouts and image loading before production promotion.

## Language
- English default, Persian available from the language switch.
- Persian uses RTL direction and Vazirmatn; project screenshots remain unchanged.

## Branch safety
All work belongs only in `chatgpt/monobaa-portfolio-starter-2026-11-14/monobaa-portfolio-starter/`. Never modify `main` or unrelated projects.
