import js from '@eslint/js';
import type { Linter } from 'eslint';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierPluginRecommended from 'eslint-plugin-prettier/recommended';
import { LANGUAGE_OPTIONS } from './language-options.js';
import { LINTER_OPTIONS } from './linter-options.js';

export default {
  files: ['**/*.js', '**/*.mjs'],
  languageOptions: LANGUAGE_OPTIONS,
  linterOptions: LINTER_OPTIONS,
  name: '@quisido/js',
  settings: {},

  plugins: {
    prettier: prettierPlugin,
  },

  rules: {
    ...js.configs.all.rules,
    ...js.configs.recommended.rules,
    ...prettierConfig.rules,
    ...prettierPluginRecommended.rules,
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
} satisfies Required<Omit<Linter.FlatConfig, 'ignores' | 'processor'>>;
