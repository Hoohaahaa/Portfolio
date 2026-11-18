# Spatial Engine Core Contract

Status: prototype implementation contract. Last updated: 2026-11-18.

## Layer boundaries
1. **Domain / Spatial Core** — geodesic math, surface validation, canonical draft, undo/redo.
2. **Event layer** — typed events with timestamps and bounded in-memory history.
3. **Adapters** — browser geolocation, device orientation, camera, Leaflet map.
4. **Projection / presentation** — camera approximation and map footprint, both derived from the same surface state.
5. **Persistence** — local draft in v0.1; backend repository is a later adapter.

The core must not depend on DOM, Leaflet, browser sensor APIs, Vercel or Neon. It must remain executable in Node tests.

## Canonical surface schema
```json
{
  "id": "surface-local-01",
  "name": "Untitled surface",
  "geometry": "vertical-curtain",
  "terrainMode": "follow-lower-edge",
  "anchor": {"lat": 0, "lon": 0, "altitude": null},
  "width": 120,
  "height": 18,
  "heading": 0,
  "revision": 1,
  "updatedAt": null
}
```
Coordinates are latitude/longitude in degrees; width and height are meters; heading is degrees clockwise from true north as a desired semantic. Browser compass may be magnetic/uncalibrated and must be marked approximate until corrected by a geospatial runtime. The prototype uses an explicit `anchorSet` flag so a valid anchor at 0°, 0° is not mistaken for an unset location. Do not silently mix magnetic north, true north and map bearing.

## Geometry
- Face heading is the outward normal direction.
- Baseline direction is heading + 90°.
- Baseline endpoints are geodesic destinations at ±width/2.
- Camera projection uses observer-to-anchor bearing, a nominal FOV, and face visibility.
- This projection is a UX preview only. It is not a calibrated camera projection and not world-locked AR.
- Height is a vertical domain dimension; it does not map to a ground footprint distance.

## Event contract
Events use `{id,type,at,payload}`. Payloads must be small, typed, versionable and privacy-conscious. Do not include raw camera frames or continuous raw GPS traces. Domain operations emit both a specific event and `surface.changed`. A renderer subscribes to state changes; it does not own canonical geometry.

## Persistence
The local adapter stores only the canonical draft under a versioned key. Future backend adapter must support revision numbers, optimistic concurrency, authorization, schema migrations and explicit save confirmation. Never persist device-local render transforms as spatial truth.

## Numerical constraints
- Earth radius for this spherical prototype: 6,371,008.8 m.
- Great-circle distance/bearing and destination calculations are used for the map baseline.
- This is sufficient for short prototype baselines; regional/global authoritative geometry requires ellipsoidal geodesics and ECEF/local tangent frames.
- Clamp/validate dimensions and coordinate ranges at the domain boundary.
- Do not treat unknown terrain elevation as zero in a future terrain adapter.
