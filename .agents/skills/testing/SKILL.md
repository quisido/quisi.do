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
- Test observable behavior (inputs -> outputs, side effects), not internal
  implementation details.
- Use Vitest (`describe`, `it`, `expect`) for all unit and integration tests.

## Constraints

- Never commit `it.only` or `describe.only`; use them only temporarily during
  local debugging.
- Never use `vi.mock`. Instead, write testable code and/or use dependency
  injection.
