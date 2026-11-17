# Product Strategy — From Spatial Publishing to a Commercial Platform

## Strategic thesis
Do not sell Monument first as “an AR advertising app.” Sell it as a **location-aware content and activation layer** that lets a partner turn real places into useful digital experiences and measurable actions.

AR makes the experience memorable. The buyer pays for outcomes: visits, discovery, bookings, redemptions, engagement, venue utility and campaign measurement.

## Initial customer wedge
Start narrow, with a partner that already has distribution:
1. **Venues and destination operators:** malls, cultural sites, museums, tourism districts, festivals, universities and retail spaces. They control the location and can pilot QR/NFC/short links without deep app integration.
2. **Tourism and booking platforms:** place stories, nearby experiences, offers and booking actions inside an existing trip journey.
3. **Maps/navigation:** sponsored place cards, branded routes, destination stories and opt-in arrival experiences.
4. **Mobility/delivery:** contextual offers at pickup/drop-off, waiting zones or arrival, subject to partner data access and user consent.
5. **Large brands/ad networks:** after Monument proves inventory, repeat usage, attribution and campaign lift.

Snapp, SnappTrip, Neshan and Balad are strategic integration prospects, not first customers to depend on. Their procurement, security, legal, analytics and engineering requirements are substantial.

## Recommended first pilot
A 4–6 week paid or co-funded pilot in one compact Tehran district, mall or tourism destination:
- 10–20 verified points of interest.
- 2–3 participating local businesses or one venue operator.
- One journey: QR/NFC/partner deep link → useful place-based experience → measurable action (save, navigate, redeem, book or call).
- One campaign with a clear offer and expiry.
- Partner dashboard: opens, engaged sessions, CTA clicks, redemptions and aggregate visit-lift proxy.
- Baseline/comparison group where feasible; weekly report and final review.

Do not promise “automatic notification when someone walks past” at the start. Reliable background geofencing usually needs a native app or partner SDK. A web app can validate a foreground or QR/NFC/deep-link experience, but mobile OS/browser lifecycle and permission rules make background triggers unreliable.

## Product modules
### A. Publisher workspace
Organizations, roles, create/edit/preview, draft/publish/schedule/pause/archive, place pin and polygon/geofence, content types (story, guide, offer/ad, event, menu, artwork, route, destination), media/localization, revisions, approvals and audit trail.

### B. Spatial runtime
Map and place discovery; AR/XR with 2D/map fallback; QR/NFC/deep-link entry; nearby experiences; user-controlled permission; frequency caps, quiet hours, dismiss controls; offline and accessibility support.

### C. Campaign engine
Objective and CTA; target by place/radius/polygon/time/context; budget, pacing, schedule and expiry; frequency caps; creative approval and category rules; inventory conflict handling; holdout/benchmark for lift.

### D. Partner API and SDK
Signed, scoped API keys and rotation; webhooks; Android/iOS SDK after a partner agreement; partner-controlled entry point returning eligible experience payloads; sandbox, docs, versioning, rate limits and monitoring.

### E. Measurement and trust
Events: eligible, viewed, engaged, CTA click, navigation start, redemption, booking, conversion. Add deduplication, bot/fraud filters, aggregate reporting/export, consent receipts, retention/deletion controls and campaign audit logs.

## Monetization
1. **Venue SaaS:** monthly fee per venue/location for publishing, analytics and updates. Best early recurring revenue without mass reach.
2. **Paid pilot/setup:** onboarding, content production, placement and measurement.
3. **Campaign fee:** fixed fee or CPM/CPC/CPA only once reach and measurement are reliable.
4. **White-label:** annual license for tourism operator, mall, city or platform.
5. **API/SDK:** annual platform fee plus usage tiers for map, mobility or travel partner.
6. **Revenue share:** redeemed sales or attributable bookings where conversion data is reliable.

Recommended order: paid pilot → venue SaaS/white-label → partner SDK/API → campaign marketplace. Do not rely on CPM before real distribution exists.

## Why a partner buys
Incremental conversion/visit lift; no need to build its own spatial CMS/campaign engine; safe low-friction integration; transparent attribution; brand-safe placement control; consent/privacy; pilot deployment in weeks.

## Positioning and differentiation
Do not compete with map providers on maps, routing or place data. Integrate with them. Monument owns publishing, experience, campaign orchestration and measurement; the partner owns its users and core app; the map provider owns map/navigation infrastructure.

## Sales plan
- Create a 6-slide partner brief: problem, demo, use case, integration, pilot scope, measurement/commercial model.
- Approach product partnerships, growth/ads, innovation, tourism partnerships or business development.
- Secure one sponsor, one product owner, one technical contact and one pilot location.
- Offer a paid fixed-scope pilot. If a free proof is unavoidable, cap it and agree in writing on data access and case-study permission.
- Never claim users, reach, integrations or campaign lift that have not been measured.

## Risks
- Mobile web background geofencing is not reliable enough to be the core promise; native integration may be needed.
- Precise location is sensitive: explicit opt-in, purpose limitation, minimum precision, aggregate reporting and short retention. Avoid continuous movement histories and sensitive-place targeting.
- Do not interrupt users with lock-screen notifications without host-app integration and explicit opt-in.
- Respect map/place data licenses; do not scrape or repackage partner data without permission.
- Obtain local legal/privacy review before production campaigns or cross-company location-data sharing in Iran.
