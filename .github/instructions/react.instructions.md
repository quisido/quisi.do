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
  ```ts
  interface Props {
    // ...
  }

  function Component(props: Props): ReactElement {
    // ...
  }
  ```
- Prefer named default exports for components.
- Always provide stable keys in lists. Avoid using array indices as keys.
- Avoid `setState`/`useState` updates based on stale closures. Prefer functional
  updates when derived from previous state.
