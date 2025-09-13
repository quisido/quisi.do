---
applyTo: "**"
---
# Project general coding standards

## Naming Conventions
- Use PascalCase for classes, components, enums, interfaces, and type aliases.
- Use camelCase for variables, functions, and methods.
- Do not prefix interfaces with `I` (e.g., use `User` instead of `IUser`).
- Prefer private member variables with `#` over `private`.
- Use ALL_CAPS for constants
- Use meaningful and descriptive names.
- Avoid abbreviations unless they are widely recognized.
- External payloads may keep their original casing; map at boundaries if needed.
- Use singular nouns for types and interfaces, plural for arrays.
- Use verbs for function and method names.
- Use `on<Event>` for event handler functions (e.g., `onClick`, `onSubmit`).

## Error Handling
- Use try/catch blocks for async operations
- Implement proper error boundaries in React components
- Always log errors with contextual information
