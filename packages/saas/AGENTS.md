# Repository Guidelines

## Project Structure & Module Organization

This package lives at `packages/saas` in the `quisi.do` monorepo. Application
entry files are in `src/index.html`, `src/index.tsx`, and `src/index.scss`.
Route-style pages live under `src/app`, reusable React UI in `src/components`,
hooks in `src/hooks`, contexts in `src/contexts`, constants in `src/constants`,
and feature code in `src/features`, `src/modules`, and `src/utils`. Static
assets belong in `public`. Build and maintenance scripts live in `scripts`.
Design-system work has its own guide at `src/design-systems/AGENTS.md`.

## Build, Test, and Development Commands

- `npm --workspace=packages/saas start`: run the Vite dev server.
- `npm --workspace=packages/saas run build`: type-check with
  `tsc --skipLibCheck` and produce a production Vite build.
- `npm --workspace=packages/saas`: run the package test command through
  `quisido test`.
- `npm --workspace=packages/saas run vitest:run`: run Vitest once.
- `npm --workspace=packages/saas run vitest:watch`: run Vitest in watch mode.
- `npm --workspace=packages/saas run eslint`: run the project ESLint
  configuration.
- `npm --workspace=packages/saas run clean`: remove generated caches, test
  output, Wrangler output, `_site`, and `node_modules`.

## Coding Style & Naming Conventions

Use TypeScript for new code and prefer immutable values with `const` and
`readonly`. PascalCase
for components, classes, interfaces, enums, and type aliases; camelCase for
variables and functions; ALL_CAPS for constants. React code should use named
function components, hooks, explicit prop interfaces, `type` imports for types,
and `ReactElement` return types. Prefer CSS modules named
`component-name.module.scss` and class composition over inline styles. ESLint is
configured in `eslint.config.ts`; SCSS style rules are in `.stylelintrc.ts`.

## Testing Guidelines

Shared design system conformance tests live in `src/design-systems/core-test`.
To test a design system, set `VITE_TESTED_DESIGN_SYSTEM`; for example:
`VITE_TESTED_DESIGN_SYSTEM=template npx vitest run src/design-systems/core-test/`.
