# Roadmap and Release Gates

_Status: planning baseline, not delivery-date commitment._

## Phase 0 — Establish the truth
- [ ] Identify canonical source repository and exact commit.
- [ ] Compare all Monument Vercel projects; classify production, QA, experiment and obsolete.
- [ ] Export source and create a reproducible local build.
- [ ] Confirm Neon project/branch/schema without exposing credentials.
- [ ] Run tests against a disposable QA database.
- [ ] Test real Android and iOS browser journeys.
**Exit gate:** reproducible source, known production baseline, test report and rollback plan.

## Phase 1 — Reliable spatial publishing MVP
- [ ] Organizations/workspaces and roles.
- [ ] Publisher dashboard: create, preview, draft, publish, schedule, pause, archive.
- [ ] Place/geofence editor with radius and polygon.
- [ ] Content/media validation and localization.
- [ ] Public experience with map, AR/XR and 2D fallback.
- [ ] QR/NFC/deep links.
- [ ] Revision history, conflict handling and audit log.
- [ ] Privacy notice, permission rationale, delete/export.
**Exit gate:** one venue can publish/update 10+ points without developer intervention.

## Phase 2 — Paid venue pilot
- [ ] Offers with start/end, CTA, budget and frequency cap.
- [ ] Impression/engagement/click/redemption event schema.
- [ ] Partner dashboard and exportable report.
- [ ] Verified venues/advertisers and creative moderation.
- [ ] Pilot onboarding/support runbook.
**Exit gate:** one paying/co-funding partner, live pilot, weekly measurement and case-study permission.

## Phase 3 — Partner integration
- [ ] Versioned REST API and sandbox.
- [ ] Scoped API keys, rotation, signatures and rate limits.
- [ ] Webhooks and conversion callbacks.
- [ ] Android SDK proof of concept; iOS feasibility/privacy review.
- [ ] Deep-link and attribution specification.
- [ ] Reliability, latency, monitoring and incident response.
**Exit gate:** one partner app integration in controlled rollout.

## Phase 4 — Campaign platform
- [ ] Campaign manager and self-serve onboarding.
- [ ] Budget pacing, inventory, frequency and category rules.
- [ ] Billing/invoicing and revenue share.
- [ ] Fraud detection and campaign audit.
- [ ] Multi-city and multi-partner analytics.
**Exit gate:** repeat campaigns and repeat revenue, not a one-off demo.

## Priority
P0 source-of-truth and QA → P1 publisher + QR/deep link → P2 measurable venue pilot → P3 partner API/SDK → P4 ad marketplace.

## Explicitly not in first release
Nationwide ad network; always-on background tracking; unsolicited push notifications; programmatic bidding; complex audience profiling; payment rails before commercial model validation.

## Studio v1 progress update — 2026-11-17

**Completed and deployed:** Guided Studio start, outdoor/indoor split, quick place presets, map-first surface editing, local draft/preview mode, GPS/compass Field Test, separate field route/QR, card-based responsive UI, service-worker shell update. Dedicated Vercel project `monument-studio-preview` is READY at https://monument-studio-preview.vercel.app from branch `monument-studio-v1`, commit `8377f90d255a33fdf9baef641f63a38e0a221fac`. Vercel build passed and 13 automated tests passed.

**Environment caveat:** Vercel labels the deployment target as `production` inside this isolated project named `monument-studio-preview`. It is separate from the older Monument production project. No existing production project was changed.

**Not yet completed:** Isolated Neon QA connection, live persistence/browser E2E, real-device camera/GPS/compass validation, cross-device publishing. Do not mark Phase 1 complete until these pass.

**Next sequence:** real Android field QA → connect isolated QA DB (never production) → live/browser verification → choose geospatial anchor technology → build durable publisher accounts, media upload, roles, audit and venue pilot controls.
