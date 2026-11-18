# Monument Product & Engineering Docs

Status: living product documentation. Last updated: 2026-11-18.

## Start here
- [Spatial system architecture](architecture/SPATIAL_SYSTEM.md)
- [Live Edit specification](architecture/LIVE_EDIT.md)
- [ADR-001: Vertical / Follow geometry](architecture/ADR-001-VERTICAL-FOLLOW.md)
- [Technology options](architecture/TECHNOLOGY_OPTIONS.md)
- [Field test playbook](testing/FIELD_TEST_PLAYBOOK.md)
- [Diagnostic matrix](testing/DIAGNOSTIC_MATRIX.md)
- [Existing UX issue log](UX_ISSUES.md)

## Documentation truth labels
- Verified: reproduced or confirmed by authoritative evidence.
- Implemented: present in code, but not necessarily physically verified.
- Proposed: selected direction awaiting implementation.
- Hypothesis: plausible explanation awaiting a discriminating test.
- Unknown: not yet established.

A passing build is not proof of working sensors, VPS, terrain data, world-locked AR or phone performance. Browser overlays must not be described as native Geospatial AR.

When a field test fails, record the symptom, exact device variant, Android/runtime versions, app commit, permission state, tracking state, terrain source, logs and reproduction steps. Link the report to diagnostic IDs before changing code.

## Relationship to NO OS
Monument remains an independently owned product. NO OS is an engineering and decision-making reference, not a runtime dependency or shared customer-data store.

Guiding references:
- [NO OS Principles](https://github.com/Hoohaahaa/no-os/blob/main/PRINCIPLES.md)
- [NO OS Thinking & Research Method](https://github.com/Hoohaahaa/no-os/blob/main/THINKING.md)
- [NO OS Engineering Standards](https://github.com/Hoohaahaa/no-os/blob/main/ENGINEERING.md)
- [NO OS Evaluation Framework](https://github.com/Hoohaahaa/no-os/blob/main/EVALUATION.md)
- [NO OS Blind Spots](https://github.com/Hoohaahaa/no-os/blob/main/BLIND_SPOTS.md)
- [NO OS ADR 0001 — Product Boundaries](https://github.com/Hoohaahaa/no-os/blob/main/DECISIONS/0001-foundation-and-product-boundaries.md)
- [NO OS ADR 0002 — Modular Monolith and Evidence-Based Stack](https://github.com/Hoohaahaa/no-os/blob/main/DECISIONS/0002-modular-monolith-and-stack-deferral.md)

Applied principles: product autonomy, explicit contracts, least privilege, evidence before adoption, reversibility, smallest sufficient system, observable truth, continuous challenge and no fake completeness.
