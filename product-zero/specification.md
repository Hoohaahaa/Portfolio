# PRODUCT / ZERO — AI Product Design Operating System
Specification 1.0.0. Status: proposed platform. The website implements an interactive architectural proposal, not the platform.

## Audit and scope
The retained v4 film coupled the system argument to a confirmation checkbox. Its local model, validation and generated HTML are real deterministic code. Those remain at local-prototype.html. They are not agent execution evidence. The available local October 25 recording was reviewed as sampled frames; it shows the earlier reservation prototype, not the newly requested recording.

## Product requirements
Explain the proposition, twelve operational domains, execution mechanism, build plan and collaboration in a seekable 55-second presentation. Allow direct inspection without watching. Every domain exposes inputs, responsibilities, specialist identity, outputs, dependencies, human gate and verification. Catalog.json is the website/specification shared catalog. All twelve specialist capabilities are PROPOSED. Organizational fit and quality improvements REQUIRE VALIDATION.

## First real pilot
One organization, one approved product brief, three model-powered responsibilities, one flow, one runnable prototype and one reviewed engineering handoff. No autonomous discovery, live interviews, production write access, enterprise-wide automation or quantified savings. An organization must supply approved evidence, design-system tokens/components, sandbox/API constraints, named reviewers and evaluation criteria before execution.

## Platform boundaries
Proposed: web workspace → authenticated API → PostgreSQL model/registry → durable task runner → provider adapter / isolated artifact builder. Store immutable artifact payloads in object storage by content hash. Browser never receives provider secrets. Organization connectors sit behind a server-side policy layer. Start with manual approved uploads; add scoped read connectors after audit. External writes and release are separate, authorized operations.

## Entity relationships and invariants
Organization has Members and Policies. Project belongs to one Organization. ProjectRevision has immutable baseRevision, sourceRefs, requirements, decisions and artifactRefs. EvidenceSource has URI, suppliedBy, capturedAt, license/access scope, contentHash and uncertainty; synthetic content is not research. DecisionRecord references sourceRefs, alternatives, rationale and owner. Task references one project revision, dependencies and AgentDefinition. AgentRun references Task, provider/model, prompt/schema versions, status, usage, cost, startedAt, finishedAt and error. Artifact references revision, producing run, requirementRefs, sourceRefs, payloadHash and supersedes. Evaluation references exact artifact hashes, method, actual results and runner version. Approval references immutable revision/hash set, named authenticated reviewer, outcome and timestamp. IntegrationDelivery references approved hashes, target and idempotency key. Never infer approval from a UI checkbox or animation.

## Agent contracts
Common input: {taskId,organizationId,projectId,baseRevision,agentId,schemaVersion,inputRefs,dependencyIds,permissionScope,budget:{maxTokens,maxCost,currency,deadline}}. API validates tenant ownership, source access and prerequisite acceptance before enqueue.
A01 Frame: approved brief + evidence → requirements[{id,text,sourceRefs,acceptanceCriteria}], assumptions[], openQuestions[], constraints[]. Must not invent interview findings.
A02 Create: accepted A01 revision + approved component registry → alternatives[{id,tradeoffs,requirementRefs}], proposedDecision, flow{nodes,edges}, interface{componentIds,states,transitions}. Generate only allowlisted components; no arbitrary generated code in the primary app process.
A03 Evaluate: artifact hashes + requirements + actual runner reports → coverage[], defects[{severity,artifactRef,requirementRef}], uncertainties[], proposedHandoff. Model critique is explicitly separate from executed checks.
Every response carries sourceRefs, assumptions and uncertainties. Use JSON Schema draft 2020-12; reject unknown fields and invalid references. Provider adapter returns payload, providerRequestId, model, token usage and errors. Missing provider configuration returns NOT_CONFIGURED; no fallback fabricated payload.

## Workflow and state machine
Task: DRAFT → READY → RUNNING → SCHEMA_VALIDATION → EVALUATING → AWAITING_REVIEW → ACCEPTED. REVIEW_REJECTED returns to DRAFT with explicit feedback. Invalid output enters FAILED_VALIDATION. Transient provider/network failure enters RETRY_PENDING, at most two retries with exponential backoff within the original token/cost/deadline budget; exhausted attempts enter FAILED and require human intervention. Cancellation enters CANCELLED and cannot commit. Persist transitions transactionally; each invocation has an idempotency key. Only one active lease per task. Restart resumes persisted tasks; it does not replay side effects.
Artifact acceptance uses compare-and-swap against baseRevision. Conflict enters STALE; no automatic overwrite. An input revision invalidates dependent artifacts, evaluations and approvals transitively along catalog dependency edges. Cycles must be explicit iterative workflows with bounded iteration counts, never unbounded retries. Final acceptance creates a new immutable revision.

## API interfaces
POST /projects creates tenant-scoped project. POST /projects/{id}/revisions validates source references and creates draft revision. POST /tasks requires baseRevision and idempotencyKey. GET /tasks/{id} exposes persisted state and real attempts. POST /tasks/{id}/cancel revokes commit permission. GET /artifacts/{hash} checks access. POST /evaluations runs named actual checks. POST /approvals accepts reviewer identity, exact revision and hashes, outcome and rationale. POST /deliveries requires matching approval and authorized target. Return 401 unauthenticated, 403 unauthorized, 409 stale/idempotency conflict, 422 schema/reference invalid, 429 quota exceeded. Connector interface: capabilities(), read(ref,scope), prepareWrite(diff), commitWrite(approvalRef,idempotencyKey). No browser-side production connector implementation is supplied here.

## Security and governance
Tenant isolation on every query, object path and task. Server-side secrets, least privilege, reviewer roles distinct from generated agents. Treat imported documents as untrusted data: they cannot change policies or grant tools. Redact sensitive inputs from observability; log access and writes with retention policy. Signed artifact URLs expire. Isolated builds have restricted network, CPU/time/storage budgets and no organization secrets. Provider data handling, residency, deletion, retention, legal approval and SSO choice require organizational review.

## Evaluation
Freeze a representative approved brief set and baseline workflow before pilot. Score requirement coverage, source accuracy, functional defects, design-system compliance, accessibility findings, review/correction effort and actual usability observations. Compare equivalent scopes; record failures and costs. Do not claim value from schema checks alone. Human researchers authorize real studies; actual participant data stays in approved systems. Success thresholds are agreed before execution, not invented here.

## Backlog and acceptance tests
M0 Audit: document workflow, permissions, integration inventory, baseline and acceptance rubric; signed scope required.
M1 Spine: authenticated tenant isolation, immutable revisions, task registry, provider adapter, artifact hashes and audit trail. Tests: cross-tenant read denied; duplicate task request idempotent; stale revision commit rejected; cancellation cannot commit; budget caps stop execution.
M2 Slice: A01/A02/A03 contracts and allowlisted UI renderer. Tests: missing credentials returns NOT_CONFIGURED; fabricated source references rejected; invalid schema fails; transient retries bounded; real run usage retained; requirement change invalidates downstream artifacts; model critique never appears as executed browser test.
M3 Review + sandbox: authenticated hash-bound approval, actual browser runner and handoff. Tests: approval for V1 cannot deliver V2; rejected artifacts cannot deliver; export is reproducible; actual runner failures block acceptance; no external writes without scoped approval.
M4 Evaluate: human rubric, baseline comparison, actual user validation and go/no-go report. Expansion requires evidence and renewed scope.

## Unresolved decisions
Provider/model allowlist; maximum cost; deployment region; identity provider; data classification/retention; design-system/API availability; research access; connector priorities; accountable reviewers; quality thresholds. These are intake dependencies, not assumed facts.

## Implemented inventory
Implemented: guided proposal, GSAP play/pause/replay/seek, direct section/domain deep links, catalog inspection, local technical prototype retained. Proposed: platform API, durable orchestration, genuine model inference, organization integrations and authenticated approval. Requires validation: quality, usability, enterprise security and business value. Current test reports must identify their version; earlier v4 reports are not evidence for this revision.
