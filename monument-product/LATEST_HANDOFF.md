# Latest Handoff — 2026-11-17

## Current checkpoint
Documentation workspace created and verified on branch `monument-product-foundation` in `Hoohaahaa/Portfolio`. Draft PR: https://github.com/Hoohaahaa/Portfolio/pull/2. Eight documentation files. No production application code, Vercel project, Neon database or default Git branch was changed.

## Candidate deployment
- Project: `monument-spatial-22`
- URL: https://monument-spatial-22.vercel.app
- Latest observed deployment: `dpl_AShnjXbq6afJxE7bevzcyzqZ4sAB`
- State: READY
- Other relevant projects: `monument-spatial-lab`, `monument-city-21`, `monument-world-20`, `monument-spatial-qa-19`, `monument-spatial-publishing-12`.

## Inspected evidence
- Project metadata and deployment records for seven Vercel projects.
- Complete Spatial 22 file path listing: 43 entries, no truncation.
- README, package metadata, parts of works API, spatial geometry, XR module and SQL migration. Several large source-file responses were truncated; full code audit remains outstanding.
- README describes Spatial 22 retaining accepted V18 local Sky geometry.
- Works API schema includes advertisement content type and geospatial fields. This is not proof of a complete ad campaign feature.
- Production environment variable names include `DATABASE_URL` and `PUBLISH_SECRET`; secret values were not requested or recorded.

## Source discrepancy
Deployment README references `Hoohaahaa/Portfolio/tree/monument/main`, but the referenced path did not resolve in the inspected repository. Vercel Git context lists only mo-portfolio, mono-ln1f, vesperine and paxia as Git-linked projects; no Monument project is listed. Deployment metadata did not expose Git source metadata. Therefore the deployed source is not yet reproducibly tied to a known repository/commit. Recover or identify the authoritative source before development.

## Next actions
1. Inspect each Monument Vercel project's Git settings/source commit and classify all 19 projects.
2. Resolve canonical source and record repository/path/commit here.
3. Compare Spatial 22 with Spatial Lab, City 21, World 20 and Publishing 12; preserve all originals.
4. Build clean QA environment and run tests. Never run verification against unknown production DB.
5. Smoke-test map, place discovery, QR/deep link, publishing, AR/XR fallback, auth and mobile behavior.
6. Conduct 5–10 buyer interviews before selecting first vertical.
7. Prototype one venue pilot and measurement dashboard before background geofencing or SDK.

## Rules for next chat
Read this file, then README, PROJECT_CONTEXT, TECHNICAL_AUDIT, PRODUCT_STRATEGY and ROADMAP. Verify live Git/Vercel state. Make one scoped change on a feature branch. Update this handoff with changed files, commit/deployment IDs, tests, known issues and exact next step.
