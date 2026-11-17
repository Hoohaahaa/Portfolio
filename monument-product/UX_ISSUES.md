# Monument UX Issue Log

This file is the persistent product UX debt register. New feedback from real use should be added here before implementation. Every issue must have a severity, observed behavior, expected behavior, status, and a verification note. Do not silently close an issue because a visual workaround exists.

## Active issues

### UX-001 — Navigation lacks orientation and hierarchy
- Severity: High
- Area: Studio navigation / Field Test
- Observed: Moving between collection, editing, content, and field testing does not consistently communicate where the user is or how to return to the parent.
- Expected: Persistent breadcrumbs, clear parent navigation, preserved selected location/space, and predictable Back behavior.
- Status: In progress — breadcrumbs added to the editor and Field Test. Latest adjustment adds top/side whitespace and removes any breadcrumb container treatment; hierarchy redesign remains open.
- Verification: Check narrow mobile layout, browser Back, dirty-form confirmation, and Field Test exit paths.

### UX-002 — Content image is not reliably visible in the spatial experience
- Severity: Critical
- Area: Content authoring / Field Test / Viewer
- Observed: Image can be entered in Content and appear in a collection card while remaining absent from the actual spatial surface.
- Expected: One canonical media asset reference must render consistently in authoring preview, outdoor surface, indoor experience, and visitor view; broken/blocked URLs need an explicit error state.
- Root-cause findings: Outdoor visibility was incorrectly gated on all alignment conditions being true (compass heading available, surface facing user, within range, and inside estimated FOV). When any condition failed, the actual surface node was hidden, so valid content appeared to disappear. Indoor rendering had no explicit media container, loading state, empty state, or image error feedback; it could silently degrade to text-only.
- Status: Partially corrected — Outdoor now keeps a spatial content preview visible when sensors/alignment are unavailable and shows alignment separately. Indoor now has a dedicated media region, empty state and image-load error feedback. This is a structural correction to rendering behavior, not proof every image URL will load.
- Remaining: The current authoring control is still a URL field, not a true file upload. A canonical managed media asset/upload pipeline remains required.
- Verification: Test direct JPG/PNG/WebP URL, blocked URL, redirect/share-page URL, and actual file upload after storage is implemented. Verify outdoor and indoor on Android and iOS.

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

 
### UX-005 — Breadcrumb spacing is cramped
- Severity: Medium
- Area: Studio / Field Test navigation
- Observed: Breadcrumb sat too close to the frame above and felt compressed.
- Expected: Quiet text-only navigation with consistent padding and whitespace on all sides; no colored container or decorative card.
- Status: Corrected in CSS; visual verification on phone still required.
- Verification: Inspect top safe-area spacing and horizontal padding on narrow and wide viewports.
