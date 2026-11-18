# Instructions for Agents

You may read and import files from `@lib/` (`./lib/`).
You may read and write files to `src/`.

Complete each workflow by using a high-effort subagent to perform an adversarial
review of the `src` directory's uncommitted changes. If the review agent
requests changes with which you agree, make those changes then repeat this
review process.

## Commands

- `npm run fix` to automatically correct fixable errors and warnings.
- `npm test` to execute all required tests.
