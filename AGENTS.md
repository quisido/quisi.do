# Instructions for agents

## Skills

For task-specific guidance, consult the relevant skill in `.agents/skills/`:

- `.agents/skills/cloudflare/` — Cloudflare Worker implementations
- `.agents/skills/react/` — TSX / React components
- `.agents/skills/testing/` — End-to-end, integration, and unit tests
- `.agents/skills/typescript/` — TypeScript source files

## Guidelines

- When authoring scripts, use TypeScript exclusively.

### Naming conventions

- Avoid abbreviations unless they are widely recognized.
- Prefer private member variables with `#` over `private`.
- Use meaningful and descriptive names.
- Use `on<Event>` for event handlers (e.g., `onClick`, `onSubmit`).
- Use singular nouns for types and interfaces, plural for arrays.
- Use verbs for function and method names.

#### Casing

- Use ALL_CAPS for constants
- Use camelCase for variables, functions, and methods.
- Use PascalCase for classes, components, enums, interfaces, and type aliases.
- Third party API calls may keep their original casing; that casing may be
  converted to this repository's casing at API call boundaries.

### Error handling

- Always include non-PII context.
- Avoid blanket `try`/`catch` that swallows errors; re-throw or wrap with
  domain-specific errors.
- Do not log secrets or PII; apply redaction where needed.
- Standardize log levels as error, warning, or informational.
- Use `try`/`catch` around `await` at logical boundaries.
