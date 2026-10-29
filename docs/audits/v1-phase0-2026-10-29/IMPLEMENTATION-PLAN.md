# V1 execution plan and preservation gates

Status: proposed implementation sequence following Phase 0. No V1 feature is declared complete.

## Order of work

| Priority | Deliverable | Gate before expanding |
| --- | --- | --- |
| P0 / S1 | Project/version contracts, legacy import, real persistent ProjectStore adapter | Reopen accepted project and preserve every imported legacy reference/hash |
| P0 / S2 | Typed execution/approval/readiness selectors and evidence links | Failed/rejected states and compute approvals cannot appear as accepted design output |
| P0 / S3 | One trusted application-source build path and isolated real preview | Core keyboard/audio interactions execute; unsupported camera capability is explicit |
| P0 / S4 | Component-scoped impact plan, locks, approved patch and functional testing | Only approved paths/entities change; tests cannot be weakened |
| P0 / S5 | Compare, accept, immutable save, reopen and revert | All ten mission acceptance behaviors demonstrated with records |
| Later | Richer scopes, camera runtime, travel data/maps, specialized agents and integrations | Add only after the complete first loop passes |

Treat S1–S5 as one smallest complete vertical slice, delivered incrementally on an isolated branch. A successful isolated stage is not a declaration that the whole milestone passed. There is no promise that five iterations finish any complex product.

## First real application and revision

Use a small **keyboard-playable Web Audio instrument**, connected to a real project/source version. It has explicit audio start/mute controls, keyboard note on/off, waveform selection, a frequency display, bounded gain and focus-safe controls. It does not request camera or microphone. The first preview declares camera tracking unsupported; do not label it a completed camera-controlled instrument.

From the accepted base, select the waveform component and request one precise behavior change, such as adding triangle waveform selection. Lock the note mapping, gain/mute path, layout/tokens and every unrelated source file. The impact plan declares the exact component, audio-mapping dependency, relevant acceptance tests, file allowlist, code hashes, proposed version, estimated usage and risks. Changing a locked file blocks the candidate; a broader change needs a new plan.

Build the candidate, run actual tests, show code and rendered comparison, then let the owner accept or revert. Acceptance commits the new immutable version and advances the accepted pointer atomically. Revert creates a traceable version restoring previous behavior. Unaccepted candidates never overwrite the working version.

## Acceptance evidence for the complete first slice

| Mission behavior | Required demonstration |
| --- | --- |
| 1 / Create from brief | Persisted project ID, original brief, chosen app capabilities and accepted initial manifest |
| 2 / Actual application | Source files + successful build report; executable Web Audio code, not UI-block text |
| 3 / Open and interact | Actual browser actions proving start, note press/release, waveform change and mute; no console errors |
| 4 / Select scope | Stable component ID maps to source path/export symbol and requirement/test IDs |
| 5 / Describe and lock | Persisted change request and lock manifest; an attempted unrelated edit is rejected |
| 6 / Approve plan | Recorded change-plan/compute approval for the exact scope/digest; separate from artifact acceptance |
| 7 / Revised app and comparison | Built candidate; behavior reports; before/after source and visual evidence for the same versions |
| 8 / Accept or revert | Both acceptance and a demonstrated revert preserve the prior accepted source |
| 9 / Reopen and continue | New browser session loads the same persisted accepted version without regeneration |
| 10 / Understand status/cost | One Overview links directly to pending action, run, findings, artifacts and actual cost records |

Audio test evidence may verify AudioContext state, oscillator frequency and gain scheduling. It must not claim audible quality, physical speaker level or camera/audio end-to-end latency without those measurements. Use the actual available browser; absence of a test runner is a blocked gate, not a generated test result.

## Regression and visual preservation

- Keep current neo-grotesk fonts, warm paper/graphite/orange palette, spacing, rail/bottom navigation and responsive composition. Use existing controls and focus styling for functional extensions. No layout rebase or generic chat/dashboard replacement.
- `evidence/source-baseline-hashes.json` freezes key source/font files. Production code is unchanged by Phase 0.
- Capture authenticated empty, running, failed, awaiting-review and completed-with-warnings states before functional UI edits. Current Phase 0 browser inspection covered only the unauthenticated shell; do not treat it as a complete authenticated golden set.
- Exact CSS viewports for future tests: 320, 375, 390, 430, 768, 1280, 1440. Fix the QA harness's 2 px frame-border discrepancy before claiming exact viewport coverage. Preserve all content and touch targets; mask only documented dynamic IDs/timestamps in visual diffs.
- Use screenshot comparisons for unchanged shell regions, overflow checks, heading bounds, navigation, focus visibility, keyboard interactions, reduced-motion preference, error recovery and preview isolation. New behavior must not erase the existing Artifacts tabs or exports.
- Run old contract tests plus canonical graph/lock/CAS tests. Add actual browser behavior tests tied to requirement IDs; do not replace them with schema-only checks.
- Keep legacy semantic exports available under their explicit low-fidelity type. Failed/unapproved artifacts must display status when exported, without pretending that export grants approval.

## Migration and rollback

Import legacy records into new IDs with a retained mapping. Do not mutate original runtime events or deduplicate distinct attempts solely by v1/v2. Keep legacy URLs readable. Back up the current accepted head, manifest and browser run index before enabling new persistence writes. Migrate on a separate branch and compare artifact counts and hashes. Any conflict/failing migration blocks promotion. Keep the checkpoint until both reopen and revert are verified.

## Cost, dependency and access risks

| Risk | Required control / unresolved input |
| --- | --- |
| Promotional free model changes | Verify price, eligibility and supported output/tool contracts before dispatch; no paid fallback |
| Free provider retains data | Synthetic/public pilot inputs only unless specific informed permission; default unknown privacy blocks transmission |
| Unbounded free-token loops | Project + operation + child token/call/time reservations; no full-DAG retry |
| Optional research can incur tool cost | Disable in code until source scope, provider permission and zero/approved cost are known |
| Durable product storage not configured | Implement/verify Git-backed ProjectStore connection or mark persistence blocked; do not use temporary disk |
| Private GitHub compute may bill | Verify account allowance and hard stop before enabling Actions; no larger/paid runners or overage |
| Generated source is untrusted | Fixed dependencies/build config; no execution inside the owner backend; isolate previews/tests; no secrets |
| Concurrent revisions lose updates | Expected-head acceptance, immutable candidates, stale-base rejection and explicit merge plan |
| Hardware limitations | Separate simulated/browser checks from real camera, audio latency and real-user validation |
| Agent error hidden by UI | Typed error category, last successful checkpoint, next action and evidence link on Overview |

The audit does not create any of the missing integrations or authorize spending. Next implementation starts from the preserved branch and gates these prerequisites before advertising persistence or unattended validation.
