# Spatial Engine Lab — UX and Engineering Issue Register

Status: living register. Last updated: 2026-11-18. Related: [existing UX issue log](../UX_ISSUES.md).

This register carries forward the user's earlier field-test feedback. The new Spatial Lab is a separate tool; fixes here do not imply that older Field Test paths are automatically fixed.

| ID | Severity | Area | Observed / required behavior | Current status | Verification still required |
|---|---|---|---|---|---|
| LAB-UX-001 | Critical | Render loop | Do not repeat the previous perpetual RAF/layout-write problem. Update from sensor and interaction events only. | Implemented in Spatial Lab; no idle RAF loop. | Measure idle CPU and camera-on frame stability on Android. |
| LAB-UX-002 | High | Diagnostics hierarchy | Technical data must not flood the main scene or block placement/editing. | Implemented as a secondary diagnostics drawer. | Verify drawer is closed by default and usable on small screens. |
| LAB-UX-003 | High | Authoring hierarchy | When content authoring is integrated, preserve Location → Space → Content selection. Do not mix all content and locations into one flat selector. | Recorded as a future product constraint; not part of single-surface Lab v0.1. | Validate the flow before adding content authoring. |
| LAB-UX-004 | High | Visual language | Do not restore the rejected green UI theme. Use the Portfolio orange accent (#FF573D), clear grouping and restrained technical typography. | Implemented in the Spatial Lab UI. | Review on actual device for contrast and hierarchy. |
| LAB-UX-005 | High | Mobile map interaction | Map/control sheet must move vertically, resize continuously and support expanded/collapsed states. | Implemented with pointer drag and snap states. | Test touch drag, map gestures and screen rotation on Android. |
| LAB-UX-006 | High | View modes | Camera and map must each be independently expandable to a full-viewport working mode and return to split view. | Implemented as map, camera and split modes. | Test repeated switching and Leaflet resize on phone. |
| LAB-UX-007 | High | Orientation | Compass must visibly report unavailable/permission errors; never substitute a guessed heading. | Implemented with permission handling and explicit unavailable state. | Test Chrome on the target Galaxy A32 and compare with a known bearing. |
| LAB-UX-008 | Critical | AR truthfulness | A camera overlay must not be presented as persistent world-locked AR or terrain-correct rendering. | Explicit approximate / NOT WORLD-LOCKED labels; terrain fallback marked unverified. | Keep the warning until native Geospatial tracking and terrain are physically verified. |
| LAB-UX-009 | Medium | Touch controls | Controls must remain usable in portrait, landscape and short-height viewports. | Responsive breakpoints and minimum touch targets added. | Physical-device screenshot review remains pending. |
| LAB-UX-010 | High | Draft safety | A failed sensor permission must not prevent map-only editing or destroy a saved draft. | Map editing and local draft are independent of camera/sensor success. | Test denied permissions and browser restart. |
| LAB-UX-011 | High | Media visibility | Earlier Field Test had an image visibility failure indoors and empty/blank outdoor state. Keep visible empty/error states when media is later added to Spatial Lab. | Not in scope for single-surface geometry prototype; prior media work remains separately tracked. | Add media only with a canonical asset reference and explicit loading/error/empty states. |

## Verification policy

- "Implemented" means code exists; it is not a device pass.
- Attach device, OS, browser, commit, reproduction steps and screenshots to every physical verification.
- Do not close a critical issue from a successful build alone.
- When a user sends a screenshot, record the observed defect before changing code and link the relevant issue ID.
