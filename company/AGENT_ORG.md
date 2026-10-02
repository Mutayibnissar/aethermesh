# AetherMesh Agent Organization

AetherMesh operates as a functional company. Agents are assigned to business outcomes rather than simply exposed as a catalog.

| Company function | Existing agent divisions | Primary responsibility | Human gate |
|---|---|---|---|
| CEO / Strategy Office | strategy, research | thesis, priorities, market intelligence, decision memos | strategy approval |
| Product | product, design | discovery, PRDs, UX, prioritization | product owner |
| Engineering | engineering, testing | architecture, implementation, QA, release | production release |
| Growth | marketing, paid-media | positioning, campaigns, content, experiments | brand/claims approval |
| Revenue | sales, research | account research, qualification, proposals, pipeline | commercial approval |
| Delivery | project-management, support | plans, status, onboarding, service operations | client success owner |
| Finance | finance | pricing, margin, forecasts, commercial analysis | financial approval |
| Trust | security, testing | threat modeling, access, data controls, evals | security sign-off |
| Domain Pods | academic, healthcare, gis, game-development, spatial-computing, specialized | vertical expertise | domain owner |

## Agent hierarchy

**Layer 1 — Executive reasoning**
- Strategy agents establish objectives, constraints, hypotheses, and priorities.
- Research agents gather evidence and maintain source traceability.

**Layer 2 — Functional specialists**
- Product/design translate objectives into a solution.
- Engineering/testing/security turn it into a validated system.
- Marketing/sales turn it into a commercial motion.
- Finance validates economics.
- Project-management/support operate the engagement.

**Layer 3 — Execution workflows**

Agents do not independently redefine the company's objective. The runtime supplies the task, context, allowed tools, policy, dependencies, and success criteria.

## Operating rule

No agent gets unrestricted authority simply because it is capable of performing an action. Actions are classified as:

- **Observe:** research, analyze, summarize.
- **Prepare:** draft, design, code, recommend.
- **Execute:** perform reversible operational actions.
- **Commit:** irreversible or externally consequential actions.

Commit actions require an explicit approval gate unless a customer has configured an audited policy that permits them.
