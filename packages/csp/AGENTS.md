# Repository Guidelines

## Project Structure & Module Organization

This package is a Cloudflare Worker for CSP reporting. Source code lives in
`src/`, with the Worker entry point at `src/index.ts`. Request flow code is in
`src/features/`, shared helpers in `src/utils/`, constants in `src/constants/`,
and TypeScript-only shapes in `src/types/`. Tests are mostly co-located beside
the files they cover as `*.test.ts`; reusable test helpers live in `test/`.
Database setup scripts for D1 are in `sql/`. Cloudflare environment and binding
configuration is in `wrangler.jsonc`.

## Build, Test, and Development Commands

- `npm --workspace=packages/csp run dev`: start `wrangler dev` with persisted
  local state under `../../.wrangler/state`.
- `npm --workspace=packages/csp run eslint`: run the shared `quisido` ESLint
  configuration.
- `npm --workspace=packages/csp run local:init`: create local D1 tables from
  `sql/` scripts.
- `npm --workspace=packages/csp run local:reinit`: drop and recreate local D1
  tables.
- `npm --workspace=packages/csp run staging:deploy:dry-run`: validate Worker
  deployment output before remote deployment.
- `npm --workspace=packages/csp run vitest:run`: run Vitest once.
- `npm --workspace=packages/csp test`: run the package test command.

## Coding Style & Naming Conventions

Use TypeScript for new code and follow the shared `quisido` ESLint and
TypeScript configs. Existing files use two-space indentation, ESM imports, and
`.js` extensions in relative imports. Prefer immutable values (`const`,
`readonly`), optional chaining, and nullish coalescing. Use PascalCase for
classes, interfaces, type aliases, and enums; camelCase for variables and
functions; and ALL_CAPS for constants. Keep Worker code on Web APIs
(`Request`, `Response`) rather than Node APIs.

## Security & Configuration Tips

Never hard-code credentials, dataset names, or user input into SQL. Use typed
Cloudflare bindings from `Env`, parameterized D1 queries, and environment-specific
bindings in `wrangler.jsonc`. Run `wrangler types` after binding changes.
