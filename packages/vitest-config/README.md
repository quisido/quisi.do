# [quisi.do](https://quisi.do) vitest configuration

[![CI/CD](https://github.com/quisido/quisi.do/actions/workflows/cd.yml/badge.svg?branch=main&event=push)](https://github.com/quisido/quisi.do/actions/workflows/cd.yml)
[![version](https://img.shields.io/npm/v/@quisido/vitest-config.svg)](https://www.npmjs.com/package/@quisido/vitest-config)
[![downloads](https://img.shields.io/npm/dt/@quisido/vitest-config.svg)](https://www.npmjs.com/package/@quisido/vitest-config)

The `@quisido/vitest-config` provides preconfigured vitest configuration for
best practices, such as resetting mocks and coverage thresholds.

The simplest implementation is to just export the entire module as your vitest
configuration.

```js
// vitest.config.ts
export { default } from '@quisido/vitest-config';
```

To extend the configuration, you may spread the default export.

```js
// vitest.config.js
import { defineConfig } from 'vitest/config';
import USER_CONFIG from '@quisido/vitest-config';

export default defineConfig({
  ...USER_CONFIG,
  // Add your custom configuration here.
]);
```
