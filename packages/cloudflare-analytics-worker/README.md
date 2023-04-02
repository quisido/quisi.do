# Cloudflare analytics worker

The Cloudflare analytics worker is a Cloudflare worker for vending Cloudflare
GraphQL analytics for the `charlesstover.com` zone.

## Prerequisites

Before running, you must create the following necessary resources:

### Environment variables

When running locally,

Set `CLOUDFLARE_API_KEY` to a Cloudflare "Edit workers" API key.

Set `CLOUDFLARE_EMAIL` to your Cloudflare account's email.

### R2 buckets

The worker requires an R2 bucket for storing the query results.

```sh
wrangler r2 bucket create results;
wrangler r2 bucket create results-preview;
```

### Secrets

The worker requires 3 secrets: the API token for the GraphQL Analytics engine,
the account tag, and the zone tag.

```sh
echo "API token:" && wrangler secret put API_TOKEN;
echo "Account tag:" && wrangler secret put ACCOUNT_TAG;
echo "Zone tag:" && wrangler secret put ZONE_TAG;
```

To provide these secrets to your local development instance, create a
`.dev.vars` file in the `packages/cloudflare-analytics-worker` and treat it like
a `.env` file for providing these values.

```sh
ACCOUNT_TAG=...
API_TOKEN=...
ZONE_TAG=...
```
