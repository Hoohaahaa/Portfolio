# Spatial Engine Geometry Notes

Status: v0.1 mathematical contract. Earth model is a spherical approximation for the browser prototype; this is not survey-grade geodesy.

## Symbols and units

- (R = 6{,}371{,}008.8\,m): mean spherical Earth radius used in v0.1.
- (phi): latitude in radians.
- (lambda): longitude in radians.
- (	heta): bearing, clockwise from north.
- (d): surface distance in meters.
- (w): panel width in meters.
- (h): panel height in meters.
- (psi): device heading.
- (eta): bearing from observer to surface anchor.

Convert degrees to radians before evaluating trigonometric functions.

## Great-circle distance (Haversine)

For two points ((phi_1,lambda_1)), ((phi_2,lambda_2)):

[
a=\sin^2\left(\frac{\phi_2-\phi_1}{2}\right)+\cos\phi_1\cos\phi_2\sin^2\left(\frac{\lambda_2-\lambda_1}{2}\right)
]

[
d=2R\arcsin(\sqrt{a})
]

## Initial bearing

[
y=\sin(\Delta\lambda)\cos\phi_2
]

[
x=\cos\phi_1\sin\phi_2-\sin\phi_1\cos\phi_2\cos(\Delta\lambda)
]

[
\theta=\operatorname{normalize}_{[0,360)}(\operatorname{atan2}(y,x))
]

The initial bearing is not generally equal to the final bearing over long distances.

## Destination point

Given origin ((\phi_1,\lambda_1)), bearing (\theta), and angular distance (\delta=d/R):

[
\phi_2=\arcsin(\sin\phi_1\cos\delta+\cos\phi_1\sin\delta\cos\theta)
]

[
\lambda_2=\lambda_1+\operatorname{atan2}(\sin\theta\sin\delta\cos\phi_1,\cos\delta-\sin\phi_1\sin\phi_2)
]

Longitude is normalized to ([-180°,180°)).

## Vertical panel baseline

The stored face heading (\theta_f) is the outward normal of the vertical surface. Its horizontal baseline axis is:

[
\theta_b=\operatorname{normalize}(\theta_f+90°)
]

The two baseline endpoints are:

[
P_- = \operatorname{destination}(P_0,\theta_b+180°,w/2)
]

[
P_+ = \operatorname{destination}(P_0,\theta_b,w/2)
]

This keeps the geographic baseline centered on the anchor and perpendicular to the front-face direction. It is not a 10 km local Cartesian line.

## Front-face visibility

Let (\beta_{s\to o}) be the bearing from the surface anchor to the observer. The observer is on the front side when:

[
|\operatorname{signedDelta}(\beta_{s\to o},\theta_f)|\leq90°
]

This is a hemisphere test, not occlusion testing.

## Approximate camera projection

For a nominal horizontal field of view (F), the relative horizontal angle is:

[
\Delta\psi=\operatorname{signedDelta}(\beta,\psi)
]

The normalized horizontal screen coordinate is approximated by:

[
x_{screen}=50+50\frac{\tan(\Delta\psi)}{\tan(F/2)}
]

A nominal vertical FOV is used to scale apparent height:

`h_screen = 100 × (2 × atan(h / (2d))) / F_v`

This is only a directional projection. The prototype does not know the phone camera's calibrated intrinsics, lens distortion, camera pose in a world coordinate frame, device pitch calibration, depth occlusion or VPS correction. It must never be called world-locked AR.

## Terrain-following vertical curtain (future mesh)

For each geographic baseline sample (P_i), query terrain elevation (H_i) from a named dataset and vertical datum. Convert the lower vertex to an Earth-aware position (B_i), derive local gravity/up vector (U_i), then:

[
T_i=B_i+hU_i
]

Connect adjacent pairs ((B_i,B_{i+1},T_{i+1},T_i)) into mesh quads.

This implements the accepted ADR: lower edge follows terrain; height remains constant above local terrain; the surface remains vertical. It does not drape the entire wall over terrain.

Unknown terrain samples remain unknown. Do not replace missing elevations with zero or silently interpolate across cliffs.

## Accuracy and scale boundaries

- v0.1 uses a spherical Earth approximation, appropriate only for the prototype's short baseline operations.
- Large extents require ellipsoidal geodesics, ECEF coordinates, local tangent frames, geographic tiling and floating-origin/camera-relative rendering.
- A map projection is for map display; it is not the authoritative spatial coordinate system.
- Compass heading may be magnetic, noisy or device-orientation-relative. True-north alignment requires a validated sensor/geospatial source.
- Height above terrain, height above ellipsoid and height above mean sea level are different quantities.
