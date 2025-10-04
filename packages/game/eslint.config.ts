import configs from '@quisido/eslint-config';
import type { Linter } from 'eslint';

export default [
  ...configs,

  {
    name: '@quisido/game',
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      'id-length': ['warn', { exceptions: ['x', 'y'], properties: 'never' }],
      'max-lines-per-function': 'warn',
      'max-params': 'warn',
      'max-statements': 'warn',
      'no-magic-numbers': 'warn',
      'no-ternary': 'warn',
      'no-warning-comments': 'warn',
    },
  },
] satisfies readonly Linter.Config[];
