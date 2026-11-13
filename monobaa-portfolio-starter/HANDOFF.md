# MONOBAA — Design & Development Handoff

## Objective
Continue the MONOBAA portfolio starter as a real, production-ready portfolio. The supplied starter is a visual and interaction baseline, not the finished portfolio.

## Creative direction
Spatial editorial / Swiss typography / experimental digital design.
- Cinematic near-black background, high-contrast white typography and restrained accents.
- Oversized typography, visible grid logic, deliberate negative space.
- Floating and overlapping interface compositions with different scales, depths and angles.
- Editorial metadata, precise alignment, subtle parallax and considered transitions.
- The work is primarily digital interfaces. Do not invent saturated artwork to compensate for restrained source imagery.

## Visual benchmark
Use the supplied reference images from the original conversation as the visual benchmark. The most important reference is the dark composition with oversized MONOBAA typography and layered interface screenshots. Preserve its scale, composition and visual hierarchy rather than reducing it to generic portfolio cards.

## Project order — preserve exactly
1. Pinket
2. Pulse Check
3. VEBLEN
4. FIELD
5. Rastar (Humaani)
6. Mirana / JobVision
7. Iran Unseen
8. Entity
9. ATS Dashboard

Do not add Vesperine or Paxia.

## Known project details
- Pinket: digital commerce/product ecosystem. Include dashboard, Customer App and Shopper App. Team of 2 designers. January 2022–June 2023.
- Pulse Check: interface-focused product; prioritize reports, data visualization and heatmap screens. Team of 2; user handled most design execution, teammate contributed feedback.
- VEBLEN: experimental digital experience; emphasize parametric visuals, interactive elements and WebGL.
- FIELD: interactive creative technology project. Include Instrument and main FIELD experience. References: https://monomatter.dev/field/instrument and https://monomatter.dev/field
- Rastar (also referred to as Humaani): user was lead designer. Emphasize architecture, AI workflows and product interaction. May–September 2025.
- Mirana / JobVision: product associated with JobVision. Reference: https://mirana.ir. November 2023–April 2025.
- Iran Unseen: AI-powered interactive experience.
- Entity: AI-driven visual and interactive experience. Clearly distinguish implemented functionality from concepts or unfinished features; do not claim broken detection works.
- ATS Dashboard: interface/product case study using actual supplied screens.

## Asset rules
- Audit all original images and documents before designing.
- Associate each image with the correct project and group related screens.
- Remove duplicates from presentation, never overwrite originals.
- Never stretch screenshots or replace them with generated mockups.
- Preserve interface details; provide click-to-zoom/lightbox.
- Use carousels for image-heavy mobile galleries.
- Real project assets must replace all CSS mockups/placeholders in this starter.

## Homepage structure
1. Hero: oversized MONOBAA typography, dark cinematic environment, editorial metadata, project imagery layered with typography.
2. Spatial project archive: floating screenshot compositions, varied scales and angles, natural density, subtle mouse parallax, touch-friendly mobile behavior and project navigation.
3. About / practice: concise statement of product design, interaction and creative technology.
4. Case studies: each project gets a distinct layout, not a repeated template.

## Case-study structure
Project introduction; concise context; main visual; interface gallery; important flows; selected design details; verified role/team/dates; links and credits where available. Images should tell most of the story. Never fabricate metrics, research findings, features, business outcomes or responsibilities.

## Motion / technology preferences
- GSAP + ScrollTrigger for primary motion.
- Three.js / WebGL only where it materially improves spatial or experimental presentation.
- Lenis only if compatible with the rest of the interaction system.
- React is acceptable for the production implementation.
- Avoid duplicating animation responsibilities across libraries.
Motion should be sophisticated but restrained; performance and usability take priority over spectacle.

## Responsive requirements
Desktop can use layered compositions, pointer interaction and immersive layouts.
Mobile must be intentionally redesigned: touch-friendly navigation, carousels for large galleries, readable hierarchy, correct image ratios, no hover-only functionality and lightweight motion.

## Implementation phases
1. Asset audit and project mapping.
2. Lock homepage composition, typography, grid and color rules.
3. Implement hero and spatial archive.
4. Build individual case studies using real assets.
5. Add interactions and responsive behavior.
6. Test accessibility, loading and performance.
7. Deploy a working public portfolio.

## Current starter status
- `index.html` is a self-contained HTML/CSS/JS prototype with no build dependencies.
- Hero, spatial placeholder cards, pointer movement, modal navigation, project archive and responsive styling are included.
- The cards and project modal previews are CSS placeholders, not actual project screenshots or complete case studies.
- Replace placeholder content with verified project assets and details before publication.

## Non-negotiable principle
Editorial in structure. Spatial in presentation. Precise in execution. The user's actual work must remain the hero.
