# Repository Guidelines

## Project Structure & Module Organization

This package is the `@quisido/authn` Cloudflare Worker for quisi.do authentication. Runtime code lives in `src/`, with `src/index.ts` as the Worker entry point. Feature areas include `analytics/`, `fetch-handler/`, `oauth/`, `patreon/`, `static/`, `utils/`, and `whoami/`. Shared test helpers live in `test/`. D1 schema and maintenance scripts live in `sql/`. Generated state and caches such as `.cache/`, `.tests/`, `.wrangler/`, `dist/`, and `node_modules/` are not source.

## Build, Test, and Development Commands

Run commands from this package directory, or from the monorepo root with
`--workspace=packages/authn`.

- `npm run dev`: start `wrangler dev` with persisted local Worker state.
- `npm run local:init`: initialize local D1 tables and clear rows.
- `npm run local:reinit`: drop and recreate the local D1 database schema.
- `npm test`: run the package test command through `quisido test`.
- `npm run vitest:run`: run Vitest once for unit tests.
- `npm run eslint`: run the package ESLint checks.
- `npm run tsc:no-emit`: type-check without writing build output.
- `npm run staging:deploy:dry-run` or `npm run production:deploy:dry-run`: validate deployment output.

## Coding Style & Naming Conventions

Prefer `const`, immutable data, optional chaining, nullish coalescing, and functional helpers where practical. Use PascalCase for classes, interfaces, enums, and type aliases; camelCase for variables and functions; and ALL_CAPS for constants. Do not prefix interfaces with `I`. Worker code should use Web `Request`/`Response` APIs and typed Cloudflare bindings, not Node HTTP APIs.

## Security & Configuration Tips

Never hard-code secrets or credentials. Keep local secrets in `.dev.vars` or environment-specific configuration outside committed code. Use parameterized D1 queries with `?` placeholders, and keep staging and production bindings separated in `wrangler.jsonc`.
