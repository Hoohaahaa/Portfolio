# Monument — Vision, Product Scope & Opportunity Map

_Last consolidated: 2026-11-17_
_Status: living product brief. This document distinguishes user-stated direction, strategic hypotheses, implementation evidence and open questions. It is not a transcript of every conversation._

## 1. North star

**Monument is the spatial layer for the real world.**

It gives places a programmable digital layer: people and organizations can publish useful, location-aware experiences attached to real places, surfaces and contexts. Visitors discover those experiences in the right place and moment; venue operators and platform partners can manage, distribute and measure them.

Do not reduce Monument to an AR advertising app. AR is one presentation mode. The larger product is spatial publishing, experience delivery, partner infrastructure and—when distribution and measurement are proven—campaign activation.

## 2. Product thesis

The real-world environment is a distribution and interaction surface that most digital products do not manage well. Monument can provide a reusable system for:
- defining places, areas and physical surfaces;
- attaching structured digital content and actions to them;
- publishing and updating those experiences;
- making them discoverable through maps, camera views, QR/NFC and partner apps;
- measuring useful interactions without building invasive location histories.

**Value by stakeholder**
- Visitors: useful context, stories, directions, offers and interactions—not unsolicited interruptions.
- Venues and destinations: a simple way to publish, update and measure a digital layer across their physical space.
- Brands and campaign owners: controlled, place-specific activations with clear objectives and measurable actions.
- Maps, mobility, tourism and travel platforms: an embeddable spatial content and activation layer without building their own CMS and campaign stack.

## 3. Product architecture: three connected surfaces

### A. Monument Places
A publishing and discovery system for places and destinations:
- venues, landmarks, exhibits, points of interest, routes and areas;
- stories, guides, artwork, menus, events, offers and other place-aware content;
- map, QR/NFC, deep-link and camera/XR entry;
- draft, preview, publish, schedule, pause, archive and revise;
- organization workspaces, roles, approvals and audit history as the product matures.

### B. Monument Campaigns
A controlled activation layer built on top of verified place inventory:
- campaigns with objectives, creative, CTA, dates, budgets and eligibility rules;
- location, radius/polygon, time and context targeting;
- frequency caps, quiet hours, expiry and category/brand-safety rules;
- actions such as save, navigate, call, book, redeem and purchase;
- reporting for eligible views, engagement, clicks, redemptions and attributable outcomes.

Campaigns are a future commercial module, not a claim that a full ad server, marketplace or programmatic exchange already exists.

### C. Monument Infrastructure
The partner-facing layer:
- versioned APIs, webhooks and SDKs;
- white-label publishing and visitor experiences;
- integrations with maps, navigation, tourism, travel, mobility and delivery apps;
- scoped keys, signatures, rate limits, sandbox, monitoring and versioning;
- partner-controlled distribution and identity, with Monument providing the spatial content/runtime layer.

## 4. First usable workflow — current implementation direction

The first product slice should make the core spatial promise tangible before building enterprise administration:

1. Choose an outdoor or indoor context.
2. Define the place and physical surface.
3. Set location, orientation, dimensions and relevant content.
4. Preview the experience.
5. Open it on a phone and field-test it.
6. Move closer to or farther from the target and observe how bearing, distance and apparent size change.
7. Save the work and later publish/share it when a durable backend is connected.

**Outdoor** experiences are Earth-referenced and may use coordinates, heading, dimensions and range.

**Indoor** experiences need a deliberate anchor strategy. QR/2D markers are a practical first entry point; session-local WebXR placement is a temporary interaction, not a permanent indoor anchor.

The admin panel is intentionally deferred from the first interaction loop, but the underlying data model and product boundaries should not prevent later organizations, roles, approvals, scheduling, audit logs and partner controls.

## 5. Distribution and opportunity map

### Initial buyer wedge
Prioritize customers who already control a physical destination and can distribute a QR, NFC tag or link:
1. malls, shopping centers and retail districts;
2. museums, galleries, cultural sites and exhibitions;
3. tourism destinations, landmarks, hotels and hospitality venues;
4. festivals, campuses, universities and event operators;
5. city/tourism organizations and destination-management groups.

A compact venue or destination is a better first proof than a nationwide consumer launch.

### Platform and channel opportunities
After one repeatable venue pilot, explore:
- map and navigation platforms;
- ride-hailing, mobility and delivery products;
- tourism, booking and trip-planning apps;
- large brands, agencies and ad networks.

Snapp, SnappTrip, Neshan and Balad are strategic integration prospects, not dependencies for the first pilot. Treat each as a separate partnership opportunity with its own technical, commercial, legal and procurement process.

### Potential use cases
- contextual place stories, local history and cultural interpretation;
- museum/exhibition labels and interactive visitor journeys;
- destination guides, routes and tourism discovery;
- venue wayfinding and useful visitor information;
- retail discovery, menus, event information and time-bound offers;
- sponsored places and brand activations;
- arrival, pickup/drop-off and waiting-zone experiences inside a partner mobility app;
- white-label spatial content for a city, tourism operator or platform.

## 6. Go-to-market hypothesis

Recommended first proof:
- one venue or compact destination;
- one operator/sponsor and a named product/technical contact;
- 10–20 verified points;
- 2–3 participating local businesses where relevant;
- one journey from QR/NFC/deep link to a useful experience and measurable action;
- a 4–6 week paid or co-funded pilot;
- weekly reporting and a final review.

Measure actual outcomes: opens, engaged sessions, CTA clicks, navigation starts, calls/bookings, redemptions and—where a valid comparison is possible—visit-lift proxies. Do not claim reach, attribution or lift without evidence.

## 7. Business model ladder

Recommended sequence:
1. paid pilot, setup and onboarding;
2. venue/destination SaaS subscription;
3. white-label annual license;
4. partner API/SDK platform fee and usage tiers;
5. campaign fees or revenue share once inventory, reach and measurement are dependable;
6. CPM/CPC/CPA or marketplace economics only after real distribution and fraud controls exist.

**Payments:** the user has expressed interest in eventually supporting both Iranian and international payment paths, including crypto payment options for Monument/related products. This is a future architecture and commercial consideration, not an immediate implementation commitment. Payment work is deferred while the core product and portfolio/case-study work take priority. Any real payment launch requires a separate legal, sanctions, compliance, custody, tax and provider-feasibility review; do not assume a particular rail is available or compliant.

## 8. Product and design principles

- Instrument-grade, professional, clean and calm—not a toy AR demo.
- Clear categorization and hierarchy; intuitive navigation and obvious next actions.
- Containerized/card-based sections, generous spacing, rounded corners and consistent component rules.
- Prioritize the spatial object and its real-world context; avoid decorative UI that competes with the task.
- Keep the first setup flow short and comprehensible; defer complex admin until the core workflow is validated.
- Build a coherent system that can scale from a single creator to organizations and partner operators.

## 9. Technical principles and non-negotiable truth boundaries

- QR/NFC/deep links and foreground geolocation are suitable early validation channels.
- Mobile web cannot be relied on for robust background geofence notifications. That generally requires native app or host-app SDK integration and explicit permission.
- GPS + compass + estimated camera FOV can be a field-test/alignment instrument; it is not a persistent geospatial AR anchor.
- Persistent outdoor anchoring may require native ARCore Geospatial/VPS or equivalent, device calibration and real-world testing.
- Indoor QR tracking is 2D; session-local WebXR placement may drift. A repeatable indoor spatial anchor is a separate engineering problem.
- Do not promise terrain occlusion, survey-grade alignment, calibrated vertical placement or stable world anchors before they are implemented and validated.
- Separate demo, QA and customer/production data. Never run live verification or migrations against an unknown production database.
- Build additively, preserve previous working deployments and keep secrets out of Git.

## 10. Trust, privacy and measurement

- Explicit, understandable permission and opt-in.
- Collect the minimum location data needed; prefer on-device processing where possible.
- Purpose limitation, short retention, deletion/export and clear user controls.
- No continuous movement-history product in the MVP.
- No sensitive-place targeting or unsolicited background notifications.
- Frequency caps, dismiss controls, quiet hours and aggregate reporting.
- Anti-fraud, deduplication and auditable campaign rules before selling performance metrics.
- Review local privacy, advertising and data-sharing requirements before production partner campaigns.

## 11. Portfolio and narrative

Monument is also intended to appear in the user's AI-built product/design portfolio as a substantive product case study. The case study should communicate the product thesis, problem framing, system architecture, design decisions, prototype/implementation evidence, constraints and roadmap—not imply that planned enterprise capabilities are already shipped.

Payment integrations are deferred; they may be represented as a future architecture consideration, clearly labelled as such.

## 12. Current state versus future state

### Implemented / evidenced in Studio v1
- guided outdoor/indoor setup direction;
- surface and content workflow;
- map/location presets;
- local-first drafts;
- foreground camera/GPS/compass field-test instrument;
- separate field-test route and QR;
- responsive card-based UI;
- build passes and 13 unit tests pass;
- a dedicated Vercel project deployment is now READY (see latest handoff).

### Not yet proven or not yet shipped
- persistent world-anchored outdoor AR;
- stable indoor spatial anchors;
- production accounts and cross-device sync in the new preview;
- fully verified publishing against the isolated QA database;
- real-device camera/GPS/compass accuracy;
- enterprise organization/role/approval controls;
- complete campaign manager, ad delivery, billing and marketplace;
- production partner API/SDK and integrations;
- reliable campaign attribution, anti-fraud and scaled analytics;
- payment integrations.

## 13. Open questions to validate

- Which first vertical has the strongest urgency, budget and shortest procurement path?
- Who is the first buyer and who owns the technical integration?
- What is the smallest experience that creates measurable value for visitors and operators?
- Which outdoor anchor technology meets required accuracy/cost/device coverage?
- Which indoor anchor approach is repeatable across venues?
- What partner data and identity model is actually available?
- Which campaign outcomes can be measured credibly without invasive tracking?
- What payment providers and rails are legally and operationally viable for each target market?

## 14. Operating rule for future sessions

Treat this file as the product vision and opportunity map, not as proof of implementation. Keep these separate:
- **User direction:** explicit requirements and preferences.
- **Hypothesis:** a proposition to validate with customers or tests.
- **Implemented:** present in source code.
- **Verified:** supported by a passing test, deployment or real-device evidence.

At every meaningful milestone, update LATEST_HANDOFF.md, DECISION_LOG.md and ROADMAP.md. Inspect the actual Git branch, deployment and test evidence before continuing; do not rely on chat memory alone.
