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

## Still being verified

Responsive viewports, renderer interactions, export and session reload are recorded in the browser QA result when those checks complete.

## Runtime boundary

The deployed app and durable session ingress work. Full model-powered generation is blocked by account-level AI Gateway access. The included pipeline has not completed an inference-enabled end-to-end run. The owner must enable eligible AI Gateway access/credits before using it for generation. Producer/evaluator IDs are configurable with `PRODUCER_MODEL` and `EVALUATOR_MODEL`, followed by redeployment. No provider key should be pasted into the app or chat.

## Local preview issue

The managed Next development preview served HTML but did not hydrate even a minimal React counter. The actual Vercel production build hydrated and responded to clicks. Browser checks use the production deployment.

## Storage limitation

Durable execution lives in Vercel Workflow. The workspace index is browser-local, and a shared artifact database is not connected. A Blob creation attempt returned 403 and did not create a store.
