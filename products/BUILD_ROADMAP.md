# AetherMesh Product Build Roadmap

## Product 1 — MeshOps

**Objective:** turn AetherMesh into a usable workflow automation product.

### MVP
- account/workspace
- workflow creation
- workflow templates
- agent selection
- execution history
- approval queue
- evaluation results
- usage meter

### First three templates
1. Research brief
2. Customer request triage
3. Competitive intelligence report

---

## Product 2 — MeshGuard

### MVP
- agent registry
- policy definitions
- evaluation suite
- run logs
- approval gates
- audit trail
- cost per run

---

## Product 3 — MeshSupport

### MVP
- support inbox ingestion
- ticket classification
- evidence retrieval
- response drafting
- approval
- resolution memory

---

## Product 4 — MeshRevenue

### MVP
- account workspace
- research workflow
- company-change signals
- account brief
- CRM-ready output
- human-approved outreach preparation

---

## Product 5 — MeshDesk

### MVP
- incident intake
- triage
- runbook retrieval
- diagnosis
- remediation proposal
- approval
- incident report

---

## Product 6 — MeshFinOps

### MVP
- provider/model cost ingestion
- workflow cost allocation
- budget alerts
- cost dashboard
- model comparison

---

## Product 7 — MeshData

### MVP
- source inventory
- data quality checks
- AI-readiness score
- permission mapping
- integration-gap report

---

## Product 8 — MeshIntel

### MVP
- source collection
- source verification
- competitor monitoring
- trend extraction
- scheduled intelligence reports

## Technical rule

Every product should call the same AetherMesh runtime rather than implementing its own agent orchestration.

That preserves one technical core while allowing independent product UX, pricing and positioning.
