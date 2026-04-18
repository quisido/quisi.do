# Codex Code Review

You are performing an automated code review on a pull request.

## Project Context

Read and follow `AGENTS.md` at the repository root. It contains the project's
architecture, coding standards, and references to additional instruction files in
`.github/instructions/`.

## Review Scope

Review **only** the changes introduced by this pull request. Use the git SHAs
provided in the "Pull Request Context" section (appended below at build time) to
scope your diff:

```sh
git diff <base_sha>...<head_sha>
```

Do not review or comment on code that was not changed in this PR.

## Review Actions

### Confident Fixes

If you identify an issue and are **confident** the fix is correct — for example,
a clear bug, a typo, a missing null check, or a style violation defined in the
project's coding standards — **edit the file directly** to apply the fix.

### Unconfident Concerns

If you have a concern but are **not confident** it warrants a change — for
example, a potential design issue, a question about intent, or a suggestion that
may conflict with unstated requirements — **do not edit any files**. Instead,
describe the concern in your final output message.

## Output Format

Structure your final message as a code review summary:

1. **Fixes Applied** — List each file you edited and briefly describe the change.
2. **Concerns** — List any unconfident observations or suggestions.
3. **Overall Assessment** — A brief summary of the PR's quality.

If you made no edits and have no concerns, say so concisely.
