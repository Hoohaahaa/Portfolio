{"name":"monument-studio-v1","commit":{"sha":"edb2380f9e95ef4602dba394b3dc6dd3d497a5fc","node_id":"C_kwDOTPuXetoAKGVkYjIzODBmOWU5NWVmNDYwMmRiYTM5NGIzZGM2ZGQzZDQ5N2E1ZmM","commit":{"author":{"name":"Mono","email":"shahmohamadvi@gmail.com","date":"2026-11-17T19:25:17Z"},"committer":{"name":"Mono","email":"shahmohamadvi@gmail.com","date":"2026-11-17T19:25:17Z"},"message":"Document root cause and remediation for missing spatial media","tree":{"sha":"4f94010c5716a43f014213951471d5dbaa0637ca","url":"https://api.github.com/repos/Hoohaahaa/Portfolio/git/trees/4f94010c5716a43f014213951471d5dbaa0637ca"},"url":"https://api.github.com/repos/Hoohaahaa/Portfolio/git/commits/edb2380f9e95ef4602dba394b3dc6dd3d497a5fc","comment_count":0,"verification":{"verified":false,"reason":"unsigned","signature":null,"payload":null,"verified_at":null}},"url":"https://api.github.com/repos/Hoohaahaa/Portfolio/commits/edb2380f9e95ef4602dba394b3dc6dd3d497a5fc","html_url":"https://github.com/Hoohaahaa/Portfolio/commit/edb2380f9e95ef4602dba394b3dc6dd3d497a5fc","comments_url":"https://api.github.com/repos/Hoohaahaa/Portfolio/commits/edb2380f9e95ef4602dba394b3dc6dd3d497a5fc/comments","author":{"login":"Hoohaahaa","id":187856011,"node_id":"U_kgDOCzJ0iw","avatar_url":"https://avatars.githubusercontent.com/u/187856011?v=4","gravatar_id":"","url":"https://api.github.com/users/Hoohaahaa","html_url":"https://github.com/Hoohaahaa","followers_url":"https://api.github.com/users/Hoohaahaa/followers","following_url":"https://api.github.com/users/Hoohaahaa/following{/other_user}","gists_url":"https://api.github.com/users/Hoohaahaa/gists{/gist_id}","starred_url":"https://api.github.com/users/Hoohaahaa/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/Hoohaahaa/subscriptions","organizations_url":"https://api.github.com/users/Hoohaahaa/orgs","repos_url":"https://api.github.com/users/Hoohaahaa/repos","events_url":"https://api.github.com/users/Hoohaahaa/events{/privacy}","received_events_url":"https://api.github.com/users/Hoohaahaa/received_events","type":"User","user_view_type":"public","site_admin":false},"committer":{"login":"Hoohaahaa","id":187856011,"node_id":"U_kgDOCzJ0iw","avatar_url":"https://avatars.githubusercontent.com/u/187856011?v=4","gravatar_id":"","url":"https://api.github.com/users/Hoohaahaa","html_url":"https://github.com/Hoohaahaa","followers_url":"https://api.github.com/users/Hoohaahaa/followers","following_url":"https://api.github.com/users/Hoohaahaa/following{/other_user}","gists_url":"https://api.github.com/users/Hoohaahaa/gists{/gist_id}","starred_url":"https://api.github.com/users/Hoohaahaa/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/Hoohaahaa/subscriptions","organizations_url":"https://api.github.com/users/Hoohaahaa/orgs","repos_url":"https://api.github.com/users/Hoohaahaa/repos","events_url":"https://api.github.com/users/Hoohaahaa/events{/privacy}","received_events_url":"https://api.github.com/users/Hoohaahaa/received_events","type":"User","user_view_type":"public","site_admin":false},"parents":[{"sha":"50f40648a0ba6ee5ce2631d998f8179d31160492","url":"https://api.github.com/repos/Hoohaahaa/Portfolio/commits/50f40648a0ba6ee5ce2631d998f8179d31160492","html_url":"https://github.com/Hoohaahaa/Portfolio/commit/50f40648a0ba6ee5ce2631d998f8179d31160492"}]},"_links":{"self":"https://api.github.com/repos/Hoohaahaa/Portfolio/branches/monument-studio-v1","html":"https://github.com/Hoohaahaa/Portfolio/tree/monument-studio-v1"},"protected":false,"protection":{"enabled":false,"required_status_checks":{"enforcement_level":"off","contexts":[],"checks":[]}},"protection_url":"https://api.github.com/repos/Hoohaahaa/Portfolio/branches/monument-studio-v1/protection"}
 
### UX-006 — Field Test rendering is frame-loop bound and unstable
- Severity: Critical
- Area: Outdoor Field Test / mobile runtime
- Observed: The surface was recalculated and layout-affecting position, width and height styles were written on every animation frame, including when sensor data had not changed. The preview path recursively requested frames forever. Live camera video was combined with multiple backdrop blurs.
- Expected: Coalesce sensor updates into a single render, update only on sensor changes, animate composited transforms, and avoid expensive blur over live camera frames. No idle perpetual animation loop.
- Status: Event-driven rendering, reduced camera resolution/frame rate, and blur removal implemented on the feature branch; build and physical-device verification pending.
- Verification: Compare idle CPU, camera-on frame stability, compass jitter, GPS update cadence, portrait/landscape, and camera-denied states on Android and iOS.

### UX-007 — Indoor media surface did not support uploaded video
- Severity: High
- Area: Content / Indoor Field Test
- Observed: Indoor Field Test rendered an image-only media region and the authoring UI accepted only a URL.
- Expected: Render image or video from a canonical media asset; show a visible empty/error state; use native controls for video.
- Status: Local device upload and video rendering added. Files are stored in IndexedDB on this device only; cross-device sync and public publishing remain blocked until a backend upload endpoint is connected.
- Verification: Upload JPG, PNG, WebP, GIF, MP4, WebM and MOV on Android/iOS; reload; test offline and browser codec support.

### PLATFORM-002 — Managed media upload and asset API
- Severity: Critical
- Area: Asset infrastructure
- Expected: Authenticated upload-intent endpoint, private object storage, server-validated MIME/size, canonical Asset ID, metadata record, safe delivery URLs, cleanup and ownership checks. Store bytes in object storage, not Postgres or localStorage.
- Status: A private `monument-assets` bucket exists on the isolated Neon preview branch. `DATABASE_URL` is now configured as an encrypted Preview-only Vercel variable pointing to that isolated branch; Production is untouched. The app still has no upload-intent API wired to the bucket. Local IndexedDB upload is an interim phone workflow, not a cloud asset service.
- Verification: Upload from mobile, reopen on another device, publish/replace/delete, verify private access and signed delivery URLs, and test preview/production branch isolation.


### DEPLOY-001 — Latest feature commit blocked by Vercel daily deployment quota
- Severity: High
- Area: Preview delivery
- Observed: Vercel accepted a Preview deployment for commit `079078e`, then rejected a newer deployment request with HTTP 402 (`api-deployments-free-per-day`, retry after 24 hours). The later mobile upload UI and visitor video rendering commits are on GitHub but not deployed.
- Expected: Every handoff link must point to the exact feature commit and show READY before device testing.
- Status: Waiting for Vercel quota reset or user billing/plan action. Existing READY preview is older and must not be represented as containing the latest upload UI.
- Verification: Deploy latest branch head, confirm deployment commit SHA, run build/tests, then perform Android device test.


### UX-008 — Indoor camera action is buried and QR camera can appear blank
- Severity: Critical
- Area: Indoor Field Test / mobile camera
- Observed: The primary camera action was only available inside the Place editor tab and the field-test experience presented one selected item without a useful overview of related indoor experiences. The QR scanner depended on BarcodeDetector support before a camera preview could be useful.
- Expected: Keep the indoor camera action visible regardless of editor tab; show the selected experience as a clear media-led feature; group related indoor experiences into selectable cards by place; keep Session AR secondary; open a live camera preview even when browser QR detection is unavailable.
- Status: Implemented on feature branch. Camera startup now requests the rear camera, waits for video metadata, starts playback, and treats QR detection as optional. Indoor Field Test now groups related experiences into cards and keeps the camera action in a persistent dock.
- Verification: Pending real Android/iOS device test. Confirm HTTPS permission flow, live video on screen, camera denial/retry, app background/foreground, QR detection supported/unsupported, video media, multiple experiences at one place, long titles, small screens and safe-area layout.
- Known limitation: Browser BarcodeDetector support varies. Without it, the camera preview opens but automatic QR matching is unavailable; the content remains accessible in the Field Test page.
