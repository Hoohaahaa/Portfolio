# MONUMENT / Spatial Studio v1

This feature branch is based on the canonical source branch `monument/main` and does not modify that branch, the repository default branch, the existing Monument production projects or the portfolio website.

## What this iteration adds

- A guided Studio start screen with separate outdoor and indoor creation paths.
- Outdoor location presets for Tehran, Khomein, Golpayegan, Isfahan, Aligudarz and Mahallat.
- Map-first placement with editable coordinates, surface dimensions and orientation.
- A local-first authoring mode when no publishing database is connected. Drafts are stored in this browser on this device; they can be reopened and previewed locally.
- A phone Field Test using the rear camera, foreground GPS, device compass when available, adjustable manual heading and an estimated camera field of view. The projected surface changes horizontal bearing and apparent width as the observer moves.
- A dedicated `/field/:id` route and a separate QR/link for the field test once a record is published by a connected backend.
- Indoor guidance that keeps the QR marker and session-local XR flows separate from outdoor GPS/compass testing.
- A rounded, card-based design system with shared spacing, surface, border, typography and mobile-responsive rules.

## Important distinction: field test is not yet geospatial AR

The outdoor field view is a **GPS/compass alignment instrument**, not a persistent world anchor. It estimates target bearing, distance and apparent width. It does not yet calibrate device pitch, camera intrinsics, terrain line-of-sight, atmospheric refraction or vertical datum; it has no VPS/ARCore Geospatial anchor and no occlusion. Use it to validate location, facing, range and rough screen placement in the field, not as proof of survey-grade registration.

Indoor mode uses the printed QR as a repeatable 2D marker. The existing WebXR local placement remains session-scoped and may drift. It is not a persistent 3D room anchor.

## Local-first preview mode

When `DATABASE_URL` is not configured, account APIs remain unavailable and Studio switches to local mode:
- `Save locally` and `Save & preview` store drafts in browser `localStorage`.
- The collection, editor, visitor preview and field test work on that same device/browser.
- Local drafts do not sync, do not create public links, and cannot be opened on a different device. Clearing browser data can remove them.
- A connected Neon QA database is required before account-based publishing, permanent URLs, revisions and cross-device access can be tested.

No production database is connected to the preview project. A separate Neon branch `monument-studio-preview` was created for isolated QA, but it has not been connected to Vercel or used for live verification.

## Run and verify

Node 24+, `npm ci`, `npm run build`, `npm test`, `npm start`. The current checked-in Vercel build command runs syntax/build checks and the 13 unit tests. The live Neon verification and browser E2E scripts remain opt-in because they write QA records and require an isolated database.

Latest local verification on Node 24:
- Build: passed.
- Unit tests: 13 passed, 0 failed.
- Real-device camera/GPS/compass QA: not yet performed.
- Browser E2E against Neon: not run in this local-only preview.

## Deployment checkpoint

A separate Vercel project `monument-studio-preview` was created with Node 24, no production environment variables and deployment protection disabled for easy phone testing. Its project ID is `prj_TAMIGx67fj1D1nzyVIpMRWdby3tA`. The deployment API rejected the first deployment request because the team reached its daily deployment API quota (`402 api-deployments-free-per-day`, retry after 24 hours). The Vercel CLI fallback was checked but is logged out in the isolated build environment. Therefore **there is no deployed preview URL yet**. No existing production deployment was changed.

## Existing architecture and limits retained

`api/auth.js`: salted scrypt password hashes, hashed recovery codes, random hashed server-side sessions, HttpOnly/Secure/SameSite cookie, origin checks and request limits. `api/registry.js`: owner checks, separate draft/public snapshots, optimistic concurrency, revision audit and schedule enforcement. `spatial.js`: spherical geodesy and apparent geometry. `xr.js`: V18 local session geometry. `marker.js`: 2D QR marker camera. `field.js`: foreground GPS/compass field test.

Do not run `npm run verify:live` or migrations against an unknown or production database. Never expose `DATABASE_URL`, `PUBLISH_SECRET`, session tokens or recovery codes. Keep the old Vercel deployments as rollback references.
