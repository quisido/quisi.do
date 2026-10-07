# Design System Template

The design system template is a collection of generic placeholder components
that represent ARIA roles and WCAG-compliant functionality.

```tsx
import { Application, Button, Heading, Paragraph } from '...';

<Application>
  <Heading>Accessible Design</Heading>
  <Paragraph>It's the foundation of a good system.</Paragraph>
  <Button onClick={handleClick}>Continue</Button>
</Application>
```

Run the shared conformance suite from the package root:

```sh
VITE_TESTED_DESIGN_SYSTEM=template npx vitest run src/design-systems/core-test/
```
