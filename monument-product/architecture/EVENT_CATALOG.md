# Monument Event Catalog

Schema version: 1.0.0. Status: prototype 0.1. Last updated: 2026-11-18.

Events are append-only observations of user/system actions. Event history is bounded and in-memory in this prototype. The export is manually initiated.

| Event | Producer | Payload fields | Diagnostic purpose |
|---|---|---|---|
| engine.ready | Engine | version, geometry, terrainMode, renderer | Boot baseline |
| map.initialized | MapAdapter | provider, projection | Map provider/config |
| session.start_requested | UI | none | Start flow |
| session.started | Session | camera, orientationPermission | Capability result |
| session.stopped | Session | none | Stop lifecycle |
| camera.started | CameraAdapter | width, height | Camera stream active |
| camera.error | CameraAdapter | name, message | Permission/runtime failure |
| location.watch_started | LocationAdapter | highAccuracy | Location request |
| location.updated | LocationAdapter | accuracyMeters, altitudeAvailable | Position quality without raw coordinate trace |
| location.error | LocationAdapter | code, message | Location failure |
| orientation.listener_started | OrientationAdapter | permission | Sensor subscription |
| orientation.updated | OrientationAdapter | heading, source, absolute | Compass quality/debug |
| orientation.error | OrientationAdapter | message | Sensor permission/runtime failure |
| surface.moved | SurfaceDomain | distanceMeters | Anchor movement |
| surface.rotated | SurfaceDomain | heading | Face orientation |
| surface.resized | SurfaceDomain | width, height | Dimension change |
| surface.changed | SurfaceDomain | revision, operation | Invalidate derived views |
| surface.validation_failed | SurfaceDomain | operation, errors | Reject invalid model |
| surface.undo / surface.redo | History | revision | Reversible editing |
| draft.local_saved | LocalRepository | revision | Local persistence |
| draft.restored | LocalRepository | revision | Draft hydration |
| draft.save_failed | LocalRepository | reason | Storage failure |
| ui.view_changed | UI | mode | Split/map/camera mode |
| ui.map_sheet_changed | UI | mode | Sheet state |
| diagnostics.exported | Diagnostics | eventCount | Evidence export |

## Required event envelope
```json
{"id":42,"type":"surface.rotated","at":"2026-11-18T10:00:00.000Z","payload":{"heading":135}}
```

## Rules
- Event names are stable lower-case dotted names.
- Payload changes require a catalog/schema version update.
- Do not log raw video, audio, precise location history, credentials or private asset URLs.
- A diagnostic hypothesis must cite the events and external evidence that support it.
- Events are observations, not commands. Commands are explicit user/domain operations.
- Future server events must add actor, tenant, correlation ID and idempotency key where applicable.
