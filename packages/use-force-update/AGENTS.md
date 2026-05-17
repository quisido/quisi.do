# Repository Guidelines

## Project Structure & Module Organization

This package provides a small React hook, `useForceUpdate`, as an npm workspace package. Source lives in `src/`; the public entry point is `src/index.ts`. Unit tests are colocated when they cover source directly, such as `src/index.test.tsx`. Shared test helpers live in `test/`, for example `test/validate-defined.ts`. Build output is generated in `dist/`, and test/cache artifacts are generated in `.tests/` and `.cache/`; do not edit generated output by hand.

## Build, Test, and Development Commands

Run commands from `packages/use-force-update` unless you need a full monorepo check.

- `npm install` from the repository root installs workspace dependencies.
- `npm run build` builds the package through the shared `quisido build` pipeline.
- `npm test` runs the package test workflow.
- `npm run vitest:run` runs Vitest once.
- `npm run vitest:watch` starts Vitest in watch mode for local iteration.
- `npm run eslint` runs the shared ESLint configuration.
- `npm run attw` validates package types and exports.
- `npm run clean` removes `.cache`, `.tests`, `dist`, and local `node_modules`.

## Coding Style & Naming Conventions

Use TypeScript for new code and prefer immutable values (`const`, `readonly`) and functional patterns. Follow the repo formatting: 2-space indentation, LF endings, semicolons, single quotes, trailing commas, and 80-column print width. Use PascalCase for types, interfaces, classes, components, and enums; use camelCase for variables and functions; use ALL_CAPS for constants. Do not prefix interfaces with `I`. Keep React hook code compatible with the Rules of Hooks and the configured React compiler checks.

## Testing Guidelines

Use Vitest with `describe`, `it`, and `expect`. Name tests with descriptive sentences and test observable behavior rather than implementation details. Prefer colocated `*.test.ts` or `*.test.tsx` files for source coverage; place reusable helpers in `test/`. Do not commit `it.only` or `describe.only`. Run `npm run vitest:run` for focused test verification and `npm test` before submitting broader changes.

## Commit & Pull Request Guidelines

Recent history uses short, imperative commit subjects such as `fix CI`, `add ci files`, and `move Vitest to quisido`; many merged changes include PR numbers. Keep commits focused and concise. Pull requests should describe the behavior changed, note relevant package commands run, link related issues, and include screenshots only for UI-facing changes.

## Agent-Specific Instructions

Follow applicable files in `C:\git\quisi.do\.github\instructions\*.instructions.md`, using their front matter to decide scope. For this package, the general coding, TypeScript, React, and test instructions commonly apply.
