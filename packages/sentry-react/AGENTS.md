# Repository Guidelines

## Project Structure & Module Organization

This package is a React/TypeScript library for initializing Sentry through a
`<Sentry />` component. Source lives in `src/`: reusable components are under
`src/components`, hooks under `src/hooks`, context in `src/contexts`, and shared
types in `src/types`. Public exports flow through `src/index.ts`.

Unit tests are co-located with the source they cover, using `*.test.ts` or
`*.test.tsx` names, for example `src/components/sentry/sentry.view.test.tsx`.
Shared test helpers live in `test/`. Build output goes to `dist/`; do not edit
generated files there.

## Build, Test, and Development Commands

- `npm run build` builds the package with `quisido build` into `dist/`.
- `npm test` runs the default package test command.
- `npm run vitest:run` runs Vitest once in CI-style mode.
- `npm run vitest:watch` runs Vitest in watch mode for local work.
- `npm run eslint` runs the configured ESLint rules.
- `npm run start` starts the local development workflow.
- `npm run clean` removes `.cache`, `.tests`, `dist`, and `node_modules`.

## Coding Style & Naming Conventions

Use TypeScript for new code. Prefer `const`, immutable data, optional chaining,
and nullish coalescing. Use PascalCase for components, classes, enums,
interfaces, and type aliases; use camelCase for variables, functions, and
methods; use ALL_CAPS for constants.

React code should use function components and hooks. Type props explicitly,
destructure props in function signatures, import types with `type`, and avoid
`React.FC`. Keep components focused and default-export named component
functions where practical. ESLint enforces React Compiler, hooks, exhaustive
deps, and React Refresh rules.

## Testing Guidelines

Tests use Vitest with `describe`, `it`, and `expect`, running in `jsdom` through
`vitest.config.ts`. Write tests around observable behavior and follow
Arrange-Act-Assert. Co-locate new tests beside the covered source file, and use
descriptive test names that read as sentences. Never commit `it.only` or
`describe.only`.

## Commit & Pull Request Guidelines

Recent commits use short, imperative subjects such as `fix CI` and `add ci
files`; dependency updates may use automated `Bump ...` subjects. Keep commit
messages concise and focused on one change.

Pull requests should describe the behavior change, list tests run, and link the
related issue when one exists. Include screenshots only for visible React UI
changes. Note package API changes clearly because this library publishes public
exports from `src/index.ts`.

## Agent-Specific Instructions

Before coding, read applicable files in `.github/instructions/**/*.instructions.md`
and honor their front matter. Ignore generated output and avoid unrelated
refactors.
