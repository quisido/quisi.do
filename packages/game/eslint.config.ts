import configs from '@quisido/eslint-config';
import { TYPESCRIPT_LANGUAGE_OPTIONS } from '@quisido/eslint-config/ts';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import type { ESLint, Linter } from 'eslint';

export default [
  ...configs,

  {
    files: ['**/*.ts', '**/*.tsx'],
    name: '@quisido/game',
    rules: {
      'id-length': ['warn', { exceptions: ['x', 'y'], properties: 'never' }],
      'max-lines-per-function': 'warn',
      'max-params': 'warn',
      'max-statements': 'warn',
      'no-magic-numbers': 'warn',
      'no-ternary': 'warn',
      'no-warning-comments': 'warn',
    },
  },

  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: TYPESCRIPT_LANGUAGE_OPTIONS,
    name: '@quisido/game/ts',
    plugins: {
      '@typescript-eslint': tsPlugin as unknown as ESLint.Plugin,
    },
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
    },
  },
] satisfies readonly Linter.Config[];
