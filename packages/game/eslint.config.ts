import configs from '@quisido/eslint-config';
import type { Linter } from 'eslint';

export default [
  ...configs,

  {
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
      // `react-reconciler`'s `OpaqueRoot` is explicitly typed as `any`.
      '@typescript-eslint/no-unsafe-assignment': 'off',
      'id-length': ['error', { properties: 'never' }],
      'max-lines-per-function': 'off',
      'max-params': 'off',
      'max-statements': 'off',
      'no-magic-numbers': 'off',
    },
  },
] satisfies readonly Linter.Config[];
