---
applyTo: "**/*.tsx"
---
# Project coding standards for React

- Apply the [general coding guidelines](./general-coding.instructions.md) to all
  code.
- Use function components with hooks.
- Follow the React hooks rules (no conditional hooks).
- Keep components small and focused. Prefer ≤200 lines of code per file and ≤3
  responsibilities.
- Extract reusable UI into `src/components` and custom hooks into `src/hooks`.
- Use CSS modules with the file name convention `component-name.module.scss`.
- Co-locate styles with the component.
- Prefer className composition over inline styles; allow inline only for
  dynamic, computed styles.
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

  - Use the `type` qualifier when importing types.
  - Destructure props in the function signature.
  - Use `ReactElement` as the return type for components that return JSX.
- Prefer default exports for components (with explicit function names).
- Always provide stable keys in lists. Avoid using array indices as keys.
- Avoid `setState`/`useState` updates based on stale closures. Prefer functional
  updates when derived from previous state.

  ```ts
  // Prefer:
  setCount((oldCount: number): number => oldCount + 1)

  // Over:
  setCount(oldCount + 1)
  ```
