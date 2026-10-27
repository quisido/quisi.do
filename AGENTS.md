# Instructions for agents

- When authoring scripts, use TypeScript exclusively.
- When running build and test scripts, write the output to a temporary file then
  search that file with `rg` or `tail`, e.g. `npm test > /tmp/test.log 2>&1` and
  `rg --context 3 --max-count 5 'FAIL' /tmp/test.log`.

## Monorepo layout

npm workspaces under `packages/*` with three package types, distinguished by
`package.json`:

- **Applications** are `private` with a non-GitHub homepage (`saas/`, `game/`).
- **Services** are private Cloudflare Workers (`authn/`, `csp/`, `dashboard/`).
- **Libraries** are public npm packages (everything else) and are the build
  dependencies consumed by the apps and services.

`packages/quisido/` is the shared build/lint/test CLI used by every package.
Other packages' scripts (`quisido build`, `quisido test`, ...) depend on it
being built and linked first, which is why root `npm run build` runs in the
fixed order `tsc:build` → `quisido:build` → `quisido:link` →
`npm --workspaces run build`.

TypeScript is aliased twice on purpose: `@typescript/native` is TypeScript 7
and supplies the `tsc` used for builds, while `typescript` aliases
`@typescript/typescript6` (providing `tsc6` and the compiler API for
typescript-eslint). Keep both.

## Commands

- Scope everything with workspaces:
  `npm --workspace=packages/<name> <script>`.
- Root shortcuts run a package's dev server: `npm run authn`, `npm run csp`,
  `npm run dashboard`, `npm run game`, `npm run saas`, `npm run worker`, ...
  Root `npm start` (via `scripts/start.ts`) only starts the published,
  non-private workspaces, so use the shortcuts for apps and services.
- `quisido test` runs ATTW, ESLint, publint, built-in tsconfig/VS Code checks,
  and Vitest concurrently, and writes JSON reports to `.tests/` in the package.
- Run a focused test with Vitest directly:
  `npm --workspace=packages/<name> run vitest:run -- <file>` (each package also
  has `vitest` / `vitest:watch`).

## Root metadata tests

Root-level Vitest files (`packages.test.ts`, `package.test.ts`,
`quisido.test.ts`, `vscode.test.ts`) enforce monorepo conventions and run with
`npx vitest run` at the repo root. When adding or editing a workspace they
require: a `funding` field in its `package.json`; a `test` script matching
`quisido test` for non-applications; any workspace `overrides` mirrored into
the root `package.json` `overrides`; and `.vscode/` plus
`quisido.code-workspace` settings kept in sync.

## Cloudflare services

`authn/`, `csp/`, and `dashboard/` run locally with `wrangler dev` sharing state
at the repo root via `--persist-to ../../.wrangler/state`. Seed their D1
databases from `sql/` with the `local:init` / `local:reinit` scripts. Secrets
belong in uncommitted `.dev.vars` (`authn` requires `JWT_ENCRYPTION_SECRET`);
staging/production deploys use `wrangler deploy --env` scripts. Worker code
uses Web `Request`/`Response` APIs and typed bindings, not Node APIs.

## Linting

The root `eslint.config.ts` ignores `packages/**`; lint packages with
`npm --workspace=packages/<name> run eslint`. Node built-ins are only allowed
in root `scripts/`, `utils/`, and root `*.test.ts` files.

Several packages have their own `AGENTS.md` (quisido, authn, csp, fmrs,
number-format-react, use-force-update, use-shallow-memo); follow them when
working inside those packages.

## Error handling

- Always include non-PII context.
- Avoid blanket `try`/`catch` that swallows errors; re-throw or wrap with
  domain-specific errors.
- Do not log secrets or PII; apply redaction where needed.
- Standardize log levels as error, warning, or informational.
- Use `try`/`catch` around `await` at logical boundaries.

## Naming conventions

- Avoid abbreviations unless they are widely recognized.
- Prefer private member variables with `#` over `private`.
- Use meaningful and descriptive names.
- Use `on<Event>` for event handlers (e.g., `onClick`, `onSubmit`).
- Use singular nouns for types and interfaces, plural for arrays.
- Use verbs for function and method names.

### Casing

- Use ALL_CAPS for constants
- Use camelCase for variables, functions, and methods.
- Use PascalCase for classes, components, enums, interfaces, and type aliases.
- Third party API calls may keep their original casing; that casing may be
  converted to this repository's casing at API call boundaries.
