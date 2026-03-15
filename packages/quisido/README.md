# quisido

`quisido` is a custom build and test tool that consolidates configuration and
tooling, such as:

- **ESLint** to lint code
- **Vitest** to run test suites

## ESLint

```ts
// eslint.config.ts
import { defineESLintConfig, type ESLintConfig } from 'quisido';

const CONFIG: readonly ESLintConfig[] = defineESLintConfig({
  files: ['**/*.ts', '**/*.tsx'],
  name: 'my-custom-rules',
  rules: {
    '@typescript-eslint/no-non-null-assertion': 'warn',
    'no-ternary': 'warn',
  },
});

export default CONFIG;
```

## Vitest

```ts
// vitest.config.ts
import { defineVitestConfig, type VitestConfig } from 'quisido';

const CONFIG: VitestConfig = await defineVitestConfig({
  test: {
    coverage: {
      exclude: ['scripts/'],
    },
  },
});

export default CONFIG;
```
