---
name: react
description: "Code guidelines for TSX files. Use when editing or reviewing `.tsx` files, i.e. TypeScript React components."
allowed-tools: Read Write
license: MIT
metadata:
  author: quisi.do
---
# React guidelines

## Conventions

- Provide stable keys in lists. Avoid using array indices as keys.
- Co-locate styles with the component. Prefer CSS modules with the file name
  convention `component-name.module.scss`.
- Destructure props in the function signature.
- Extract reusable UI into `src/components` and custom hooks into `src/hooks`.
- Follow the React hooks rules (no conditional hooks).
- Keep components small and focused. Prefer <200 lines of code per file and <4
  responsibilities.
- Prefer className composition over inline styles; only use inline styles for
  dynamic, computed values.
- Prefer default exports for components (with explicit function names).
- Type props explicitly; avoid `React.FC`. Prefer:

  ```tsx
  import { type ReactElement, type ReactNode } from 'react';

  interface Props {
    readonly children: ReactNode;
  }

  export default function Component({ children }: Props): ReactElement {
    // ...
  }
  ```
- Use function components with hooks.
- Use `ReactElement` as the return type for components that return JSX.

## Constraints

- Never use `vi.mock`. Instead, write testable code and/or use dependency
  injection (e.g. React context).
- Avoid `setState`/`useState` updates based on stale closures. Prefer functional
  updates when derived from previous state.

  ```ts
  // Prefer:
  setCount((oldCount: number): number => oldCount + 1)

  // Over:
  setCount(oldCount + 1)
  ```
