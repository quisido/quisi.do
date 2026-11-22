# Instructions for Agents

Instructions apply to **this directory**. Ignore the repository root.

You may read/import from and write to `src/`.
You may read/import from `#lib/` (`./lib/`).
You may not read from nor write to `config/` and `test/`.

## Goal

This package uses test-driven-development and contains failing tests. Run
`npm test` to identify what is failing, then change `src/` to correct it.

If you believe the test is wrong, **stop implementation** and confirm with the
user.

If you need clarification, ask instead of assuming.

Once tests are passing, use a high-effort review subagent to perform an
adversarial review of the `src` directory's uncommitted changes. Since you
already confirmed the tests as passing, the subagent does not need to run them
and should only focus its review on identifying bugs, maintainability,
performance issues, and security flaws. If the review agent requests changes
with which you agree, make those changes then repeat this review process.

## Commands

- `npm run fix` to automatically correct fixable errors and warnings.
- `npm test` to execute all required tests.

## Dependencies

The only third party modules you may import are:

- `jose`

## Library

- `#lib/error-code.js` contains an `ErrorCode` `enum` for response bodies.
- `#lib/favicon.js` contains a `Uint8Array` for a transparent 32x32 icon.

## Restrictions

| Instead of...      | Use...           |
|--------------------|------------------|
| `node:assert`      | `#lib/assert.js` |
| `globalThis.fetch` | `#lib/fetch.js`  |
| `console.error`    | `#lib/log.js`    |
| `console.log`      | `#lib/log.js`    |
| `Date.now()`       | `#lib/now.js`    |
| `Math.random()`    | `#lib/random.js` |

## Rules

- Test coverage must be 100% for `src/`. To narrow TypeScript types against
  impossible states without creating untestable branches, use `#lib/assert.js`.
- `functional/immutable-data` requires values be deeply immutable. You can use
  `#lib/readonly-deep.js`'s utility TypeScript generic `ReadonlyDeep<T>` to make
  `T`'s deeply-nested properties `readonly`.

## Response

- Do not explain why tests _were_ failing or what the fix is. This is test
  driven development, so the user already knows both.
- If you had to assume something, state what answer could have been present in
  `AGENTS.md` so that you wouldn't have had to ask/assume/research. We want
  future sessions to use less tokens.
