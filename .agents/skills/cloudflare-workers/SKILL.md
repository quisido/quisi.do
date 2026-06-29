---
name: cloudflare-workers
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

- Access secrets and bindings exclusively via the typed `Env` interface
  generated in `worker-configuration.d.ts`; never hard-code secrets or
  credentials.
- Emit observability data through the `@quisido/worker` framework (
  `emitPublicMetric`/`emitPrivateMetric`), not direct `writeDataPoint` calls;
  see "Worker framework" below.
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

## Worker framework

Services subclass the framework rather than writing a raw
`export default { fetch }`. The class hierarchy is `Handler` -> `FetchHandler`
-> the service handler (e.g. `AuthnFetchHandler`); `ExportedHandler` adapts the
class to Cloudflare's module-worker entry.

- Access bindings through `validateBinding(key, guard, default?)`, never the raw
  `Env`. Services override it to map a missing or invalid binding to a domain
  error.
- Side effects are events, not direct calls: use
  `emitPublicMetric`/`emitPrivateMetric`, `affect(promise)`, and `logError`. The
  handler subscribes (`onMetric`, `onSideEffect`, `onError`) and owns flushing.
  Use `logError(error)` rather than `console.*`; the console is the emitter's
  last-resort fallback oinly.
- Every metric must declare accessibility (`emitPublicMetric` versus
  `emitPrivateMetric`). `handle-metric.ts` routes public metrics to
  `PUBLIC_DATASET` and private metrics to `PRIVATE_DATASET`, redacting private
  fields. A metric emitting withotu explicit accessibility is dropped and
  logged.

## Error handling

- The `fetch` boundary never throws to the runtime: `FetchHandler` converts
  every thrown value into a `Response` (default: internal server error).
- Throw `FatalError(code)` for expected failures, where `code` is an `ErrorCode`
  from the service's `*-shared` package (e.g. `@quisido/authn-shared`,
  `@quisido/csp-shared`). Emit/log at the throw site; the boundary will not
  re-log a `FatalError`.
- Treat any non-`FatalError` as unknown: normalize with `mapToError`, emit an
  `UnknownError` metric, log it, and respond with `ErrorCode.Unknown`.
- New error conditions get a new `ErrorCode` member in the `*-shared` package,
  not an ad-hoc string. Cross-boundary contracts (error and response codes,
  their type guards) live in `*-shared` because they are shared by the worker
  and its client.
