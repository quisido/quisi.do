# Instructions for Design Systems

The design system directory is intended to by used by AI agents to generate
accessibility- and standards-compliant components using a rigorously-vetted API
and test suite.

- `core/` contains the implementation-agnostic TypeScript interfaces and utility
  hooks for each design system implementation. This represents the API by which
  consumers will interact with the AI-generated components.
- `core-test/` contains the implementation-agnostic test suites that are applied
  to every design system implementation. By focusing on accessible roles and
  names, the test suites employ user behavior to assess ARIA compliance.
- `template/` contains a bare-bones design system implementation. Agents clone
  this template before applying limitless implementation details and styles. As
  long as the implementation adheres to the `core` API and passes the
  `core-test` test suite, the agent has creative license.

## Testing Philosophy

- Tests should validate the component's behavior, not its implementation
  details. **Note:** ARIA attributes are considered a component's behavior; they
  integrate the component with assistive technologies.

## Sources

- [WAI ARIA role definitions](https://w3c.github.io/aria/#role_definitions)
