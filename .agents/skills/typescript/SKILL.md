---
name: typescript
description: "Use these TypeScript guidelines when editing or reviewing `**/*.ts` and `**/*.tsx` files."
license: MIT
user-invocable: false
metadata:
  author: quisi.do
---

# TypeScript guidelines

## Conventions

- Follow functional programming principles where possible.
- Prefer immutable data (`const`, `readonly`).
- Prefer `interface`s to `type`s where possible.
- Support `exactOptionalPropertyTypes` by explicitly including `| undefined` in
  optional property definitions, i.e. `readonly foo?: string | undefined`.
- When a function only takes one parameter and that parameter is an untyped
  object, name that parameter's interface `Options`.

  ```ts
  interface Options { /* ... */ }
  export default function myFn({ /* ... */ }: Options): void {}
  ```

## Constraints

- Do not prefix interfaces with `I` (e.g. use `User` instead of `IUser`) unless
  the name is already taken. For example, if a React component is already named
  `User`, then fallback to `IUser` for the interface.
