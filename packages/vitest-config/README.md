# [quisi.do](https://quisi.do) ESLint configuration

[![CI/CD](https://github.com/quisido/quisi.do/actions/workflows/cd.yml/badge.svg?branch=main&event=push)](https://github.com/quisido/quisi.do/actions/workflows/cd.yml)
[![version](https://img.shields.io/npm/v/@quisido/eslint-config.svg)](https://www.npmjs.com/package/@quisido/eslint-config)
[![downloads](https://img.shields.io/npm/dt/@quisido/eslint-config.svg)](https://www.npmjs.com/package/@quisido/eslint-config)

The `@quisido/eslint-config` provides flat ESLint configurations for `.cjs`,
`.d.ts`, `.js`, `.test.ts`, and `.ts` files.

The simplest implementation is to just export the entire module as your ESLint
configuration.

```js
// eslint.config.js
export { default } from '@quisido/eslint-config';
```

To extend the configuration, you may spread the default export as an array.

```js
// eslint.config.js
import configs from '@quisido/eslint-config';

export default [
  ...configs,
  {
    // Add your custom configuration here.
  },
];
```

To cherry-pick or tailor any configurations, you may import them directly.

```js
// eslint.config.js
import CJS from '@quisido/eslint-config/cjs';
import D_TS from '@quisido/eslint-config/d-ts';
import JS from '@quisido/eslint-config/js';
import TEST_TS from '@quisido/eslint-config/test-ts';
import TS from '@quisido/eslint-config/ts';

export default [JS, CJS, TS, D_TS, TEST_TS];
```
