---
name: testing
description: "Code guidelines for JavaScript/TypeScript end-to-end, integration, and unit tests. Use when authoring or reviewing `**/*.test.ts` and `**/*.test.tsx` files, e.g. Playwright, Vitest."
allowed-tools: Read Write
license: MIT
metadata:
  author: quisi.do
---
# Testing guidelines

## Conventions

- Avoid arbitrary timeouts (`setTimeout`, `sleep`) in tests.
- Co-locate test files with the source file they cover: `foo.ts` ->
  `foo.test.ts` in the same directory.
- Follow the Arrange-Act-Assert (AAA) pattern: set up preconditions, invoke the
  unit under test, then assert the outcome.
- Group related assertions under a `describe` block; use `it` for individual
  test cases with descriptive names that read as sentences.
- Keep tests deterministic: inject time (a `now` function) instead of reading
  the real clock; never depend on real network or real Cloudflare resources.
- Test observable behavior (inputs -> outputs, side effects), not internal
  implementation details.
- Use sentence-like `it` names, e.g. `it('returns the user when the ID exists')`.
- Use Vitest (`describe`, `it`, `expect`) for all unit and integration tests.

## Constraints

- Never commit `it.only` or `describe.only`; use them only temporarily during
  local debugging.
- Never use `vi.mock`. Instead, write testable code and/or use dependency
  injection.

## Test intent by package kind

"Test observable behavior" is refined into a specific contract per package kind.
The contract defines _what a test is allowed to assert about_; the shared test
helpers exist to enforce it, so prefer them over ad-hoc setup.

- **Libraries** (e.g. `fmrs`, `use-shallow-memo`, `worker`): assert the
  published contract through the package entry point (`index.ts`), not internal
  modules. Where the value proposition is a guarantee, assert that guarantee
  directly. For example, referential-identity hooks use `toBe` (not `toEqual`)
  across rerenders to prove memoization holds.
- **Applications** (e.g. `saas`): assert accessibility behavior (role,
  accessible name, keyboard interaction, and ARIA state) through the `core-test`
  `render()` API. Do not assert on DOM structure, class names, or test IDs.
- **Design systems** (i.e. `saas/src/design-systems/`): The same suite must pass
  against any implementation selected by `VITE_TESTED_DESIGN_SYSTEM`; a new
  design system is correct iff it passes the shared suite. See also
  `packages/saas/src/design-systems/AGENTS.md`.
- **Services** (e.g. `ai`, `authn`, `csp`, `dashboard`): drive the Worker
  through `TestExportedHandler` from `worker-test` with bindings mocked via
  `cloudflare-test-utils`. Assert the `Response`, emitted metrics
  (`expectMetric`), and written data points (`expectToHaveWrittenDataPoint`).
  Mock every outbound `fetch` (an unmocked or unused mock fails the test) and
  inject `now`; never hit real Cloudflare resources or the real clock.
