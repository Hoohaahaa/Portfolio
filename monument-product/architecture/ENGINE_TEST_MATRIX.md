# Spatial Engine 0.1 Test Matrix

Status: implementation test plan. Do not mark device acceptance until tested on hardware.

| ID | Test | Expected result | Related diagnostics |
|---|---|---|---|
| ENG-001 | Open /engine on mobile HTTPS | Layout fits viewport and safe areas; no horizontal overflow | UX-006 |
| ENG-002 | Start camera permission | Rear camera opens or clear error shown; no false live label | UX-006 |
| ENG-003 | Deny camera permission | Map and controls remain usable | UX-006 |
| ENG-004 | Allow location | Map centers on current position; accuracy shown | GEO-001, GEO-003 |
| ENG-005 | Deny location | Map placement remains possible; location state explicit | GEO-009 |
| ENG-006 | Rotate phone in open sky | Heading updates smoothly without permanent idle RAF | GEO-002, UX-006 |
| ENG-007 | Drag surface marker | Geographic anchor changes and baseline updates | GEO-003, GEO-007 |
| ENG-008 | Rotate face heading | Map baseline rotates perpendicular to face heading | GEO-002 |
| ENG-009 | Change width/height | Independent meter values update | GEO-005 |
| ENG-010 | Collapse/expand map sheet | Map resizes without broken tiles or lost state | UX-006 |
| ENG-011 | Toggle map/camera/split | Correct view fills screen and returns to split | UX-006 |
| ENG-012 | Undo/redo | Exact prior domain state restored | GEO-007 |
| ENG-013 | Save/reload | Local draft restored on same browser | GEO-010 |
| ENG-014 | Export diagnostics | JSON includes schema version, draft and bounded events | GEO-007 |
| ENG-015 | No VPS / approximate GPS | UI never claims world-locked precision | GEO-003, GEO-009 |

## Release truth
A green unit test or successful static build does not establish real camera, compass, GPS, browser permission, mobile viewport or map tile behavior. Record exact device/browser, OS, permission state, app commit and observed result for every physical test.
