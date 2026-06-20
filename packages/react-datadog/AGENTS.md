# Repository Guidelines

## Project Structure & Module Organization

This package is a small TypeScript React library for initializing Datadog RUM.
Source code lives in `src/`. Public exports are declared in `src/index.ts`.
Custom hooks are in `src/hooks/`, React context code is in `src/contexts/`, and
shared TypeScript shapes are in `src/types/`. Co-locate tests with the files
they cover, as in `src/hooks/use-datadog.test.tsx`. Generated output and local
tool artifacts belong in `dist/`, `.cache/`, and `.tests/`; do not edit them by
hand.

## Build, Test, and Development Commands

- `npm run build` runs the package build through `quisido` and writes `dist/`.
- `npm test` runs the standard package test pipeline.
- `npm run vitest:run` runs Vitest once for local verification or CI-style
  checks.
- `npm run vitest:watch` starts Vitest in watch mode while developing.
- `npm run eslint` runs the configured ESLint rules.
- `npm run start` starts the local `quisido` development workflow.
- `npm run clean` removes generated caches, test output, `dist/`, and
  `node_modules/`.

## Coding Style & Naming Conventions

Use TypeScript for all new code. Prefer immutable values with `const` and
`readonly`, interfaces for data shapes, optional chaining, and nullish
coalescing. Use PascalCase for components, classes, enums, interfaces, and type
aliases; use camelCase for variables, functions, hooks, and methods; use
ALL_CAPS for constants. Hooks should follow `use-name.ts` naming and must obey
React hook rules. Import types with the `type` qualifier when applicable.

ESLint is configured in `eslint.config.ts` with React Compiler, React Hooks, and
React Refresh rules. Run `npm run eslint` before opening a pull request.

## Testing Guidelines

Tests use Vitest with `describe`, `it`, and `expect`. Name tests
`*.test.ts` or `*.test.tsx` and place them beside the implementation. Test
observable behavior and side effects, not private implementation details. Use
Arrange-Act-Assert structure, descriptive test names, and never commit
`it.only` or `describe.only`.

## Agent-Specific Instructions

Before editing, check applicable skills under `../../.agents/skills/` and apply
those that match the files being changed.
