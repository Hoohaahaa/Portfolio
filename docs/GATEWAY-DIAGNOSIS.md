# AI Gateway diagnosis / 2026-10-28

## Result

A real deployed request succeeded on Hobby without a purchase or upgrade. The former conclusion that the whole account required payment was too broad. This was a model-eligibility problem.

## Verified configuration

- Correct project: `prj_V02TOMJzE5iidGAYlIuDnXiHgqp9`, production, Node 24, existing Next/eve runtime.
- Environment inventory contains the owner access secret; no custom producer/evaluator override or Gateway API key is configured.
- Authenticated `gateway.getCredits()` returned balance `5`, totalUsed `0`. The successful inference also establishes that request authentication worked.
- `VERCEL_OIDC_TOKEN` is absent from the process environment. This is not an auth failure: the installed `@vercel/oidc` also resolves Vercel's request-scoped `x-vercel-oidc-token` through platform context. No token was printed or returned.
- Public model metadata marks GPT 5.4 Mini, Gemini 3.6 Flash and Beam Free `availableToFreeTier: false`.
- Nemotron 3.5 Lightning Free is `availableToFreeTier: true`; the live `/v1/models` endpoint lists input/output price 0, tool calling and structured output support.

## Executed smoke test

`POST /api/connection`: HTTP 200, actual text `READY`, 22 input tokens, 148 output tokens (including 144 reasoning tokens), 170 total tokens. Gateway cost `0`, one successful NVIDIA provider attempt, no fallback. Generation `gen_01M60V222DETWBG65NYK1BF4JV`. Raw response is in `gateway-account-and-smoke.json`.

Minimum payment needed for this demonstrated call: **$0**. No credit purchase, Pro upgrade, auto top-up, paid fallback or billing change was made. Promotional availability is not guaranteed indefinitely.

## Actual agent execution

The synthetic studio-session brief ran through genuine specialist calls, independent rubric generation, IA/flow, UI, machine checks, critique and correction. It reached review with an actual two-screen draft, seven requirements and 8/8 contract checks passed. The final model verdict remains `revise` with eight findings. Human approval was not performed. These are generated drafts and model critiques, not human research or verified usability evidence.

The first correction failed its output schema, and the coordinator unexpectedly started the whole pipeline again before the second attempt reached review. This was observed, not hidden. The source now preserves the failed snapshot and parks for human direction on a specialist failure, and includes a token budget because a dollar-only limit cannot bound a zero-priced model. Typecheck and eve compilation passed; deliberate live fault-injection of this new failure gate has not been performed.

`actual-generated-draft.json` and `actual-run-summary.json` preserve the actual outputs and limitations. The authored renderer fixture remains separate.

## Access limitations

The Vercel Agent Runs connector returned 403 for its observability-list endpoint. No mapped CLI was installed. The execution evidence comes directly from the application's authenticated eve stream, not from a fabricated dashboard log. That connector permission is separate from successful model access.

## Trial boundary

The chosen free endpoint logs prompts and outputs for NVIDIA product improvement and is trial-only. Use synthetic non-confidential inputs. It is not approved here for confidential organizational work. The producer and evaluator share a model but have separate contexts; no model-diversity claim is made.

## UI preservation

`app/globals.css`, `app/workspace.tsx` and `app/_components/prototype.tsx` hashes are unchanged from the accepted design. Only backend model selection, diagnostics and failure handling changed. Dynamic outputs and the displayed configured model update normally.

## Reproduce

Open the private workspace, use System → Test model connection, then New operation. Leave public search off for a zero-inference-price test. A fresh run is a draft and stops for human review. The source includes `scripts/smoke-operation.mjs` and `scripts/inspect-operation.mjs`; credentials must be supplied privately through environment variables and must never be committed.
