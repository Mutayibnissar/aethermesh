# AetherMesh production web infrastructure

AetherMesh is moving its public website off GitHub Pages to **Cloudflare Workers + Workers Static Assets**.

## Production topology

```
User
  |
  v
aethermesh.ai / www.aethermesh.ai
  |
  v
Cloudflare DNS + TLS + Edge
  |
  v
Cloudflare Worker: aethermesh-web
  |\
  | +--> /api/health
  |
  +--> Workers Static Assets
          |
          +--> site/index.html
```

GitHub remains the **source-control and CI/CD origin**, not the public website origin.

## Why this architecture

- GitHub Pages is removed from the production path.
- Cloudflare serves static assets from its global edge network.
- Custom Domains provide the public company hostname and Cloudflare-managed TLS/DNS.
- The Worker gives AetherMesh a controlled place for production APIs, security headers, authentication, rate limiting, and future integrations.
- The architecture can later add D1/R2/Queues without changing the public hostname.

Cloudflare recommends Workers Static Assets for new projects and recommends production Workers use a custom domain rather than a workers.dev hostname. See the official documentation:
https://developers.cloudflare.com/workers/static-assets/
https://developers.cloudflare.com/workers/configuration/routing/custom-domains/

## Primary domain

Target company domain:

- `https://aethermesh.ai`
- `https://www.aethermesh.ai` → canonical company hostname

**Important:** domain registration/ownership is not performed by this repository. The domain must first be registered and added as an active Cloudflare zone.

The repository intentionally does not claim that `aethermesh.ai` is available or already owned.

## One-time Cloudflare setup

1. Register `aethermesh.ai` with a registrar if you do not already own it.
2. Add `aethermesh.ai` to Cloudflare and move its authoritative nameservers to Cloudflare.
3. Create a Cloudflare API token for CI/CD with the minimum Workers deployment permissions required for the account/zone.
4. Add these GitHub Actions secrets:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
5. Run **Deploy AetherMesh to Cloudflare** from GitHub Actions.
6. Add/verify the Worker Custom Domains for `aethermesh.ai` and `www.aethermesh.ai`.
7. Set the preferred canonical hostname to `https://aethermesh.ai`.

Cloudflare Custom Domains can create the DNS records and certificates for the Worker once the domain is an active Cloudflare zone.

## CI/CD

Workflow:
`.github/workflows/aethermesh-cloudflare.yml`

The production deployment is deliberately **manual until the Cloudflare credentials and domain are configured**. This prevents accidental failed production deploys while the external account is not connected.

After the first successful production deployment, change the workflow trigger to include:

```yaml
push:
  branches: [main]
```

## Rollback

Every Git commit produces a reproducible Worker deployment. Roll back by deploying the previous known-good commit from GitHub Actions.

## Next production layers

1. Lead capture API + durable storage.
2. Authentication/workspaces.
3. Stripe billing and webhook processing.
4. Product application routes under `app.aethermesh.ai`.
5. API gateway under `api.aethermesh.ai`.
6. Observability and alerting.
7. Cloudflare Access for internal/admin surfaces.

Do not put secrets in the repository.
