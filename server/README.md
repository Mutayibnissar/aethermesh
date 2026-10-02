# AetherMesh Runtime API

Node 20+ API that connects the public website's Workforce Command Center to the repository's real agent corpus and runtime primitives.

## Endpoints

- GET /api/health
- GET /api/agents
- POST /api/workforce
- POST /api/workflow/plan

POST body:
```json
{"task":"Research our competitors and prepare a strategy brief"}
```

The API discovers Markdown agents from the repository, routes the task, creates a dependency-aware workflow plan, evaluates policy, and returns an execution/evaluation envelope.

This service deliberately does **not** execute irreversible external actions. Those belong behind explicit tool integrations and the AetherMesh policy/approval boundary.
