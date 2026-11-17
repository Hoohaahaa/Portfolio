# Project Context

_Last reviewed: 2026-11-17_

## Product in one sentence
Monument is a spatial publishing and location-aware experience platform: creators, venues or brands publish place-anchored digital content that people can discover in context, with a path to partner-powered location experiences and measurable campaigns.

## Confirmed from the previously identified production candidate
Vercel project `monument-spatial-22` has a READY Production deployment:
- https://monument-spatial-22.vercel.app
- Deployment: `dpl_AShnjXbq6afJxE7bevzcyzqZ4sAB`
- Project ID: `prj_PmLdYwtatZGy5HuiQ92U9tTt6s0C`
- Team ID: `team_2SpKsqKuxrHvkWLqpwYj4h2l`

Its deployment file tree contains:
- API: auth, health, QR, registry and works.
- Baselines: works V22 and XR V18.
- App, geometry, spatial, XR and marker modules.
- Model/server libraries and SQL migration.
- API, browser, geometry and model tests.
- Leaflet vendor assets and service worker.

Package metadata identifies a Node application using Neon serverless Postgres, Leaflet and QRCode; test tooling includes Playwright and Chromium.

The deployment README says this continues Spatial 22 while retaining accepted V18 local Sky geometry. It documents Node 24+, build/test/start/verify:live scripts, legacy V22 record compatibility, draft/published snapshots, stable public URLs and revision conflict protection.

The works API validation includes content types such as story, clock, artwork, menu, news and advertisement, plus geospatial fields including latitude, longitude, altitude, width, height, heading and max range. This proves the schema accepts these fields; it does not prove a complete campaign manager or ad delivery system exists.

The SQL migration defines account, session, registry and revision tables. This is evidence of persistence and publishing architecture, not proof of production security or scale readiness.

## Product hypotheses (not yet validated)
- Strong commercial direction: B2B spatial publishing infrastructure for existing apps, maps, mobility, tourism, venues and retail.
- Location-based advertising can be one content type and revenue stream, not the only product proposition.
- Partner integration/SDK is likely a stronger distribution path than acquiring a large consumer audience independently.
- QR/NFC/deep-link pilot can validate demand before native SDK or background geofencing.

## Unknowns
- Which of the Monument Vercel projects is canonical versus experiment/QA.
- End-to-end behavior of auth, AR/XR, publishing and mobile flows in the older production candidate.
- Current Neon schema/data and production migration state.
- Real mobile location permission/background behavior.
- Security, abuse controls, analytics accuracy, performance and accessibility.
- Paying customers, signed partners, reach or revenue. None is verified.

## Product principles
1. Context before interruption: useful, consented experiences; no spam.
2. Partner distribution before mass consumer acquisition.
3. One measurable pilot before a broad ad network.
4. AR is a presentation layer, not the whole value proposition.
5. Build platform capabilities once; expose through dashboard, API and SDK.
6. Privacy by design: minimum location data, on-device processing where possible, short retention and aggregate reporting.
7. Separate demo, QA and customer data.
8. For Monument Studio, use the portfolio landing page orange `#ff573d` as the primary accent, supported by warm-paper and charcoal neutrals. This is the user's preferred default visual direction across most projects unless they specify otherwise.

## 2026-11-17 implementation direction

The first usable Monument slice is a guided spatial authoring workflow: choose an outdoor or indoor context, place the surface, add content, preview, then field-test on a phone. Outdoor surfaces use geographic coordinates, orientation, width/height and a GPS/compass field instrument. Indoor experiences use QR entry and a temporary local WebXR session until a repeatable 3D indoor anchor is selected.

The working implementation is on Hoohaahaa/Portfolio branch `monument-studio-v1`, commit `0de7a37adc25564a9db670295735a126fb944351`, with draft PR #3 targeting `monument/main`. The local-first mode stores drafts in the same browser/device; it does not provide cross-device sync or permanent public publishing without a connected backend. Build and 13 unit tests pass.

Do not describe the GPS/compass field view as persistent AR. True geographic anchoring, VPS/ARCore Geospatial integration, camera calibration, phone pitch, terrain occlusion and real-device testing remain later work.

## 2026-11-17 deployment update — Studio v1 is live

A separate Vercel project now exists and has a successful deployment:
- Project: `monument-studio-preview`
- Project ID: `prj_TAMIGx67fj1D1nzyVIpMRWdby3tA`
- Deployment: `dpl_6xGM1Cr5ZEeCphbCcECu2aDrayCZ`
- URL: https://monument-studio-preview.vercel.app
- State: READY; HTTP 200 verified.
- Source: branch `monument-studio-v1`, commit `8377f90d255a33fdf9baef641f63a38e0a221fac`.
- Build passed; 13 tests passed.

Vercel labels this deployment target as `production` inside the isolated project named `monument-studio-preview`. It is separate from the older `monument-spatial-22` production project; that older project and deployment were not changed.

The new project has no environment variables and no Neon connection. The current deployed workflow is local-first only. It is suitable for UI and device field testing, not yet for shared accounts, durable public publishing or cross-device sync.

## QA resources and constraints

- Neon branch `monument-studio-preview` exists as a copy-on-write branch from Neon main. It has not been connected to Vercel or used for test writes.
- Do not use production DATABASE_URL for Studio QA.
- Real-device Android/iOS camera, GPS and compass testing is still required.
- No claim is made that the older production candidate and the Studio v1 implementation are already unified into one canonical production product.

## 2026-11-17 UX feedback update

The first user phone interaction identified three priority gaps: collection lifecycle controls, image rendering in the field scene, and Field Test information hierarchy/target selection. The latest Studio iteration adds collection deletion, image-aware collection rows, field target switching, in-scene image rendering, and progressive disclosure for diagnostics. The latest Preview deployment is documented in `LATEST_HANDOFF.md`; use its unique Preview URL rather than assuming the stable project-root URL has the latest code.
