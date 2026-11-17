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
