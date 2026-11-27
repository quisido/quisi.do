---
agent: build
description: Fix findings from an NPM security audit.
---
# Fix NPM Audit

1. Run `npm audit fix --force --include-workspace-root --workspaces` to
   automatically upgrade dependencies.
2. Patch `package.json`'s `overrides` and/or `package-lock.json` to resolve
   logged errors.
3. Run `npm ci` to validate the lock file.
4. Run `npm run build` and `npm test` to verify that changes were not breaking.

## Constraints

If resolving an audit finding requires authoring a custom module, **disregard**
that finding. Do not create new packages for the sake of resolving the audit. It
is better to wait for an official patch than to maintain a new package.
