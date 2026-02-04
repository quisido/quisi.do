import configs from '@quisido/eslint-config';
import { TYPESCRIPT_LANGUAGE_OPTIONS } from '@quisido/eslint-config/ts';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import type { ESLint, Linter } from 'eslint';

const CONFIG: Linter.Config[] = [
  ...configs,

  {
    files: ['**/*.ts', '**/*.tsx'],
    name: '@quisido/game',
    rules: {
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
];

export default CONFIG;
