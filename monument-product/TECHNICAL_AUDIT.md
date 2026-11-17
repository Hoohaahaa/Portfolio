# Technical Audit — Candidate Deployment

_Audit date: 2026-11-17. Read-only inspection of the older candidate; no production code or data was changed._

## Candidate baseline
- Vercel project: `monument-spatial-22`
- Project ID: `prj_PmLdYwtatZGy5HuiQ92U9tTt6s0C`
- Latest observed deployment: `dpl_AShnjXbq6afJxE7bevzcyzqZ4sAB`
- State: READY, target: production
- URL: https://monument-spatial-22.vercel.app
- Preview deployments have SSO protection enabled; project metadata reports no password protection on production.
- Production environment variable names observed: `DATABASE_URL`, `PUBLISH_SECRET`. Secret values were not retrieved.

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
- Older Vercel project Node setting: 26.x; README asks for Node 24+.
- Package: `monument-spatial-publishing`, version 1.0.0.
- Dependencies: `@neondatabase/serverless`, `leaflet`, `qrcode`.
- Dev dependencies: `@sparticuz/chromium`, `playwright-core`.
- Scripts: build, test, start, verify:live.
- API routes: auth, health, QR, registry, works.
- Frontend: app, spatial geometry, XR, marker and service worker.
- SQL tables: `monument_accounts`, `monument_sessions`, `monument_registry`, `monument_revisions`.

## Git/source connection finding
The Vercel team Git context previously listed four linked projects: `mo-portfolio` → `Hoohaahaa/Portfolio`, `mono-ln1f` → `Hoohaahaa/mono`, `vesperine` → `Hoohaahaa/vesperine`, and `paxia` → `Hoohaahaa/paxia`. No older Monument project appeared in this linked-project list. The inspected Spatial 22 deployment metadata also did not expose a Git source object. This suggests the older Monument deployments may have been created from uploaded source rather than a currently connected Git repository; verify in the Vercel project dashboard before concluding.

The deployment README references a canonical source path in `Hoohaahaa/Portfolio`; branch `monument/main` was subsequently confirmed to exist at commit `b6041834dda59303d5eb4575db5d22c73e36e18a`. The Studio implementation branch `monument-studio-v1` is now a reproducible working source branch. This still does not prove that older Vercel production artifacts were deployed from that exact Git commit.

## Audit limitations
Vercel file listing for the older Spatial 22 deployment was complete (43 entries), but several large source-file content responses were truncated. No claim is made that all source code has been reviewed. A deployed bundle is not a reproducible source repository.

## Safety
- Never run verify:live or migrations against an unknown database. README says live verification creates QA records and needs write access.
- Never expose DATABASE_URL, PUBLISH_SECRET, session tokens or recovery codes.
- Never delete old Vercel projects/deployments during consolidation.
- Never point production at an unreviewed branch.

## Subsequent update — Studio v1 deployment, 2026-11-17

The separate Vercel project `monument-studio-preview` is now deployed and READY:
- Project ID: `prj_TAMIGx67fj1D1nzyVIpMRWdby3tA`
- Deployment ID: `dpl_6xGM1Cr5ZEeCphbCcECu2aDrayCZ`
- URL: https://monument-studio-preview.vercel.app
- Source: `Hoohaahaa/Portfolio`, branch `monument-studio-v1`, commit `8377f90d255a33fdf9baef641f63a38e0a221fac`
- Vercel build passed; 13 tests passed; deployment root returned HTTP 200.

Vercel reports the deployment target as `production` within the isolated project named `monument-studio-preview`. This is not a Preview-environment deployment. The project is separate from `monument-spatial-22`; no older Monument production project or deployment was changed.

The new Studio project has no environment variables and no Neon connection. It currently supports local-first drafts only; shared accounts, persistent public publishing and cross-device sync are not available in this deployment. The isolated Neon QA branch exists but has not been connected or used for test writes.

Real-device camera/GPS/compass QA, authenticated browser E2E, live QA database verification and persistent geospatial anchoring remain outstanding.
