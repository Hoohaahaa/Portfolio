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


## Studio v1 implementation checkpoint — 2026-11-17

### Source recovery
The referenced source branch exists: Hoohaahaa/Portfolio, branch monument/main, base commit b6041834dda59303d5eb4575db5d22c73e36e18a. This resolves the earlier path-not-found discrepancy. Vercel deployment metadata still does not prove that the deployed Spatial 22 artifact was built from this exact commit; keep that distinction explicit.

### Implementation branch
- Feature branch: monument-studio-v1
- Draft PR against monument/main: https://github.com/Hoohaahaa/Portfolio/pull/3
- Latest branch commit at handoff: 8377f90d255a33fdf9baef641f63a38e0a221fac
- New files/major changes: field.js, Studio home flow, quick location presets, field-test route, separate field QR, local-first drafts, card-based design system, updated service-worker cache and build checks.
- Product flow: choose outdoor/indoor → place surface → add content → save/preview → field test.
- Outdoor field test uses foreground GPS + device compass when available + manual heading + estimated camera FOV to show target bearing, range and apparent width as the observer moves.
- Indoor route explicitly distinguishes QR 2D marker tracking and temporary WebXR session placement.

### Validation
- Node 24 npm run build: passed.
- npm test: 13 passed, 0 failed.
- Local mobile-browser smoke test: create outdoor surface, choose Golpayegan, enter content, open camera-test overlay, save locally, open direct field route, return to preview and collection.
- No real-device camera/GPS/compass test has been performed.
- No Neon live verification or authenticated browser E2E has been performed.

### Honest limitations
- Field Test is a GPS/compass projection instrument, not persistent geospatial AR. No VPS/ARCore Geospatial anchor, phone-pitch calibration, camera-intrinsics calibration, terrain occlusion or survey-grade vertical alignment.
- Indoor QR is 2D tracking; WebXR local placement is session-scoped and may drift.
- Local-first mode stores drafts in the same browser's localStorage; no cross-device sync, permanent public link or shared QR until backend storage is connected.
- A Neon branch named monument-studio-preview was created for isolated QA. It is a copy-on-write branch of the existing Neon main branch; it has not been connected to Vercel or used for test writes.
- A separate Vercel project monument-studio-preview exists (prj_TAMIGx67fj1D1nzyVIpMRWdby3tA), Node 24, no environment variables, SSO disabled. No deployment exists yet.

### Deployment blocker
The first Vercel deployment API request was rejected with 402 payment_required, code api-deployments-free-per-day, retry after 24 hours. The CLI fallback was installed in a Vercel sandbox but vercel whoami reported Logged out. No deployment or production project was changed. Do not claim a preview URL until an actual deployment is READY.

### Next exact actions
1. Keep PR #3 draft; do not merge without review.
2. After the daily Vercel deployment quota resets, deploy branch monument-studio-v1 to project monument-studio-preview. If using CLI, authenticate in the user's own Vercel CLI session; do not request or paste an API token into chat.
3. Add the isolated Neon QA connection to the preview project's Preview environment only, then run npm run verify:live and node tests/browser.cjs against that QA branch, never production.
4. Open the preview on a real Android device and test camera, GPS accuracy, absolute compass heading, manual calibration, movement toward/away from a target and permission denial.
5. Only after field QA, plan true geospatial registration (ARCore Geospatial/VPS or equivalent native host SDK) and calibrated indoor anchors.
6. Keep product/admin, payments, campaign marketplace and partner SDK behind a reliable place/content/field-test workflow.
