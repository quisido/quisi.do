# Repository Guidelines

## Project Structure & Module Organization

This package is a React integration library for Fullstory. Source lives in
`src/`, with public exports collected in `src/index.ts`. React components are
under `src/components/`, hooks under `src/hooks/`, context definitions under
`src/contexts/`, and small helpers under `src/utils/`. Tests are co-located with
the code they cover, using `*.test.ts` or `*.test.tsx` names. Generated output
goes to `dist/`; cache and test artifacts may appear in `.cache/` and `.tests/`.

## Build, Test, and Development Commands

- `npm run build` builds the package with the shared `quisido` build pipeline.
- `npm test` runs the default test task.
- `npm run vitest:run` runs Vitest once for unit and integration tests.
- `npm run vitest:watch` starts Vitest in watch mode for local iteration.
- `npm run eslint` checks TypeScript and React rules, including hooks and React
  compiler constraints.
- `npm run start` starts the local package development workflow.
- `npm run clean` removes `.cache`, `.tests`, `dist`, and `node_modules`.

## Coding Style & Naming Conventions

Use TypeScript for new code. Prettier is configured for 2-space indentation,
single quotes, semicolons, LF line endings, trailing commas, and 80-column line
wrapping. Prefer immutable values with `const` and `readonly`, optional chaining,
and nullish coalescing where appropriate. Use PascalCase for components, types,
interfaces, enums, and classes; use camelCase for variables and functions; use
ALL_CAPS for constants. Do not prefix interfaces with `I`.

React code should use function components and hooks. Type props explicitly,
destructure props in function parameters, import types with `type`, and avoid
`React.FC`. Keep components focused and prefer reusable components in
`src/components` and reusable hooks in `src/hooks`.

## Testing Guidelines

Use Vitest with `describe`, `it`, and `expect`. Write tests around observable
behavior rather than implementation details, and follow Arrange-Act-Assert
structure. Co-locate tests beside their source file, for example
`src/hooks/use-fullstory.ts` and `src/hooks/use-fullstory.test.tsx`. Do not
commit `it.only` or `describe.only`.

## Security & Configuration Tips

Do not log secrets or personally identifiable information. When handling
Fullstory or third-party API data, keep external casing at API boundaries and
convert to repository conventions internally when useful.
