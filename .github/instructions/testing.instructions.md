---
applyTo: "**/*.test.ts,**/*.test.tsx"
---
# Testing coding standards

- Apply the [general coding guidelines](./general-coding.instructions.md) to all
  code.
- Apply the [TypeScript coding guidelines](./typescript.instructions.md) to all
  TypeScript code.
- Use Vitest (`describe`, `it`, `expect`) for all unit and integration tests.
- Group related assertions under a `describe` block; use `it` for individual
  test cases with descriptive names that read as sentences.
- Never commit `it.only` or `describe.only`; use them only temporarily during
  local debugging.
- Prefer `toEqual` for deep structural equality; use `toBe` only for
  primitive or reference equality.
- Use `vi.fn()` for mock functions and `vi.spyOn()` to spy on existing module
  exports or object methods.
- Restore all mocks after each test: either call `vi.restoreAllMocks()` in
  `afterEach`, or set `restoreMocks: true` in `vitest.config.ts`.
- Test observable behavior (inputs → outputs, side effects), not internal
  implementation details.
- Co-locate test files with the source file they cover: `foo.ts` →
  `foo.test.ts` in the same directory.
- Use `it.runIf(condition)` to skip tests that are only relevant in a
  specific environment rather than deleting them.
- Follow the Arrange-Act-Assert (AAA) pattern: set up preconditions, invoke
  the unit under test, then assert the outcome.
- Avoid arbitrary timeouts (`setTimeout`, `sleep`) in tests; use
  `vi.useFakeTimers()` to control time deterministically.
