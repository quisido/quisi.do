# Agent instructions for the `quisido` library

## Project Structure & Module Organization

This package is the `quisido` TypeScript CLI and shared tooling library. Source
code lives in `src/`, with public exports in `src/index.ts` and the CLI entry in
`src/cli.ts`. Feature modules are grouped under `src/features/`, shared types
under `src/types/`, and reusable helpers under `src/utils/`. Tests are
co-located with the code they cover, for example
`src/features/eslint-config/index.test.ts`. Build output goes to `dist/`; test
and tool artifacts may appear in `.tests/` and `.cache/`.

## Build, Test, and Development Commands

- `npm run build`: compile the package with `tsc --build tsconfig.build.json`.
- `npm run start`: run TypeScript in watch mode for local development.
- `npm test`: run the full `quisido test` suite, including ATTW, ESLint,
  publint, package checks, and Vitest.
- `npm run eslint`: lint through the package CLI.
- `npm run vitest:run`: run Vitest once.
- `npm run vitest:watch`: run Vitest in watch mode.
- `npm run clean`: remove `.cache`, `.tests`, `dist`, and `node_modules`.

From the monorepo root, prefer workspace commands such as
`npm --workspace=packages/quisido test`.

## Coding Style & Naming Conventions

Use TypeScript for new code and keep the existing ESM style with explicit `.js`
import specifiers. Follow the repository ESLint and Prettier configuration
through `npm run eslint`. Use PascalCase for classes, interfaces, type aliases,
and enums; camelCase for variables, functions, and methods; and ALL_CAPS for
constants. Prefer `const`, `readonly`, optional chaining, nullish coalescing,
and interfaces for data shapes. Do not prefix interfaces with `I`.
