# Monument Field Diagnostics — Symptom to Hypothesis Map

Status: living diagnostic register. Last updated: 2026-11-18.

A hypothesis is not a root cause until a discriminating test supports it. Preserve the user's symptom, map it to IDs, collect evidence and test one leading explanation at a time.

## GEO-001 — Surface drifts while phone is stationary
Possible causes: Geospatial pose still converging; GPS multipath; VPS unavailable/relocalizing; heading noise; renderer updates in wrong frame; map/world projection mismatch.
Tests: inspect tracking/accuracy over time; separate position drift from heading rotation; repeat open-sky/VPS-covered; freeze terrain updates; compare canonical geodetic values before/after rendering.
Remedies if confirmed: expose initializing/degraded state; bounded pose filtering; correct frame/origin conversion.

## GEO-002 — Surface appears in wrong compass direction
Possible causes: magnetic interference; magnetic vs true north mismatch; screen rotation confusion; heading sign/convention error; incorrect pivot/bearing conversion.
Tests: compare heading sources; rotate through known cardinal bearings away from metal; log raw/normalized heading and screen rotation; verify baseline against map north.
Remedies: one documented heading adapter; apply declination only when required; expose pivot and bearing.

## GEO-003 — Map placement is right but camera preview is offset
Possible causes: poor localization/VPS; altitude datum mismatch; map projection error; local tangent frame reused over too large an extent; anchor applied twice.
Tests: independently verify stored coordinates; inspect pose accuracy/VPS; test small nearby anchor; compare terrain datum and altitude semantics; render a known calibration marker.
Remedies: honest approximate state; correct datum conversion; per-tile local frames/ECEF-aware placement; fix origin ownership.

## GEO-004 — Surface base cuts through ground or floats
Possible causes: coarse/wrong DEM; vertical datum mismatch; sample spacing too wide; bare-earth DEM differs from visible trees/buildings; interpolation crosses cliff or missing-data gap.
Tests: inspect source/resolution/datum/sample points; compare independent elevation reference; densify samples; visualize raw terrain without AR.
Remedies: better elevation source; adaptive sampling; visible confidence/gaps; never claim obstacle-level conformity from coarse DEM.

## GEO-005 — Top edge is not constant height above terrain
Possible causes: global up instead of local gravity; units mismatch; top derived from one anchor altitude; tile seams use inconsistent frames.
Tests: inspect lower/top vertex pairs and local-up vectors; run flat/ridge/valley fixtures; numerically compare per-sample height; inspect shared tile boundaries.
Remedies: top = corresponding bottom + local up × height; unify units/datum; share boundary samples.

## GEO-006 — Surface bends, twists or folds
Possible causes: unordered baseline points; abrupt bearing/self-intersection; local-frame discontinuity; incorrect normals/winding; accidental full terrain warp.
Tests: visualize control points/tile axes; test straight geodesic baseline; inspect topology/normals; compare to ADR-001 invariants.
Remedies: validate path; segment by geodesic distance and recompute local frames; fix mesh topology; retain v1 curtain geometry.

## GEO-007 — Dragging lags or preview jumps
Possible causes: full terrain query/mesh rebuild on every pointer event; map and camera have separate state; sensor events cause unnecessary layout work; too many visible tiles/textures; network blocks gesture.
Tests: profile gesture frame time; count mesh rebuilds/terrain queries; compare ghost and committed preview; test offline with cached terrain.
Remedies: lightweight ghost preview; coalesce events; resolve terrain after release; derive both views from one draft; update affected tiles only.

## GEO-008 — Surface disappears or clips at distance/horizon
Possible causes: far clip/depth precision; one local frame stretched too far; incorrect bounds/culling; Earth curvature/horizon not modeled; panel outside camera FOV.
Tests: compare near/far small panels; inspect clip planes and tile bounds; test ECEF/per-tile frames; verify frustum and panel direction.
Remedies: geographic tiling and camera-relative rendering; intentional LOD/clipping; model horizon visibility; avoid one giant scene transform.

## GEO-009 — Works at one location but not another
Possible causes: VPS coverage differs; terrain coverage/resolution differs; sky visibility/magnetic interference; permissions/runtime/network differ; stale cache.
Tests: compare device support vs VPS availability; compare terrain metadata; repeat open sky/stable network; compare runtime and permissions.
Remedies: explicit capability states; coverage checks/cache invalidation; approximate GPS fallback with visible confidence.

## GEO-010 — Works until restart, then moves or disappears
Possible causes: only scene transforms saved; canonical geographic definition not persisted; temporary asset URL; local IndexedDB URL mistaken for durable asset; terrain dataset/version changed.
Tests: inspect saved geodetic model/revision; reopen on another device; verify asset ID/delivery authorization; compare terrain source/version.
Remedies: persist geographic domain data; use durable backend asset IDs; rebuild mesh from canonical data; version terrain-derived geometry.

## GEO-011 — Works on one A32 but not another
Possible causes: variant/chipset/OS/runtime differences; Geospatial support differs from basic ARCore; outdated ARCore runtime; permission or sensor differences.
Tests: record exact model/OS/runtime; call runtime Geospatial support check; record permissions/sensor capabilities; compare minimal ARCore sample.
Remedies: gate by runtime capability, not model marketing name; guide runtime update; offer map-only degraded editing.

## How to use this matrix
1. Preserve the original symptom and environment.
2. Assign diagnostic IDs.
3. Separate known facts, inferences, hypotheses and unknowns.
4. Choose a discriminating test.
5. Change one variable at a time.
6. Record result, commit and verification evidence.
7. Add new failure modes and keep rejected hypotheses with the test that ruled them out.
8. Mark a cause confirmed only when evidence supports it.

Related: [ADR-001](../architecture/ADR-001-VERTICAL-FOLLOW.md), [UX issue log](../UX_ISSUES.md).
