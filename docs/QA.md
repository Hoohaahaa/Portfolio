# QA record / 2026-10-28

## Executed

- 10 Node contract tests passed. Authored fixtures are clearly test data, never AI execution evidence.
- TypeScript check passed after removal of stale generated route types.
- Next production build passed; Carbon CSS emits four upstream `@position-try` compatibility warnings.
- eve compiler built the real coordinator, specialist definitions and durable workflow tool.
- Production browser: owner access link, navigation, intake, authored brief selection, submit and actual session creation tested.
- A real durable session was created: `wrun_41M60NAEZM0GWXMRH2F8BMVC19`. It recorded `session.started` and `turn.settled` with outcome `failed`.
- Direct inference with GPT 5.4 Mini was rejected by this account's AI Gateway free-tier policy.
- A second real inference attempt with catalog-listed `reflection/beam-free` was also rejected by the same policy.
- No AI-generated research, UX, UI or approval is claimed. No credits were purchased.

## Browser checks executed

- Production operating desk measured inside actual responsive iframe viewports: 320, 375, 390, 430, 768, 1280 and 1440 CSS px. Overview had no horizontal overflow. Classic scrollbar consumed 17 px in most measurements; raw client and scroll widths are in `browser-qa-results.json`.
- Inspected actual screenshots at narrow mobile and desktop. Mobile uses vertical dependencies and a bottom workspace navigation rather than a shrunken desktop graph.
- Desktop Overview, Operation, Artifacts, Review and System navigation changed to the expected content.
- Mobile 320 px navigation was verified through accessibility targets. The browser's frame locator click did not reliably activate fixed navigation; accessibility-index clicks did. This is recorded rather than counted as a product success from the failed click.
- Found a 5 px overflow in the 320 px Artifacts view. Removed its negative tab-strip margin and retested the released deployment: clientWidth 303, scrollWidth 303. The regression passed.
- Intake opens at mobile width; Escape closes the native dialog. Dialog width stayed within the frame.
- Authored renderer fixture tested in none, Ant, Material, Carbon and custom modes: required-field rejection, valid local submission, screen navigation and reset. No fixture is claimed as generated output.
- Real failed-session reload was previously verified on its deployment. Reconnection restored actual events and provider failure. Successful browser-closed generation, approval and generated exports remain unverified because inference is blocked.

## Not executed / not claimed

- No successful full AI pipeline run or overnight successful generation.
- No live human approval interaction, generated artifact export or production integration.
- No OS-level touch device or reduced-motion preference emulation. CSS and GSAP include reduced-motion handling, but that behavior has not been browser-emulated in this QA run.
- No comprehensive accessibility, security or research-quality certification.

## Runtime boundary

The deployed app and durable session ingress work. Full model-powered generation is blocked by account-level AI Gateway access. The included pipeline has not completed an inference-enabled end-to-end run. The owner must enable eligible AI Gateway access/credits before using it for generation. Producer/evaluator IDs are configurable with `PRODUCER_MODEL` and `EVALUATOR_MODEL`, followed by redeployment. No provider key should be pasted into the app or chat.

## Local preview issue

The managed Next development preview served HTML but did not hydrate even a minimal React counter. The actual Vercel production build hydrated and responded to clicks. Browser checks use the production deployment.

## Storage limitation

Durable execution lives in Vercel Workflow. The workspace index is browser-local, and a shared artifact database is not connected. A Blob creation attempt returned 403 and did not create a store.

## Release

Production deployment `dpl_JCL8WoitobPSDofHBuDXXgRwBmHA` reached READY. It includes the mobile tab gutter correction. Documentation added after deployment records the completed regression; application code is identical.
