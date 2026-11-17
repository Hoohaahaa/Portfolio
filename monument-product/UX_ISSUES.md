# Monument UX Issue Log

This file is the persistent product UX debt register. New feedback from real use should be added here before implementation. Every issue must have a severity, observed behavior, expected behavior, status, and a verification note. Do not silently close an issue because a visual workaround exists.

## Active issues

### UX-001 — Navigation lacks orientation and hierarchy
- Severity: High
- Area: Studio navigation / Field Test
- Observed: Moving between collection, editing, content, and field testing does not consistently communicate where the user is or how to return to the parent.
- Expected: Persistent breadcrumbs, clear parent navigation, preserved selected location/space, and predictable Back behavior.
- Status: In progress — breadcrumbs added to the editor and Field Test; deeper Collection → Location → Space → Content hierarchy remains a product-level redesign.
- Verification: Check narrow mobile layout, browser Back, dirty-form confirmation, and Field Test exit paths.

### UX-002 — Content image is not reliably visible in the spatial experience
- Severity: Critical
- Area: Content authoring / Field Test / Viewer
- Observed: Image can be entered in Content and appear in a collection card while remaining absent from the actual spatial surface.
- Expected: One canonical media asset reference must render consistently in authoring preview, outdoor surface, indoor experience, and visitor view; broken/blocked URLs need an explicit error state.
- Status: In progress — authoring preview added; outdoor/indoor rendering paths exist and are being reinforced. Direct public HTTPS file URLs are required by the current URL-based field.
- Verification: Test a direct JPG/PNG/WebP URL, a blocked URL, a redirect/share-page URL, and a local file selection if upload support is added. Verify image visibility on both outdoor and indoor Field Test.

### UX-003 — Outdoor surface projection is visually unstable and not dimensionally convincing
- Severity: Critical
- Area: Field Test / spatial geometry
- Observed: Surface jitters with camera/device movement and does not convincingly reflect its configured dimensions and position. Current display is a camera overlay driven by GPS, compass, and estimated field of view.
- Expected: Screen projection should reflect bearing, vertical elevation, width, height, orientation and observer movement; motion should be filtered without concealing uncertainty.
- Status: In progress — added approximate vertical projection from configured height/elevation and low-pass smoothing. This remains a visual estimate, not a world-locked anchor.
- Verification: Test with known dimensions at several observer distances and headings; compare portrait/landscape; inspect jitter and vertical placement on physical devices.

### PLATFORM-001 — Persistent world-locked outdoor anchors
- Severity: Critical / architectural blocker
- Area: Spatial runtime
- Observed: GPS + compass + browser camera cannot provide stable, persistent multi-kilometer world anchoring or camera-pose tracking.
- Expected: Evaluate ARCore Geospatial/VPS or equivalent localization and pose tracking, calibrated camera intrinsics, coordinate/altitude datum handling, terrain occlusion and confidence reporting.
- Status: Not implemented — requires a dedicated native-capable or supported geospatial runtime. Do not describe the current camera overlay as persistent AR.

### UX-004 — Spatial authoring hierarchy is too flat
- Severity: High
- Area: Information architecture
- Observed: Current experience model bundles a place, surface and one content payload; this becomes hard to control when a real venue has many locations, surfaces and content items.
- Expected: Collection/Project → Location → Space/Surface → Content, with independent selection, editing, ordering, scheduling and preview.
- Status: Planned — data-model and migration design required before UI implementation.

## Operating rule
Every new user-reported UX issue is recorded here with a stable ID. Keep it open until the expected behavior is implemented and verified on the relevant device/browser. Separate implemented, tested, and physically verified states. Never mark hardware-dependent spatial behavior as verified from desktop tests alone.
