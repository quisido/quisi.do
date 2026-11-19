# Instructions for Agents

You may read and import files from `@lib/` (`./lib/`).
You may read and write files to `src/`.

Complete each workflow by using a high-effort subagent to perform an adversarial
review of the `src` directory's uncommitted changes. If the review agent
requests changes with which you agree, make those changes then repeat this
review process.

## Restrictions

| Instead of...      | Use...           |
|--------------------|------------------|
| `node:assert`      | `@lib/assert.js` |
| `globalThis.fetch` | `@lib/fetch.js`  |
| `Date.now()`       | `@lib/now.js`    |
| `Math.random()`    | `@lib/random.js` |

## Rules

- Test coverage must be 100%. To narrow TypeScript types against impossible
  states without creating untestable branches, use `@lib/assert.js`.
- `functional/immutable-data` requires values be deeply immutable. You can use
  `@lib/deep-readonly.js`'s utility TypeScript generic `DeepReadonly<T>` to make
  `T`'s deeply-nested properties `readonly`.

## Commands

- `npm run fix` to automatically correct fixable errors and warnings.
- `npm test` to execute all required tests.
