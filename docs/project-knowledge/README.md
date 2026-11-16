# Portfolio Project Knowledge Base

Last updated: 2026-11-16

This directory is the durable source of truth for portfolio case studies. It exists so project context, design decisions, evidence, caveats and future corrections do not depend on a single ChatGPT conversation.

## How to maintain this

1. Update the relevant project file when new facts, screenshots, analytics or corrections arrive.
2. Keep **confirmed facts**, **personal recollections**, **public/context sources** and **unknowns** separate.
3. Never turn an estimate into a verified metric. Keep the definition and confidence beside every number.
4. Do not claim a business outcome caused by design unless there is evidence for attribution.
5. Update `mono-assets/manifest.json` only after the source-of-truth record is updated.
6. Preserve scope boundaries. In particular, do not imply ownership of product areas the designer did not design.

## Project index

| Project | Record | Current evidence position |
|---|---|---|
| Veblen | [veblen.md](./veblen.md) | Technical checks documented; independent concept, not production deployment |
| Pulse Check | [pulse-check.md](./pulse-check.md) | Shipped production product; product capabilities documented, demo metrics are not outcomes |
| Iran Unseen | [iran-unseen.md](./iran-unseen.md) | Implemented and usable capabilities; no confirmed usage metrics |
| Jobvision ATS | [jobvision-ats.md](./jobvision-ats.md) | Direct HR feedback and qualitative analytics recollection; no exact uplift figures |
| Humaani | [humaani.md](./humaani.md) | Confirmed scope indicators: 4 months, 2 languages, web + mobile, one design system |
| Mirana | [mirana.md](./mirana.md) | Candidate-side design scope confirmed; no exact traffic or hiring metrics |
| Pinket | [pinket.md](./pinket.md) | Broad multi-sided design scope; 300–1,000 monthly users is a retrospective estimate |

## Portfolio-wide writing rules

- Write the public-facing case studies in concise, premium editorial English. Conversation and working notes may remain Persian.
- Explain the problem, evidence, rejected directions, design decision, validation and outcome where known.
- Do not force every project into the same numerical impact-card template.
- Prefer project-specific evidence: technical validation for Veblen, a closed-loop product model for Pulse Check, implemented capabilities for Iran Unseen, observed HR feedback for ATS, verified scope for Humaani, candidate journey for Mirana, and marketplace context for Pinket.
- Never claim that all of a product was designed when the confirmed scope was narrower.
- Dates attached to an employment period are not automatically exact project dates.
- Use sample/demo UI values only as examples, never as real company results.

## Current working branch

`chatgpt/mo-shahmohamadi-profile-2026-11-16`

The default/main branch has not been intentionally modified as part of this work.
