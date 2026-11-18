# ADR-001: Vertical, Ground-Following Surface

- Status: Accepted for v1 product geometry; implementation is not complete.
- Date: 2026-11-18
- Scope: Monument spatial canvas geometry and Live Edit behavior.
- Revisit when: field evidence shows the geometry is unintuitive, terrain data cannot support it, or a different use case requires another surface model.

## Context
The chosen geometry is vertical and the chosen surface behavior is follow. Follow could mean following only the ground-contact edge, warping the whole panel, or draping the surface over terrain. These are materially different behaviors.

## Decision
For v1, use a ground-following vertical curtain:
1. The lower edge follows sampled terrain elevation along a geographic baseline.
2. The panel's vertical dimension is measured upward from local terrain at each sample.
3. The vertical axis follows local gravity, not the terrain slope.
4. The panel may curve along its horizontal geographic path as terrain and geodesic direction change.
5. The panel does not lie flat on terrain and is not a terrain-draped decal.
6. Terrain samples are versioned and carry source, resolution, timestamp and confidence metadata.

This is option A: ground-following lower edge, constant height above local terrain.

## Why this is the v1 choice
- Preserves the intuitive idea of a giant upright screen or curtain.
- Gives a predictable height rule while allowing the base to follow ridges and valleys.
- Is simpler to author and validate than a fully terrain-warped panel.
- Can be represented as a mesh generated from a sampled geographic baseline.

## Alternatives considered
- Full terrain-conforming wall: more immersive, but vertical semantics become ambiguous and content may distort or fold. Defer.
- Flat vertical plane independent of terrain: simple, but the lower edge can cut through terrain or float above valleys. Keep as debug/fallback mode.
- Terrain-draped surface: rejected because it is a horizontal or slope-following surface, not a vertical canvas.
- One enormous local scene plane: rejected for large geographic extents; use geodetic/ECEF-aware placement and tiled geometry.

## Coordinate and dimension rules
- Store the geographic baseline in geodetic coordinates with explicit altitude datum/mode.
- Treat the baseline as a geodesic or versioned sequence of geographic control points.
- Sample terrain at spacing appropriate to source resolution and visible detail.
- At each sample derive a local up vector.
- Generate lower vertices at sampled terrain height and upper vertices at lower + height × local up.
- Recalculate normals and bounds.
- Use camera-relative rendering or floating origin for precision.
- Split the canvas into geographic tiles and render visible tiles with level of detail.
- Height above terrain is not interchangeable with height above sea level.

## Scale warning
The discussed 10 km × 30 km dimensions are a stress target/example, not a validated default. A 30 km vertical extent is an extreme virtual construct. It requires Earth-aware coordinates, tiling, LOD and deliberate horizon/visibility semantics. Validate small surfaces first, then 100 m, 1 km and larger. The whole canvas is not expected to fit in the camera view.

## Consequences and risks
Terrain may be coarse, missing or stale. DEM data may not represent trees, buildings, cliffs or recent changes. A curtain can intersect real objects. Tracking error can make a correct mesh appear misplaced. Large dimensions amplify precision, clipping and performance issues.

## Reversal triggers
Reconsider if users expect the whole panel to deform with terrain; the lower-edge rule causes unacceptable artifacts; elevation data is inadequate; content requires a flat plane or draped surface; or device tests fail performance targets.

## Validation
- Unit tests for local-up direction, mesh vertices, width/height invariants and tile boundaries.
- Terrain fixtures for flat ground, ridge, valley, steep slope and missing samples.
- Visual tests for seams, normals, clipping and horizon behavior.
- Device tests for tracking stability and frame time.
- Compare against a flat independent plane and fully warped wall before expanding v1.
