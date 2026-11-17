# Decision Log

Record decisions with date, status, rationale and consequences. Supersede old decisions; do not silently erase them.

## 2026-11-17 — Isolated documentation branch
**Status:** Accepted. Create this workspace under `monument-product/` on branch `monument-product-foundation` in `Hoohaahaa/Portfolio`. Do not modify the default branch or deployed portfolio.  
**Reason:** Durable project memory without risking unrelated production work.

## 2026-11-17 — Spatial 22 candidate baseline
**Status:** Provisional. Use the READY Production deployment of `monument-spatial-22` as the lead audit candidate. Do not replace or merge other deployments until source and behavior are compared.  
**Reason:** Most complete inspected file tree and README describes Spatial 22 with V18 geometry retained.

## 2026-11-17 — Commercial positioning
**Status:** Strategic recommendation. Position Monument as a location-aware publishing, experience and campaign layer for partner platforms, not only an AR ad format.  
**Reason:** AR is a feature; B2B buyers need measurable outcomes and integration value.

## 2026-11-17 — Go to market
**Status:** Strategic recommendation. Start with one venue/tourism/retail pilot using QR/NFC/deep links; pursue large mobility/map platforms after measured proof.  
**Reason:** Partner distribution can solve reach while a compact pilot reduces integration and sales risk.

## 2026-11-17 — Privacy/geofencing
**Status:** Product constraint. No continuous location history or unsolicited background notifications in MVP. Default to foreground location use, explicit opt-in, frequency caps and aggregate reporting.  
**Reason:** Trust, mobile OS constraints and lower integration friction.

## 2026-11-17 — Studio v1 field-first authoring
**Status:** Accepted for the first usable product slice. Separate outdoor Earth-referenced surfaces from indoor marker-based experiences. Make the primary workflow location → surface → content → preview → field test.  
**Reason:** The user needs to place a real surface, inspect its bearing/range/apparent size and test it with a phone before adding enterprise administration, campaigns or partner SDKs.

## 2026-11-17 — Local-first preview while backend is isolated
**Status:** Accepted as a temporary preview mode. Save drafts in browser localStorage when DATABASE_URL is not connected. No cross-device sync or public publishing is implied.  
**Reason:** Allow safe UX and field-flow validation without pointing a preview deployment at production data.

## 2026-11-17 — Field Test is not geospatial AR
**Status:** Accepted constraint. GPS/compass field test is a rough alignment instrument only. Indoor QR is 2D marker tracking; WebXR local placement is session-scoped.  
**Reason:** Browser GPS, compass and camera projections are not stable enough to claim a persistent world anchor, terrain occlusion or survey-grade placement. A native geospatial anchor/VPS strategy is a later milestone.

## 2026-11-17 — Production safety during preview setup
**Status:** Accepted. No existing production Vercel project, deployment, Neon main branch or repository default branch was changed. Use an isolated Neon QA branch and a separate Vercel preview project.  
**Reason:** Avoid accidental test writes or incomplete UI releases against the live service.

## 2026-11-17 — Studio v1 deployment
**Status:** Accepted. Deploy the Studio v1 feature branch to the dedicated Vercel project `monument-studio-preview`; keep the older `monument-spatial-22` project and its deployment untouched. The dedicated project's first deployment is READY at https://monument-studio-preview.vercel.app and was built from `monument-studio-v1` commit `8377f90d255a33fdf9baef641f63a38e0a221fac`.  
**Environment caveat:** Vercel reports the deployment target as `production` within the isolated project named `monument-studio-preview`. This is not a Preview-environment deployment and must not be confused with the separate Monument production baseline.  
**Reason:** Restore a live phone-testable build while protecting the existing production deployment and data.

## 2026-11-17 — Field Test selection and progressive disclosure
**Status:** Accepted. Field Test must let the user select among saved experiences of the same spatial type. Keep the target image/content visible in the scene; keep technical telemetry, manual heading and FOV controls inside a collapsed diagnostics panel by default.  
**Reason:** The first phone test showed that telemetry crowded the screen and obscured the actual experience. The scene and content must remain the primary focus.

## 2026-11-17 — Portfolio-aligned primary accent
**Status:** Accepted. Use the portfolio landing page's vivid orange `#ff573d` as Monument Studio's primary accent, with neutral charcoal and warm-paper surfaces. Avoid the previous green/lime primary theme unless the user explicitly requests another direction.  
**Reason:** Keep a coherent, recognizable visual language across the user's projects while preserving flexibility for project-specific exceptions.
