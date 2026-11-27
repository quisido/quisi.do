---
agent: build
description: Fix findings from an NPM security audit.
---
# Fix NPM Audit

1. Run `npm audit fix --force --include-workspace-root --workspaces` to
   automatically upgrade dependencies.
2. Patch `package.json`'s `overrides` and/or `package-lock.json` to resolve
   logged errors. Keep each override inside the API its consumer uses: an
   override outside the range the consumer declares can clear an audit finding
   while breaking that package at runtime (see *Accepted findings*).
3. Run `npm install --package-lock-only` to update the lock file.
4. Run `npm ci` to validate the lock file.
5. Run `npm run build` and `npm test` to verify that changes were not breaking.

## Constraints

If resolving an audit finding requires authoring a custom module, **disregard**
that finding. Do not create new packages for the sake of resolving the audit. It
is better to wait for an official patch than to maintain a new package.

## Accepted findings

Do not add `overrides` for these findings:

- `file-type` <21.3.1 (GHSA-5v7r-6r5c-r473) and `fast-xml-parser` <=5.11.2
  (GHSA-474x-hrwr-fgx4), reached only through Webhint: `@hint/utils@7.0.24` →
  `file-type@16.5.4` and `is-svg@4.4.0` → `fast-xml-parser@4.5.7`. Webhint has
  been unmaintained since 2024, and no release that clears these advisories is
  usable:
  - `file-type` 17 became ESM-only and renamed `fromBuffer()` to
    `fileTypeFromBuffer()`, so `@hint/utils` throws
    `(0 , file_type_1.fromBuffer) is not a function` while Webhint's Puppeteer
    connector records each response.
  - `is-svg` 5 became ESM-only and rejects the `Buffer` that `@hint/utils`
    passes (`Expected a string, got object`).
  - `is-svg@4.4.0` requires the `fast-xml-parser` 4 API, which is the last
    release line affected by the advisory.
  These are dev-only, denial-of-service findings in a tool that only inspects
  this repository's own assets; the production site does not ship them.
