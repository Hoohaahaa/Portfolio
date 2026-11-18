# Technology Options and Selection Record

Status: provisional recommendation; no native stack has been implemented or physically verified. Last updated: 2026-11-18.

## Decision summary
Preferred path for the first full native spatial prototype: Unity + AR Foundation + ARCore Extensions, with a provider-neutral terrain interface and Monument-owned backend contracts.

This is a recommendation, not a completed integration. Validate exact device/runtime support and build a small vertical slice before locking the production architecture.

## Option comparison
| Path | Strengths | Limitations | Position |
|---|---|---|---|
| Existing browser app + Web APIs | Reuses current UI; fastest map/editor prototype | Does not expose the full ARCore Geospatial feature set; browser/device behavior varies | Keep for UX and map editor prototypes |
| Native Android + ARCore SDK | Direct Android access; smaller runtime stack | More custom mesh/editor work; Android-specific | Viable alternative |
| Unity + AR Foundation + ARCore Extensions | Mature 3D mesh/rendering; AR scene tooling; potential iOS path | Larger runtime; plugin/version compatibility; feature parity must be checked | Preferred prototype |
| Custom renderer without ARCore Geospatial | Full rendering control | Must independently solve localization, sensor fusion and anchor persistence | Not recommended for v1 |
| Native iOS / ARKit | Strong iOS AR stack | Separate feature behavior; not useful for Android-first validation | Later evaluation |

## Why Unity first
The hard problem is generating and rendering a large terrain-aware mesh while maintaining an editor that changes canonical geographic geometry. Unity offers mature mesh/rendering tools and a native AR integration path. Do not adopt Unity just to recreate a web editor; first prove device pose + geographic surface + terrain profile + stable rendering.

## Required proof before stack lock-in
1. Confirm exact Galaxy A32 model/variant and Android build.
2. Confirm ARCore runtime installation and device support.
3. Query Geospatial mode support at runtime.
4. Request precise location and camera permissions.
5. Check VPS availability at the actual test site.
6. Place a small geospatial test anchor and record tracking/accuracy state.
7. Render a small vertical mesh and compare map/world/camera alignment.
8. Measure startup, frame time, thermal behavior, memory and battery.
9. Test loss/recovery of GPS, VPS, camera and permissions.
10. Compare minimal native Android proof if Unity overhead or compatibility is poor.

## Device statement
Galaxy A32 family appears in Google's ARCore supported-device catalogue. That does not prove every A32 variant, installed ARCore runtime or current location supports every Geospatial feature. Runtime checks are mandatory. VPS coverage is location-specific.

## Terrain source decision
Do not select a terrain vendor before comparing geographic coverage, vertical datum, resolution/error, update cadence, license, API limits, latency, caching/offline behavior, cost and export/exit path. Wrap the source behind TerrainProvider but expose provider-specific limits.

## Mapping decision
Keep the map provider behind a map adapter. The map is an editing/visualization surface, not the source of truth for AR pose or terrain height. Evaluate projection, offline support, attribution/licensing, terrain capabilities, cost and mobile performance.

## Reversal triggers
Reconsider Unity if Geospatial Extensions do not support the target runtime; app size, thermal load or frame time is unacceptable; native Android is materially more stable; or cross-platform needs make separate native renderers more appropriate.

Reconsider browser-only scope only if the product promise is explicitly reduced to approximate overlays and abandons persistent world-locked placement.
