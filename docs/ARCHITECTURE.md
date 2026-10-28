# Architecture v0.1

## Runtime and trust

A single owner authenticates with a server-side access key exchanged for an HTTP-only same-site cookie. The eve channel verifies it or a same-project Vercel OIDC caller; the UI never receives provider credentials. All output rendering uses text/structured components. No AI-authored code runs in the application process. No external write integrations are installed. Optional shell tools are disabled for every agent.

## Shared contracts

`lib/contracts.ts` is the authoritative Zod contract. Brief -> Research + Technology + Rubric -> UX -> UI -> Review. Artifact references use evidence IDs and requirement IDs. Workflow snapshots contain the brief, all current artifacts, revision number, checks and human decision. Snapshots are written through real `call.progress`/`call.settled` records. They are replayable after reopening a session URL.

## State machine

idle -> discovery (3 parallel specialists) -> architecture -> interface -> evaluation -> optional correction (one maximum) -> evaluation -> review (durable human wait) -> complete. Failed or cancelled model/tool calls are actual runtime failures, not successful draft outputs. A reviewer verdict of revise or any failed machine check blocks approval. New operations require a new session; source snapshots remain versioned within the run stream.

## Evaluations

Independent reviewer context uses Gemini 3.6 Flash, producer roles GPT 5.4 Mini. This reduces shared-context bias but does not prove independence or product quality. Code checks flow IDs/edges, screen navigation, requirement references, evidence IDs, citation URL shape, unique field IDs and body token contrast. They do not verify facts, research quality, usability or complete WCAG compliance.

## Prototype boundary

A UI artifact is a set of screens and typed blocks with navigate/submit actions. Required fields validate before a local success state. There is no production backend. All exports retain the same state contract and provenance. Exporting does not approve or deploy an artifact.

## Extension backlog

Production identity/RBAC; persistent cross-device artifact registry; document/file ingestion and redaction; complete design-system adapters/Figma sync; sandboxed arbitrary component generation and browser execution; retrieval quality metrics; source snapshot storage; organization-approved research recruitment; signed release gates; external integration transactions; budget-reservation ledger and server-side launch throttling; retention and backups.
