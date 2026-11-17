# MONUMENT — Product Workspace

This directory is the durable product source of truth for Monument. It is intentionally isolated from the portfolio website and production application code.

## Start here
1. [Vision and opportunities](VISION_AND_OPPORTUNITIES.md) — north star, product surfaces, user direction, markets, business models, design principles and open questions.
2. [Project context](PROJECT_CONTEXT.md) — what Monument is and what is verified.
3. [Technical audit](TECHNICAL_AUDIT.md) — identified Vercel build and known architecture.
4. [Product strategy](PRODUCT_STRATEGY.md) — positioning, customer wedge, monetization and pilot.
5. [Roadmap](ROADMAP.md) — staged delivery plan and acceptance gates.
6. [Decision log](DECISION_LOG.md) — durable decisions.
7. [Latest handoff](LATEST_HANDOFF.md) — continuation point for the next chat.
8. [Feature template](FEATURE_TEMPLATE.md) — use for every new feature.

## Operating rules
- Documentation is not proof a feature is implemented. Status requires code, deployment or test evidence.
- Never overwrite/delete production deployments while investigating.
- Keep experiments on isolated branches until reviewed.
- Update LATEST_HANDOFF after every session; update decisions and roadmap when they change.
- Inspect actual source and deployment before coding; do not rely on chat memory.
- Use additive database migrations; verify and back up before production changes.
- Never commit secrets, tokens, database URLs, personal location traces or customer data.

## Current discovery
The strongest identified candidate is Vercel project `monument-spatial-22`, latest Production deployment READY:
https://monument-spatial-22.vercel.app

Its deployment README describes it as a continuation of Spatial 22 retaining accepted V18 local Sky geometry. This is a candidate baseline, not yet a fully audited canonical source repository. See [Technical audit](TECHNICAL_AUDIT.md).
