# CommonJS-TypeScript bridge

The `cjs-ts` package bridges CommonJS and TypeScript files by offering minimal
effort in ecosystems that would otherwise not support TypeScript.

For example, none of Cypress, Jest (via Yarn modern), Lighthouse, Next, or NYC
offer TypeScript configuration support. The `cjs-ts` package helps forward their
`.config.cjs` files to their respective TypeScript implementations.

```cjs
// cypress.config.cjs
require('cjs-ts');
module.exports = require('./cypress.config.ts').default;
```

```cjs
// jest.config.cjs
require('cjs-ts');
module.exports = require('./jest.config.ts').default;
```

```cjs
// lighthouse.config.cjs
require('cjs-ts');
module.exports = require('./jest.config.ts').default;
```

```cjs
// next.config.cjs
require('cjs-ts');
module.exports = require('./next.config.ts').default;
```

```cjs
// nyc.config.cjs
require('cjs-ts');
module.exports = require('./nyc.config.ts').default;
```
