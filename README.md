# PRODUCT / ZERO
## AI Product Design Operating System

A working single-owner pilot, separate from the cinematic proposal. Built with Next.js, eve durable agents, Vercel Workflow and AI Gateway.

### Run

Node 24, `npm ci`, then `npm run dev`. Deployed model inference uses Vercel project OIDC; locally configure `AI_GATEWAY_API_KEY` in an untracked `.env.local`. Use Vercel AI Gateway credits, not a ChatGPT subscription. The project does not require provider API keys.

Set `APP_ACCESS_TOKEN` as a random server-side secret for deployed environments. The owner can open `/api/access?key=...` to establish a secure HTTP-only cookie. This is a single-owner pilot, not enterprise identity. Vercel deployment protection is also enabled.

### Actual operation

1. The coordinator receives a typed brief and calls `design_operation`.
2. Research, technology/affordance exploration and independent rubric generation run concurrently in separate agent contexts.
3. The architect creates information architecture, a named flow graph and journey/edge cases.
4. The designer creates a constrained executable UI schema.
5. Contract checks run in code, and a separate model context critiques the actual artifacts.
6. At most one UI correction and re-evaluation cycle follows.
7. The workflow parks for human review. Failing drafts cannot be approved.

The evaluator cannot evaluate output that does not exist yet. It prepares its rubric in parallel, then critiques completed artifacts. No fabricated execution, tests or participant research is preloaded.

### Artifacts

Research plan, evidence ledger, requirements, acceptance criteria, alternatives, technology and affordance options, IA, flows, UI state contract, interactive prototype, evaluation findings and Markdown engineering specification. Export JSON, Markdown or dependency-free HTML. Ant, Material and Carbon use installed button/text-input components in the in-app prototype; remaining blocks use a semantic renderer. HTML export uses the semantic renderer without those dependencies.

### Persistence

eve checkpoints and resumes sessions through Vercel Workflow. The browser stores a workspace index, not execution state. Run URLs reconnect to durable sessions. Save/export important artifacts within the platform retention period. A cross-device project database is not connected. Blob provisioning via the current connector was rejected with a 403; no store was created.

### Limits

Research plans are executable guidance, not completed human research. Source lookup is optional and provider-billed. Citation content, usability, broad accessibility, security and real integrations need review. Custom design systems currently mean token input, not full Figma library import. Generated UI is a restricted interactive schema, not an arbitrary application/backend generator. No agents may publish, send communications, recruit participants, spend on purchases or execute arbitrary generated code.

Model-budget guards pause before another call once reported usage crosses $2 per root session window or $0.65 per child; the crossing call can finish, so these are not absolute billing caps. At most one automatic correction is allowed. Budget prompts require a person; do not enable uncapped loops.

### Verification

`npm test`, `npm run typecheck`, `npm run build:eve`, `npm run build`. See `docs/QA.md` for actual verification, including limits. Tests use authored fixtures and are never displayed as AI-produced work.

## Model access required
Actual GPT 5.4 Mini and promotional Beam Free inference attempts were both rejected by this account's AI Gateway free-tier policy. No generation success is claimed. No purchase or upgrade was performed. Enable appropriate Gateway account access or credits before generation. Set `PRODUCER_MODEL` and `EVALUATOR_MODEL` to catalog model IDs and redeploy to change models. Defaults are GPT 5.4 Mini and Gemini 3.6 Flash in separate contexts.
