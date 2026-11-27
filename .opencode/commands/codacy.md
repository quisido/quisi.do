---
agent: build
description: Fix issues and security findings for this repository.
---
# Fix Codacy Issues and Security Findings

Run `npx @codacy/codacy-cloud-cli findings gh quisido quisi.do --limit 1000` to
see Codacy's security findings and
`npx @codacy/codacy-cloud-cli issues gh quisido quisi.do --limit 1000` to see
Codacy issues.

Correct these findings and issues.

## Constraints

If the correction conflicts with this repository's testing (e.g. lint rules),
_do not make the correction_. Instead, summarize the list of inactionable items
after all other items have been resolved.
