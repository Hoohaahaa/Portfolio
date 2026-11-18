# Monument Spatial Field Test Playbook

Status: test plan; execution evidence must be added per run. Last updated: 2026-11-18.

## Purpose
Turn field reports into reproducible evidence. A screenshot alone is insufficient to diagnose a geospatial issue.

## Before each test
Record test run ID/date; device model and variant; Android and ARCore runtime versions; app version and Git commit; camera and precise-location permissions; location availability; runtime Geospatial support result; VPS availability; tracking state and available accuracy; terrain provider/dataset/resolution/vertical datum; network state; battery and temperature if relevant.

Do not commit exact user coordinates, continuous location history, camera footage or sensitive diagnostics. Prefer a coarse site label or local test identifier unless precise coordinates are necessary and explicitly consented.

## Test progression
### T0 — Runtime capability
Confirm ARCore installation; query Geospatial support; verify precise-location and camera permission flows; test denied permissions; record VPS availability separately from device support.
Pass: capabilities are truthful and missing capabilities lead to a graceful degraded state.

### T1 — Pose and heading
Stand still in open sky; observe position/heading stability; rotate through cardinal directions; repeat near metal structures and at another location; compare heading with known map bearings.
Pass: jitter and uncertainty are exposed rather than hidden behind a falsely precise overlay.

### T2 — Small vertical surface
Place a small test curtain; compare map baseline, heading and camera alignment; walk around it; pause and restore tracking.
Pass: placement is explainable and recoverable; do not claim global persistence without proof.

### T3 — Terrain-follow profile
Use flat, uphill, downhill, ridge and valley fixtures. Inspect elevation samples and metadata. Confirm lower edge follows terrain and vertical height remains constant above terrain. Test missing samples and abrupt elevation changes. Compare with a trusted reference where possible.
Pass: geometry follows ADR-001 and missing data never silently becomes zero.

### T4 — Live Edit
Drag baseline, rotate around visible pivot, resize width/height independently, inspect ghost preview, wait for terrain resolution, undo/redo, save draft, reload and compare canonical values.
Pass: map and camera derive from the same saved revision; backend confirms save.

### T5 — Performance and scale
Progress from small local surface to ~100 m baseline, ~1 km, regional baseline, 10 km width stress test, then extreme 30 km vertical-extent test only after coordinate/horizon behavior is defined. Measure frame time, memory, mesh-build time, network, thermal behavior and battery. Inspect tile seams, LOD, clipping and floating-origin transitions.
Pass: measured performance budget is met on target hardware; define budget from evidence, not guesswork.

## Evidence bundle
For each failure capture reproduction steps, expected/observed behavior, device/runtime, app commit, permissions, tracking/VPS state, terrain metadata, redacted logs, optional consented screenshot/video, reproduction after restart/at another site, diagnostic IDs, attempted fix and before/after evidence.

## Release gate
Do not call the feature world-locked or field-ready until runtime Geospatial support, VPS fallback, small-surface placement/relocalization, terrain invariants, Live Edit save/reload, performance and failure states have been measured and limitations are visible.
