# Repository Guidelines

## Project Structure & Module Organization

This package is `packages/number-format-react`, a small TypeScript React wrapper around `Intl.NumberFormat`. Source files live in `src/`. The public entry point is `src/index.ts`, which re-exports the component from `src/components/number-format/`. Component tests are co-located with implementation files, for example `number-format.view.test.tsx` beside `number-format.view.tsx`. Build output is generated in `dist/`; cache and test artifacts may appear in `.cache/` and `.tests/`. Do not edit generated output unless a release process explicitly requires it.

## Build, Test, and Development Commands

- `npm run build`: builds the package through `quisido build` and emits `dist/`.
- `npm test`: runs the package test suite through `quisido test`.
- `npm run vitest:run`: runs Vitest once; use this for focused local verification.
- `npm run vitest:watch`: starts Vitest in watch mode.
- `npm run eslint`: runs the project ESLint configuration.
- `npm run publint` and `npm run attw`: validate package publishing and type/export compatibility.
- `npm run clean`: removes `.cache`, `.tests`, `dist`, and `node_modules`.

## Coding Style & Naming Conventions

Use TypeScript for new code. Follow the root instruction files in `../../.github/instructions/`, especially `general-coding`, `typescript`, `react`, and `testing` when their front matter applies. Use 2-space indentation, single quotes, semicolons, named function components with default exports, and `import type` or inline `type` imports for types. Prefer `const`, `readonly`, interfaces for data shapes, PascalCase for components/types, camelCase for functions and variables, and ALL_CAPS for constants. Keep components small and focused.

## Testing Guidelines

Tests use Vitest, jsdom, and Testing Library React. Co-locate tests with the source file they cover and name them `*.test.ts` or `*.test.tsx`. Group related cases with `describe`, write sentence-like `it` names, and assert observable rendered behavior rather than implementation details. Never commit `it.only` or `describe.only`.
