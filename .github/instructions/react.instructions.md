---
applyTo: "**/*.tsx"
---
# Project coding standards for React

- Apply the [general coding guidelines](./general-coding.instructions.md) to all
  code.
- Use function components with hooks.
- Follow the React hooks rules (no conditional hooks).
- Keep components small and focused.
- Use CSS modules for component styling.
- Type props explicitly; avoid React.FC. Prefer:
  - interface Props { ... }
  - function Component(props: Props): ReactElement
- Prefer named default exports for components.
- Lists: always provide stable keys; avoid array index as key.
- Avoid setState/useState updates based on stale closures; prefer functional
  updates when derived from previous state.
