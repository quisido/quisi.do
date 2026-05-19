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

From the monorepo root, prefer workspace-scoped commands such as `npm test --workspace=packages/fmrs`.

## Coding Style & Naming Conventions

Use TypeScript and the shared `quisido` ESLint/TS configs. Follow the existing ESM style: import local modules with `.js` extensions, prefer default exports for single-helper modules, and re-export public APIs from `src/index.ts`. Use two-space indentation, `const` by default, immutable `readonly` types where useful, optional chaining, and nullish coalescing. Name functions with verbs in `camelCase`; use `PascalCase` for types and do not prefix interfaces with `I`.

## Testing Guidelines

Use Vitest with `describe`, `it`, and `expect`. Co-locate tests with source files using `helper-name.test.ts`. Write tests around observable inputs and outputs, not implementation details, and keep test names sentence-like, for example `it('should identify booleans', ...)`. Never commit `it.only` or `describe.only`.

## Agent-Specific Instructions

Before editing code, check `.github/instructions/**/*.instructions.md` from the monorepo and apply files whose front matter matches your task. For this package, the general TypeScript and testing instructions usually apply.
