---
name: typescript
description: "TypeScript guidance. Use when editing or reviewing **/*.ts and **/*.tsx files, interfaces, type aliases, optional properties, and TypeScript module patterns."
---
# TypeScript Guidelines

Apply this skill when working with `**/*.ts` or `**/*.tsx` files.

- Do not prefix interfaces with `I` (e.g., use `User` instead of `IUser`).
- Follow functional programming principles where possible.
- Prefer immutable data (`const`, `readonly`).
- Support `exactOptionalPropertyTypes` by explicitly including `| undefined` in
  optional property definitions, e.g. `readonly foo?: string | undefined`.
- Use interfaces for data structures and type definitions.
- When a function only takes one parameter and that parameter is an untyped
  object, name that parameter's interface `Options`.

  ```ts
  interface Options { /* ... */ }
  export default function myFn({ /* ... */ }: Options): void {}
  ```
