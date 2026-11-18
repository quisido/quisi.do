# Authentication service

The authentication service handles JWT management for authenticating with the
`packages/saas` web application via Patreon OAuth.

The authentication service serves as a proof-of-concept framework for safely and
confidently deploying an entirely agent-authored application source.

## Structure

- `app/` contains behavior-driven test suites.
- `config/` contains package configuration files.
- `src/` contains service's implementation code.

## Commands

- `npm run build` = `wrangler types`.
- `npm run fix` = `eslint . --fix`.
- `npm test` executes `scripts/test.sh`, which executes `eslint`, `tsc`, and
  `vitest`.
- `npx eslint .` lints the package.
- `npx vitest run` runs the behavior-driven test suite in `app/`.
- `npx wrangler types` saves a `.d.ts` to `worker-configuration.d.ts`, including
  `Env` types based on the `wrangler.jsonc` bindings, compatibility date, and
  compatibility flags.
