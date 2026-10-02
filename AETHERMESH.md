# AetherMesh

AetherMesh is an upgraded execution layer around the Agency Agents specialist library.

It preserves the upstream agent corpus while adding deterministic routing, policy controls, workflow planning, evaluation, and a provider-neutral runtime under runtime/.


## Production web architecture

The public company website is no longer designed to depend on GitHub Pages. Production hosting is defined under `infra/cloudflare/` using Cloudflare Workers + Workers Static Assets, with `aethermesh.ai` as the target canonical hostname. GitHub remains source control and CI/CD.

See `infra/DOMAIN_AND_HOSTING.md` and `infra/cloudflare/README.md` for the production deployment and domain setup.
