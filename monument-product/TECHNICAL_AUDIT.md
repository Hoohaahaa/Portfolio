# Technical Audit — Candidate Deployment

_Audit date: 2026-11-17. Read-only inspection; no production code or data was changed._

## Candidate baseline
- Vercel project: `monument-spatial-22`
- Project ID: `prj_PmLdYwtatZGy5HuiQ92U9tTt6s0C`
- Latest observed deployment: `dpl_AShnjXbq6afJxE7bevzcyzqZ4sAB`
- State: READY, target: production
- URL: https://monument-spatial-22.vercel.app
- Preview deployments have SSO protection enabled; project metadata reports no password protection on production.

## Other Monument projects discovered
Vercel search returned 19 projects. Relevant names:
- `monument-spatial-lab` — latest deployment READY
- `monument-spatial-22` — latest deployment READY; candidate baseline
- `monument-city-21`, `monument-world-20`, `monument-spatial-qa-19`, `monument-spatial-publishing-12`
- `monument-spatial-experience-18`, `17`, `16`, `15`, `14`, `13`
- `monument-spatial-studio-10`, `09`
- `monument-ar-diagnostics`, `monument-ar-tracking-probe`
- `monument-sky-presence`, `monument-sky-composer`, `monument-art-direction-lab`

READY means Vercel completed a deployment; it is not a functional QA pass or proof that it is the latest product direction.

## Runtime and code clues
- Vercel project Node setting: 26.x; README asks for Node 24+.
- Package: `monument-spatial-publishing`, version 1.0.0.
- Dependencies: `@neondatabase/serverless`, `leaflet`, `qrcode`.
- Dev dependencies: `@sparticuz/chromium`, `playwright-core`.
- Scripts: build, test, start, verify:live.
- API routes: auth, health, QR, registry, works.
- Frontend: app, spatial geometry, XR, marker and service worker.
- SQL tables: `monument_accounts`, `monument_sessions`, `monument_registry`, `monument_revisions`.

## Audit limitations
Vercel file listing was complete (43 entries), but several large source-file content responses were truncated. No claim is made that all source code has been reviewed. The deployment README references a canonical source path in `Hoohaahaa/Portfolio`, but the referenced subpath did not resolve in the inspected repository tree. A deployed bundle is not a reproducible source repository.

## Next technical actions
1. Inspect Git connection, source commit, production domain and env-var names for all Monument projects. Never print secret values.
2. Identify authoritative source repository/commit and resolve README path discrepancy.
3. Export source into a clean, version-controlled location without replacing current production.
4. Run tests against a disposable QA database.
5. Smoke-test account, login, draft, publish, update, QR/deep link, map, AR/XR entry and mobile browser.
6. Review auth/session security, ownership checks, publish secret handling, rate limits, XSS, abuse/reporting and retention.
7. Verify geolocation on real Android/iOS devices. Do not assume a mobile browser reliably delivers background geofence notifications.
8. Only then mark a release candidate.

## Safety
- Never run verify:live or migrations against an unknown database. README says live verification creates QA records and needs write access.
- Never expose DATABASE_URL, PUBLISH_SECRET, session tokens or recovery codes.
- Never delete old Vercel projects/deployments during consolidation.
- Never point production at an unreviewed branch.
