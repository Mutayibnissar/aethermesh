# AetherMesh domain and hosting plan

## Public company surface

Primary:
- https://aethermesh.ai

Canonical:
- https://aethermesh.ai

Secondary:
- https://www.aethermesh.ai

GitHub Pages:
- retired from the production architecture
- not used as the company website origin

## Application hostname plan

| Hostname | Purpose |
|---|---|
| aethermesh.ai | Corporate website |
| www.aethermesh.ai | Redirect/canonical alias |
| app.aethermesh.ai | Future authenticated product application |
| api.aethermesh.ai | Future public API |
| status.aethermesh.ai | Future service status |
| docs.aethermesh.ai | Future product/developer docs |

## Source vs production

GitHub repository:
- source code
- pull requests
- CI
- release history

Cloudflare:
- DNS
- TLS
- public web delivery
- edge security
- Worker runtime
- future API/storage integrations

## Current production readiness

Implemented in repository:
- Worker runtime
- Workers Static Assets
- custom-domain configuration
- production security headers
- health endpoint
- manual production deployment workflow
- GitHub Pages production workflow retired

External setup still required:
- domain registration/ownership
- Cloudflare zone
- Cloudflare API token
- Cloudflare account ID
- first production deployment

This distinction is intentional: the repository cannot truthfully claim ownership of a domain or a Cloudflare account that has not been connected.
