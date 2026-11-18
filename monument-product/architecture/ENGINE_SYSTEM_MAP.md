# Spatial Engine System Map

Status: prototype architecture map.

```mermaid
flowchart TB
  UI[Live Edit UI] --> CMD[Domain Commands]
  CMD --> CORE[Spatial Core]
  CORE --> STORE[Canonical Surface Draft]
  CORE --> BUS[Typed Event Bus]
  STORE --> MAP[Map Projection Adapter]
  STORE --> CAM[Camera Projection Adapter]
  LOC[Geolocation Adapter] --> POSE[Pose State]
  ORI[Device Orientation Adapter] --> POSE
  CAMDEV[Camera Adapter] --> UI
  POSE --> CAM
  POSE --> BUS
  MAP --> BUS
  CAM --> BUS
  BUS --> DIAG[Diagnostics / Event Stream]
  STORE --> LOCAL[Local Draft Repository]
  TERRAIN[Future Terrain Provider] -. future .-> CORE
  AR[Future ARCore Geospatial Adapter] -. future .-> POSE
  LOCAL -. future backend adapter .-> API[Monument API]
```

## Runtime state flow
```mermaid
stateDiagram-v2
  [*] --> Idle
  Idle --> RequestingPermissions: Start field session
  RequestingPermissions --> CameraActive: camera granted
  RequestingPermissions --> Degraded: camera denied / unavailable
  CameraActive --> ApproximatePose: GPS + heading available
  CameraActive --> Degraded: pose incomplete
  ApproximatePose --> Editing: map edit
  Editing --> Resolving: drag ends / geometry update
  Resolving --> ApproximatePose: derived views updated
  ApproximatePose --> Relocalizing: location or heading lost
  Relocalizing --> ApproximatePose: signals restored
  Degraded --> Idle: Stop
  ApproximatePose --> Idle: Stop
```

## Coordinate pipeline
Map pointer (EPSG:3857) → Leaflet LatLng → WGS84 anchor → geodesic endpoints → map footprint.
Device GPS + heading → approximate pose → observer-to-anchor bearing → FOV projection → camera overlay.
The two projections share the same domain draft; neither projection is the source of truth.
