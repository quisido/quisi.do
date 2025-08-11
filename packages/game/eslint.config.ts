import configs from '@quisido/eslint-config';
import type { Linter } from 'eslint';

export default [
  ...configs,

  {
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
      'id-length': ['error', { properties: 'never' }],
      'max-params': 'off',
      'max-statements': 'off',
      'no-magic-numbers': 'off',
    },
  },
] satisfies readonly Linter.Config[];
