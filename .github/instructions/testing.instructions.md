---
applyTo: "**/*.test.ts,**/*.test.tsx"
---
# Testing coding standards

- Use Vitest (`describe`, `it`, `expect`) for all unit and integration tests.
- Group related assertions under a `describe` block; use `it` for individual
  test cases with descriptive names that read as sentences.
- Never commit `it.only` or `describe.only`; use them only temporarily during
  local debugging.
- Test observable behavior (inputs → outputs, side effects), not internal
  implementation details.
- Co-locate test files with the source file they cover: `foo.ts` →
  `foo.test.ts` in the same directory.
- Follow the Arrange-Act-Assert (AAA) pattern: set up preconditions, invoke
  the unit under test, then assert the outcome.
- Avoid arbitrary timeouts (`setTimeout`, `sleep`) in tests.
