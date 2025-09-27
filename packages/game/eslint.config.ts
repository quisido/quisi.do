import configs from '@quisido/eslint-config';
import type { Linter } from 'eslint';

export default [
  ...configs,

  {
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      'id-length': ['error', { exceptions: ['x', 'y'], properties: 'never' }],
      'max-lines-per-function': 'off',
      'max-params': 'off',
      'max-statements': 'off',
      'no-magic-numbers': 'off',
    },
  },
] satisfies readonly Linter.Config[];
