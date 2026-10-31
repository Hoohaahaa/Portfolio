# MONUMENT

Canonical source: https://github.com/Hoohaahaa/Portfolio/tree/monument/main . This isolated branch does not modify the repository default branch or PRODUCT / ZERO branches.

Canonical continuation of Spatial 22, with the accepted V18 local Sky geometry retained. Production project: `prj_PmLdYwtatZGy5HuiQ92U9tTt6s0C`. Neon project: `dry-bread-48106461`.

## Run

Node 24+, `npm ci`, `npm test`, `npm run build`, `npm start`. Supply `DATABASE_URL` in the process environment for accounts and persistence. Apply `migration.sql` additively before deploying. Existing V22 records remain readable through the legacy API. They are not automatically assigned to new accounts.

`npm run verify:live` creates labeled QA records in the configured database and verifies the real handlers. `node tests/browser.cjs` verifies the mobile browser journey against that database. Both require write access; neither deletes existing records. Do not run these against an unrelated database. Verification accounts have random credentials, and are not customer accounts.

## Owner workflow

Create an account with a password of at least 12 characters. Store the one-time recovery code in a password manager. Create a Landscape or Venue work, save a draft, publish, copy the permanent URL or download its QR. Draft edits do not alter the published snapshot. Republish to update the same URL. Revision conflicts prevent overwriting another session's changes.

## Architecture and security

`api/auth.js`: salted scrypt password hashes, hashed recovery codes, random hashed server-side sessions, HttpOnly/Secure/SameSite cookie, origin checks, persistent request limits. Recovery invalidates existing sessions. `api/registry.js`: ownership checks, separate draft/public snapshots, optimistic concurrency, revision audit in a single SQL statement, validated content/media URLs, schedule enforcement. CSP, no client database credentials, no public source, no location uploads. Remote media are user-supplied HTTPS links, not proxied or uploaded. No payment processing or third-party AI calls.

## Honest limits

- Landscape uses a real terrain-contour tile map, draggable position and orientation, spherical geodesy, projected width and curvature. It does not sample a terrain elevation model along the sightline. MSL/ellipsoid mismatch is labeled. GPS and city-height uncertainty is explicit.
- Landscape does not draw an unregistered camera overlay. Accurate geographic AR and field readability remain unverified.
- V18 `computeAnchor` and `vertices` are preserved in `xr.js`. The rejected screen-fixed camera-composite fallback is removed. This is session-local AR, not persistent geographic registration. No occlusion. Baseline source is retained in `baseline/xr-v18.js`.
- Venue QR camera mode tracks the exact QR in 2D. It is not a calibrated 3D exhibit anchor. Unsupported QR detection or camera denial leaves useful content accessible.
- Offline explicitly saves published text/menu on a previously connected device. Shell assets are cached. Images/audio/map tiles are not downloaded. Browser storage can be evicted. Revocation cannot recall already downloaded copies; expiry is checked against the device clock.
- A standalone HTML reading copy can also be downloaded and transferred offline. It labels its snapshot time and blocks expired content using the device clock; it cannot receive corrections or revocations.
- First-time offline visitors without a downloaded copy require a locally operated server and local network. A city-wide resilient deployment additionally needs power, hardware, connectivity/backhaul and operational ownership. This release does not provision that infrastructure.
- Source credits are required for news/sponsored publication. There is no autonomous news collector or fact-checking claim. No translation is generated automatically.
- Accounts have no email verification, MFA or administrative moderation console. This is a controlled pilot, not an unrestricted high-volume public publishing service.

## Release

Use the same Vercel project. The checked-in build command gates publication on build, unit checks, live persistence checks, and mobile browser E2E. Preserve the prior deployment ID as a rollback point. A new release should update the service-worker shell version. Secrets must remain in Vercel environment variables, never in source or test output.
