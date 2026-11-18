# Spatial System Architecture

Status: proposed architecture baseline. Last updated: 2026-11-18. Depends on ADR-001.

## 1. Product model
Monument is a geographic content canvas, not merely a camera overlay. A surface has a persistent geographic definition and a runtime representation in the user's camera frame.

A surface contains: stable ID and owner; geographic baseline/control points; width along baseline; height above local terrain; heading/orientation policy; terrain source and profile version; content layers and asset IDs; visibility/access policy; draft/published lifecycle and revision history.

V1 geometry is a vertical curtain whose lower edge follows terrain and whose height remains constant relative to terrain at each baseline sample.

## 2. Runtime pipeline
1. Acquire device pose and geospatial localization state.
2. Load surface baseline, dimensions and orientation.
3. Retrieve terrain elevations and quality metadata.
4. Generate tiled mesh sections from baseline samples and local-up vectors.
5. Map image/video/composition UVs onto mesh tiles.
6. Select visible tiles using camera frustum, distance, projected size and performance budget.
7. Render visible sections and report tracking/terrain confidence.
8. Save edits as versioned domain changes; publish only after validation.

## 3. Coordinate systems
Do not use one coordinate representation for every job.
- Authoritative storage: geodetic coordinates with explicit altitude semantics and versioned baseline points.
- Geospatial computation: Earth-Centered, Earth-Fixed (ECEF) or suitable geodesic calculations for large extents.
- Local rendering: camera-relative or local tangent-frame coordinates for nearby mesh tiles.
- Device pose: AR runtime pose plus tracking quality and timestamp.
- UI map: map projection coordinates converted through a documented adapter.

Never store Unity scene coordinates as source of truth. Never treat map screen pixels as geographic coordinates without applying the map projection. At 10 km width and especially 30 km vertical extent, Earth curvature and local-frame distortion matter. Segment the surface and compute each tile relative to an appropriate local frame.

## 4. Terrain-follow geometry
For each baseline sample:
- resolve geographic position;
- resolve terrain elevation from a named source and vertical datum;
- derive local up vector;
- set lower vertex to the position at terrain height;
- set upper vertex to lower + local up × surface height;
- build adjacent quads between lower and upper vertices;
- recalculate normals, tangents, UVs and bounds;
- split into tiles before vertex count, precision or culling become problematic.

This is a vertical curtain, not a full terrain warp. Missing terrain samples must remain explicit. Never silently replace unknown elevation with zero. Interpolation is permitted only across short, bounded gaps and must preserve a low-confidence marker.

## 5. Geospatial localization
The Android prototype must check at runtime:
- device/runtime support for Geospatial mode;
- precise location and camera permissions;
- tracking state;
- VPS availability at the current site;
- accuracy estimates exposed by the runtime.

Suggested states: unavailable, gps_approximate, vps_initializing, geospatial_tracking, degraded, relocalizing.

ARCore certification does not guarantee Geospatial support or VPS coverage at every location. The UI must not imply precise world-locking while localization is approximate or unavailable.

## 6. Rendering
A 10 km × 30 km canvas is not one ordinary scene object. Use geographic tiling, frustum/distance culling, LOD, camera-relative rendering, asynchronous terrain and asset loading, bounded mesh rebuilds, and event-driven updates. Separate preview geometry from committed geometry during edits.

Start with one small surface and one media layer. Prove correctness before adding multiple surfaces, huge textures, synchronized video or collaborative editing.

## 7. Live Edit and persistence boundary
The editor changes a domain draft, not a transient scene transform. The map footprint, terrain profile, render mesh and camera preview must all derive from one canonical draft state.

Persist stable surface ID, revision, geodetic baseline, dimensions in meters, heading and vertical policy, terrain source/version/quality, content asset IDs, lifecycle and timestamps.

Do not persist device-local scene transforms as authoritative geometry or raw sensor streams unless a justified, consented diagnostic flow requires them.

## 8. Proposed logical modules
- GeospatialAdapter: ARCore/AR Foundation boundary and runtime checks.
- PoseState: normalized pose, timestamps, accuracy and tracking status.
- TerrainProvider: provider-neutral elevation query contract with source metadata.
- SurfaceDomain: validation and canonical surface definitions.
- SurfaceMeshBuilder: deterministic terrain-following mesh generation.
- TileManager: LOD, culling and bounded loading.
- SpatialRenderer: AR scene integration.
- LiveEditController: gesture interpretation and draft operations.
- MapAdapter: projection conversion and overlays.
- SurfaceRepository: versioned persistence.
- Diagnostics: structured, privacy-conscious event capture.

These are modules, not separate services.

## 9. Backend boundary
Monument owns its product data. Store media bytes in object storage and metadata/ownership in PostgreSQL. The existing private Neon preview bucket is infrastructure only; cloud upload is not implemented until an authenticated upload-intent API, ownership checks, canonical asset record, safe delivery and cross-device verification exist.

## 10. V1 non-goals
- Full terrain deformation of the entire vertical panel.
- Multi-user simultaneous spatial editing.
- Guaranteed persistent world anchors at every location.
- Automatic publication.
- A custom global terrain dataset.
- Treating browser overlays as native ARCore Geospatial tracking.
