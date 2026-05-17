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

- `npm run dev --workspace=packages/csp`: start `wrangler dev` with persisted
  local state under `../../.wrangler/state`.
- `npm run local:init --workspace=packages/csp`: create local D1 tables from
  `sql/` scripts.
- `npm run local:reinit --workspace=packages/csp`: drop and recreate local D1
  tables.
- `npm test --workspace=packages/csp`: run the package test command.
- `npm run vitest:run --workspace=packages/csp`: run Vitest once.
- `npm run eslint --workspace=packages/csp`: run the shared `quisido` ESLint
  configuration.
- `npm run staging:deploy:dry-run --workspace=packages/csp`: validate Worker
  deployment output before remote deployment.

## Coding Style & Naming Conventions

Use TypeScript for new code and follow the shared `quisido` ESLint and
TypeScript configs. Existing files use two-space indentation, ESM imports, and
`.js` extensions in relative imports. Prefer immutable values (`const`,
`readonly`), optional chaining, and nullish coalescing. Use PascalCase for
classes, interfaces, type aliases, and enums; camelCase for variables and
functions; and ALL_CAPS for constants. Keep Worker code on Web APIs
(`Request`, `Response`) rather than Node APIs.

## Testing Guidelines

Use Vitest (`describe`, `it`, `expect`) for unit and integration tests. Co-locate
tests with source files, for example `src/features/handle-post.ts` and
`src/features/handle-post.test.ts`. Write `it` names as readable behavior
statements and follow Arrange-Act-Assert; this repo labels those phases as
`Assemble`, `Act`, and `Assert`. Do not commit `it.only` or `describe.only`.

## Commit & Pull Request Guidelines

Recent history uses short, imperative subjects such as `fix CI` and `add ci
files`, with dependency updates often preserving bot-generated titles. Keep
commits focused and describe the observable change. Pull requests should include
a concise summary, relevant issue or PR links, test results, and any deployment
or D1 migration notes. Include screenshots only when UI or rendered output is
affected.

## Security & Configuration Tips

Never hard-code credentials, dataset names, or user input into SQL. Use typed
Cloudflare bindings from `Env`, parameterized D1 queries, and environment-specific
bindings in `wrangler.jsonc`. Run `wrangler types` after binding changes.
