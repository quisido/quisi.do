---
name: typescript
description: "TypeScript guidelines. Use when editing or reviewing `**/*.ts` and `**/*.tsx` files."
allowed-tools: Read Write
license: MIT
metadata:
  author: quisi.do
---
# TypeScript guidelines

## Conventions

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

## Constraints

- Do not prefix interfaces with `I` (e.g., use `User` instead of `IUser`)
  unless the name is already taken. For example, if a React component is
  already named `User`, then fallback to `IUser` for the interface.
