# Phantasmagoria

A dreamscape in midnight indigo, glacial cyan, spectral lavender, and moonlit
silver. Interference rings and fine diagonal grain suggest a reality that
cannot quite be held. Asymmetric rounded silhouettes, layered shadows, and
luminous edges give controls the feeling of objects suspended in mist.

All 64 components implement the shared core API. The palette and surface,
control, canvas, and typography treatments live in `_dream.scss`. Text stays
crisp; textures are CSS backgrounds rather than overlays. Keyboard focus is
outlined in cyan, selected states change both their fill and border, and
forced-color mode uses system borders. The design uses no animation.

```tsx
import { Application, Button, Heading, Paragraph } from './index.js';

<Application>
  <Heading>Beyond the waking world</Heading>
  <Paragraph>A familiar shape, just outside your grasp.</Paragraph>
  <Button onClick={enterDream}>Enter the dream</Button>
</Application>
```

Run the shared conformance suite from the package root:

```sh
VITE_TESTED_DESIGN_SYSTEM=phantasmagoria npx vitest run src/design-systems/core-test/
```
