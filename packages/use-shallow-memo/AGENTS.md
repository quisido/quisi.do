# Repository Guidelines

## Project Structure & Module Organization

This package is the `use-shallow-memo` React hook. Source lives in `src/`:
`src/index.ts` is the public entry point, `src/hooks/` contains the hook, and
`src/utils/` contains dependency-mapping helpers. Unit tests are colocated with
the files they cover as `*.test.ts`. Build output goes to `dist/`; generated
test and lint reports go to `.tests/`. Do not edit generated output directly.

## Build, Test, and Development Commands

Use npm scripts from this package directory:

- `npm run build` runs the `quisido` package build and emits `dist/`.
- `npm test` runs the package test pipeline.
- `npm run vitest:run` runs Vitest once for local verification.
- `npm run vitest:watch` starts Vitest in watch mode.
- `npm run eslint` runs the configured ESLint checks.
- `npm run attw` checks package type/export compatibility.
- `npm run clean` removes `.cache`, `.tests`, `dist`, and `node_modules`.

From the monorepo root, scope commands with
`npm --workspace=packages/use-shallow-memo run <script>` when needed.

## Coding Style & Naming Conventions

Prefer functional code, immutable values (`const`, `readonly`), optional
chaining, and nullish coalescing. Use PascalCase for
types, interfaces, enums, classes, and components; use camelCase for functions,
variables, and methods; use ALL_CAPS for constants. Keep React hooks compliant with the React compiler.

## Agent-Specific Instructions

Avoid unrelated cleanup, and preserve user or generated changes already present
in the working tree.
