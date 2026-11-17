# Project Context

_Last reviewed: 2026-11-17_

## Product in one sentence
Monument is a spatial publishing and location-aware experience platform: creators, venues or brands publish place-anchored digital content that people can discover in context, with a path to partner-powered location experiences and measurable campaigns.

## Confirmed from the currently identified deployment
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
- Which of the 19 Monument Vercel projects is canonical versus experiment/QA.
- Exact source repository, Git connection and commit. The deployment README references a Portfolio path that did not resolve in the inspected repository tree.
- End-to-end behavior of auth, AR/XR, publishing and mobile flows.
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


## 2026-11-17 implementation direction

The first usable Monument slice is now defined as a guided spatial authoring workflow: choose an outdoor or indoor context, place the surface, add content, preview, then field-test on a phone. Outdoor surfaces use geographic coordinates, orientation, width/height and a GPS/compass field instrument. Indoor experiences use QR entry and a temporary local WebXR session until a repeatable 3D indoor anchor is selected.

The working implementation is on Hoohaahaa/Portfolio branch monument-studio-v1 with draft PR #3 targeting monument/main. The local-first mode is a temporary safe preview: browser-local drafts only, no account sync or public publishing without a connected QA backend. Build and 13 unit tests pass on Node 24.

Do not describe the GPS/compass field view as persistent AR. True geographic anchoring, VPS/ARCore Geospatial integration, camera calibration, phone pitch, terrain occlusion and real-device testing remain later work. See LATEST_HANDOFF.md for the current Vercel deployment quota blocker and exact next steps.
