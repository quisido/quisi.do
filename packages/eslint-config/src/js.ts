import js from '@eslint/js';
import type { Linter } from "eslint";
import prettier from 'eslint-config-prettier';
import { LANGUAGE_OPTIONS } from './language-options.js';
import { LINTER_OPTIONS } from './linter-options.js';

export default {
  files: ['**/*.js', '**/*.mjs'],
  languageOptions: LANGUAGE_OPTIONS,
  linterOptions: LINTER_OPTIONS,
  name: '@quisido/js',
  plugins: {},
  settings: {},

  rules: {
    ...js.configs.all.rules,
    ...js.configs.recommended.rules,
    ...prettier.rules,
    'func-name-matching': 'off',
    'no-bitwise': 'off',
    'no-continue': 'off',
    'one-var': 'off',
    'sort-imports': 'off',

    // Too many false positives.
    'consistent-return': 'off',

    'sort-keys': [
      'error',
      'asc',
      {
        allowLineSeparatedGroups: true,
      },
    ],
  },
} satisfies Required<Omit<Linter.FlatConfig, 'ignores' | 'processor'>>
