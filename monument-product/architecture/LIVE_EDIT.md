# Live Edit — Product and Interaction Specification

Status: proposed interaction contract. Last updated: 2026-11-18.

## Product promise
A user edits one geographic surface from a single screen. The map and camera are synchronized views of the same draft. A map change must alter the geographic surface definition and, when localization and visibility allow, update the camera preview.

The UI distinguishes a fast visual preview from a committed, geospatially resolved placement.

## Screen composition
- Upper region: live camera with selected surface, tracking state and concise direction/range hints.
- Lower sheet: map with surface footprint/baseline, north indicator, selected handles and terrain profile.
- Compact controls: move, rotate, width, height, terrain-follow state, undo/redo, save draft and publish.
- Advanced coordinate and terrain controls stay behind progressive disclosure.
- Map sheet can be resized or collapsed while the camera remains visible.

## Interaction model
- Select: tapping the map or camera selects the same surface in both views.
- Move: dragging on map changes geographic baseline/origin. Show a ghost preview while dragging. Resolve terrain and committed mesh after release.
- Rotate: gesture or heading control changes baseline bearing around a visible pivot. Expanded inspector shows north reference and degrees.
- Resize: width changes along baseline; height changes upward from local terrain. Keep them independently editable in meters.
- Pivot: allow moving the anchor/pivot separately and show it on the map.
- Terrain follow: v1 means lower edge follows terrain while height remains constant above terrain. Do not present full terrain warp as implemented.
- Undo/redo: operate on canonical domain operations, not arbitrary renderer transforms.
- Save draft: persist canonical geographic definition and revision; does not publish.
- Publish: separate explicit action; validate geometry, media ownership, permissions and asset availability.

## State machine
loading → ready → editing_preview → resolving_terrain → ready
ready → saving → saved_draft
saved_draft → publishing → published
Any recoverable failure → error_recoverable; revision mismatch → conflict; loss of pose/terrain quality → degraded.

No UI may show saved or published before backend confirmation.

## Feedback indicators
Show separate indicators for device tracking, geospatial localization, VPS availability/initialization, terrain confidence/resolution, content loading, and save/publish status. Do not collapse them into one generic GPS status.

## Performance rules
- Coalesce sensor and map events.
- Do not rebuild the full mesh every frame.
- Use lightweight ghost preview during drag.
- Throttle expensive terrain/mesh work until gesture settles.
- Rebuild only affected tiles.
- Avoid heavy blur over live camera.
- Keep map and camera derived from one draft state.
- Expose frame time and mesh-build diagnostics in a developer panel, not as fabricated metrics.

## Accessibility and recovery
Provide numeric controls as alternatives to gestures, usable touch targets, cancel/reset/undo, and draft preservation after permission denial, tracking loss or network interruption. Permit map-only editing when AR is unavailable, with a clear warning that camera alignment is unverified.

## Acceptance criteria
1. Map geometry updates canonical geographic draft.
2. Camera and map derive from the same draft revision.
3. Rotation uses a visible stable pivot and documented north reference.
4. Width and height change independently in meters.
5. Terrain profile updates only after query/mesh resolution completes.
6. Tracking, terrain, save and publish states are separate and truthful.
7. Undo/redo restores exact prior domain values.
8. Save and publish require backend confirmation.
9. Tracking loss does not destroy the draft.
10. UI does not claim world-lock precision under approximate localization.
