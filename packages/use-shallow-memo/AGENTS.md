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
`npm run <script> --workspace=packages/use-shallow-memo` when needed.

## Coding Style & Naming Conventions

Write new code in TypeScript and follow the shared repo instructions in
`.github/instructions/`. Prefer functional code, immutable values (`const`,
`readonly`), optional chaining, and nullish coalescing. Use PascalCase for
types, interfaces, enums, classes, and components; use camelCase for functions,
variables, and methods; use ALL_CAPS for constants. Do not prefix interfaces
with `I`. Keep React hooks compliant with the Rules of Hooks and the configured
React compiler, hooks, and refresh ESLint rules.

## Testing Guidelines

Vitest is the test framework, with `jsdom` configured in `vitest.config.ts`.
Place tests beside implementation files, for example
`src/utils/map-value-to-dependencies.test.ts`. Structure tests with `describe`,
`it`, and `expect`; write `it` names as readable behavior statements. Test
observable behavior rather than implementation details, and never commit
`it.only` or `describe.only`.

## Commit & Pull Request Guidelines

Recent history uses short, imperative commit subjects such as `fix CI` and
`add ci files`; dependency updates may use the generated `Bump ... (#123)`
format. Keep commits focused on one change. Pull requests should describe the
behavioral change, link related issues when applicable, and include the commands
run for verification. Add screenshots only for UI-facing changes, which are
unlikely in this hook package.

## Agent-Specific Instructions

Before changing code, check applicable files in `.github/instructions/` using
their front matter. Avoid unrelated cleanup, and preserve user or generated
changes already present in the working tree.
