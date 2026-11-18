# Spatial Engine Lab

**Status:** Prototype 0.1 implementation. Browser/device verification still required.

## Entry point
Open `/engine.html` or the Vercel route `/engine`.

## Implemented in this slice
- Live camera permission flow.
- Browser geolocation watch with accuracy indicator.
- Device orientation/compass listener with circular smoothing.
- Leaflet map, draggable geographic anchor and north-up orientation.
- Vertical panel baseline computed geodesically from width and face heading.
- Width, height and face direction controls.
- Approximate camera projection when the surface is in front and inside a nominal 64° horizontal field of view.
- Continuously draggable map/control sheet, map fullscreen, camera fullscreen and split view.
- Local draft persistence, undo/redo and bounded diagnostic event stream.
- JSON export of surface and diagnostic events.

## Explicitly not implemented
- ARCore Geospatial API / VPS / persistent world anchors.
- Terrain elevation provider or actual ground-following mesh. The selected follow rule is represented in the data model, but this browser prototype uses a flat preview fallback and labels it unverified.
- Cloud persistence, multi-device sync or publishing.
- Camera calibration, true camera intrinsics, occlusion, ECEF mesh tiling or 3D rendering.
- Guaranteed compass support across every browser/device.

## Event and data contracts
- `../architecture/ENGINE_CORE.md`
- `../architecture/EVENT_CATALOG.md`
- `../architecture/ENGINE_TEST_MATRIX.md`
- `../architecture/ENGINE_GEOMETRY.md`
- `../research/RESEARCH_REGISTER.md`
- `ENGINE_ISSUES.md`
- `../architecture/ENGINE_SYSTEM_MAP.md`

## UX constraints carried forward
- Keep the orange Portfolio accent (#FF573D); do not restore the rejected green theme.
- Keep diagnostics secondary and collapsible.
- Preserve Location → Space → Content hierarchy when content authoring is integrated.
- Do not reintroduce an idle animation loop or layout writes on every sensor frame.

## Privacy
The local draft contains the selected surface coordinates. Raw camera frames and continuous device coordinates are not stored in the event history. The event export is user initiated. The app asks for camera and location only after Start field session.
