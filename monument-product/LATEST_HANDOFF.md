# Latest Handoff — 2026-11-17

## Current checkpoint

Monument now has a durable product documentation workspace and a working Studio v1 preview deployment.

- Repository: https://github.com/Hoohaahaa/Portfolio
- Product docs branch: `monument-product-foundation`
- Product docs PR: https://github.com/Hoohaahaa/Portfolio/pull/2 (draft; not merged)
- Studio implementation branch: `monument-studio-v1`
- Studio implementation PR: https://github.com/Hoohaahaa/Portfolio/pull/3 (draft; not merged)
- Base application branch: `monument/main`
- Studio branch commit: `8377f90d255a33fdf9baef641f63a38e0a221fac`

The documentation workspace contains nine files:
- `README.md`
- `VISION_AND_OPPORTUNITIES.md`
- `PROJECT_CONTEXT.md`
- `TECHNICAL_AUDIT.md`
- `PRODUCT_STRATEGY.md`
- `ROADMAP.md`
- `DECISION_LOG.md`
- `LATEST_HANDOFF.md`
- `FEATURE_TEMPLATE.md`

The vision/opportunity document consolidates the product north star, Places/Campaigns/Infrastructure architecture, first user workflow, customer and channel opportunities, monetization ladder, deferred payment direction, design principles, privacy constraints and implementation truth boundaries. It is a structured consolidation of context recovered so far, not a verbatim archive of every chat.

## Latest Studio deployment — successful

- Vercel project: `monument-studio-preview`
- Project ID: `prj_TAMIGx67fj1D1nzyVIpMRWdby3tA`
- Deployment ID: `dpl_6xGM1Cr5ZEeCphbCcECu2aDrayCZ`
- URL: https://monument-studio-preview.vercel.app
- State: READY
- HTTP check: 200 OK
- Source: `Hoohaahaa/Portfolio`, branch `monument-studio-v1`
- Commit: `8377f90d255a33fdf9baef641f63a38e0a221fac`
- Build: passed
- Tests: 13 passed, 0 failed
- Build log confirms Vercel cloned the requested Git branch and commit.

**Environment naming caveat:** Vercel reports this deployment target as `production` inside the dedicated project named `monument-studio-preview`. It is not a Preview-environment deployment. The project is separate from the older Monument production project, has its own domain, and no existing production project/deployment was changed. Keep this distinction explicit.

The new project has Node 24, SSO protection disabled for device testing, and no environment variables configured. No Neon database is connected. The deployed Studio therefore operates in local-first mode: drafts remain in the same browser/device; cross-device sync, permanent public publishing and account persistence are not enabled by this deployment.

## Studio v1 implementation

Implemented on `monument-studio-v1`:
- guided Studio workflow and outdoor/indoor separation;
- map/location presets and surface/content setup;
- local-first drafts and preview;
- foreground camera, GPS, compass/manual-heading field instrument;
- separate field-test route and QR;
- responsive card-based UI and service-worker updates.

### Validation evidence
- Node 24 build passed.
- 13 automated tests passed, 0 failed.
- Vercel build passed and deployment is READY.
- Deployment root returned HTTP 200 and served the expected Monument app shell.

### Not yet validated
- Real Android/iOS camera, GPS and compass behavior.
- Actual camera/heading calibration and movement tests on a physical device.
- Live database publishing, auth and cross-device sync.
- Browser E2E against the isolated QA database.
- Persistent geospatial anchoring and repeatable indoor anchors.

### Accuracy boundary
The outdoor Field Test is a GPS/compass projection instrument, not persistent geospatial AR. It does not yet provide VPS/ARCore Geospatial anchoring, calibrated camera intrinsics, phone-pitch calibration, terrain occlusion or survey-grade vertical alignment. Indoor QR remains 2D; WebXR local placement is session-scoped and may drift.

## Data and production safety

- Neon QA branch `monument-studio-preview` exists as a copy-on-write branch from Neon main.
- It has not been connected to Vercel or used for test writes.
- Do not point the Studio project at production `DATABASE_URL`.
- If backend verification is next, connect only the isolated Neon QA branch to the dedicated Studio project’s Preview environment (or another explicitly isolated environment), verify the branch identity, then run live tests.
- Never expose secrets, run migrations against an unknown database, or change existing Monument production projects while testing.

## Earlier candidate production baseline

- Project: `monument-spatial-22`
- URL: https://monument-spatial-22.vercel.app
- Latest previously observed deployment: `dpl_AShnjXbq6afJxE7bevzcyzqZ4sAB`, READY.
- This remains a separate candidate baseline. Do not assume it was built from the current Git branch or replace it without source and behavior comparison.

## Product direction to preserve

- North star: Monument is the spatial layer for the real world, not merely an AR ad app.
- Product surfaces: Monument Places, Monument Campaigns and Monument Infrastructure.
- Start with one venue/destination pilot and useful QR/NFC/deep-link/foreground experiences; prove value before scaling.
- Partner distribution (maps, mobility, travel and tourism apps) is strategically important, but large platforms are not dependencies for the first pilot.
- Admin/enterprise controls are deferred from the first usable flow but should be anticipated in the architecture.
- Iranian and international payment paths, including crypto options, are future considerations only; payment implementation is deferred and requires separate legal/compliance/provider validation.
- Monument should also be represented as an AI-built product case study in the user's portfolio, with shipped features clearly separated from roadmap hypotheses.

## Next exact actions

1. Open https://monument-studio-preview.vercel.app on the user's Android phone.
2. Test camera permission, GPS accuracy, compass heading, manual heading, target bearing and movement closer/farther.
3. Record device model, browser, permission behavior and observed errors—do not infer accuracy from desktop tests.
4. Decide whether to connect the isolated Neon QA branch; never use production credentials for this.
5. Run browser/live tests against QA and document the results.
6. Continue the Vercel project audit and classify the other Monument projects before selecting a canonical production baseline.
7. Keep PR #2 and PR #3 draft until reviewed; do not merge or change production without an explicit release decision.

## Rules for next chat

Read `README.md`, then `VISION_AND_OPPORTUNITIES.md`, `PROJECT_CONTEXT.md`, `TECHNICAL_AUDIT.md`, `PRODUCT_STRATEGY.md`, `ROADMAP.md`, `DECISION_LOG.md` and this handoff. Verify current Git/Vercel/Neon state before continuing. Make scoped changes on feature branches. After every session, update this handoff with changed files, commit/deployment IDs, test evidence, known issues and the exact next step.
