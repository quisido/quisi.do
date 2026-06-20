---
name: cloudflare
description: "Code guidelines for Cloudflare Worker implementations. Use when editing, reviewing, or executing a Cloudflare Worker; e.g. D1 queries, handlers, Wrangler commands, and Wrangler configurations."
allowed-tools: Read Write
license: MIT
metadata:
  author: quisi.do
---
# Cloudflare Workers guidelines

## Configuration

- Keep `wrangler.jsonc` environments separated into `dev`, `staging`, and
  `production`. Each should have distinct binding names and dataset names.

## Commands

- Use `wrangler deploy --dry-run` to validate the build output.
- Use `wrangler dev --persist-to ../../.wrangler/state` for local development
  so that D1 and KV state is persisted across restarts.
- Run `wrangler types` to regenerate `worker-configuration.d.ts` whenever new
  bindings are added or changed in `wrangler.jsonc`.

Deployments occur through CI/CD. You do not have access to the necessary secrets
to deploy.

## Conventions

- Access secrets and bindings exclusively via the typed `Env` interface generated
  in `worker-configuration.d.ts`; never hard-code secrets or credentials.
- Emit observability data to the Cloudflare Analytics Engine with the
  `writeDataPoint` method. Emit sensitive fields to the `PRIVATE_DATASET` data
  set. Emit aggregatable metrics to the `PUBLIC_DATASET` data set.
- `fetch` handlers should always return a `Response`; never let unhandled
  exceptions propagate to the runtime.
- Respect Cloudflare Worker CPU-time limits: avoid long synchronous loops;
  prefer streaming responses (`TransformStream`, `ReadableStream`) for large
  payloads.
- Use `ctx.waitUntil` for fire-and-forget side effects (e.g., logging, cache
  writes) that must complete but can wait until after the `Response` is
  returned.
- Use parameterized queries (`?` placeholders) to prevent SQL injection. Never
  interpolate user input into SQL strings.
- Use the `Request`/`Response` Web APIs in Worker handlers. Never use Node's
  built-in `http` module.
