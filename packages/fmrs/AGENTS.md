# Repository Guidelines

## Project Structure & Module Organization

`fmrs` is a TypeScript utility package for filter/find, map, reduce, and sort helpers. Source files live in `src/`, with one focused module per helper, for example `src/is-boolean.ts` and `src/map-to-string.ts`. Public exports are centralized in `src/index.ts`; update it when adding a new public helper. Tests are co-located beside the implementation as `*.test.ts`. Generated build output belongs in `dist/`, and generated reports/cache files belong in `.tests/` or `.cache/`; do not edit those by hand.

## Build, Test, and Development Commands

- `npm run build` runs the package build through `quisido` and emits `dist/`.
- `npm test` runs the standard package test pipeline.
- `npm run vitest:run` runs Vitest once for local verification.
- `npm run vitest:watch` starts Vitest in watch mode.
- `npm run eslint` runs the shared ESLint configuration.
- `npm run attw` and `npm run publint` validate package publishing/types behavior.
- `npm run clean` removes generated caches, reports, `dist/`, and `node_modules/`.

From the monorepo root, prefer workspace-scoped commands such as
`npm --workspace=packages/fmrs test`.

## Coding Style & Naming Conventions

Use TypeScript and the shared `quisido` ESLint/TS configs. Follow the existing ESM style: import local modules with `.js` extensions, prefer default exports for single-helper modules, and re-export public APIs from `src/index.ts`. Use two-space indentation, `const` by default, immutable `readonly` types where useful, optional chaining, and nullish coalescing. Name functions with verbs in `camelCase`; use `PascalCase` for types and do not prefix interfaces with `I`.
