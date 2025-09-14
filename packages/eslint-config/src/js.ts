import js from '@eslint/js';
import type { ESLint } from 'eslint';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierPluginRecommended from 'eslint-plugin-prettier/recommended';
import sortKeysCustomOrder from 'eslint-plugin-sort-keys-custom-order';
import defineConfig from './define-config.js';
import { LANGUAGE_OPTIONS } from './language-options.js';
import { LINTER_OPTIONS } from './linter-options.js';

export default defineConfig({
  extends: [],
  files: ['**/*.js', '**/*.jsx', '**/*.mjs'],
  ignores: [],
  languageOptions: LANGUAGE_OPTIONS,
  linterOptions: LINTER_OPTIONS,
  name: '@quisido/js',

  plugins: {
    prettier: prettierPlugin,
    // @ts-expect-error The dependency is incorrectly typed.
    'sort-keys-custom-order': sortKeysCustomOrder as ESLint.Plugin,
  },

  rules: {
    ...js.configs.all.rules,
    ...js.configs.recommended.rules,
    ...prettierConfig.rules,
    ...prettierPluginRecommended.rules,

    camelcase: ['error', { properties: 'never' }],

    // Commented out code may be lowercase.
    'capitalized-comments': 'off',

    // Too many false positives.
    'consistent-return': 'off',

    'func-name-matching': 'off',
    'no-bitwise': 'off',
    'no-continue': 'off',

    // This is better handled by `@stylistic/max-len` or Prettier.
    'no-inline-comments': 'off',

    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'one-var': 'off',
    'sort-imports': 'off',
    'sort-keys': [
      'error',
      'asc',
      { allowLineSeparatedGroups: true, caseSensitive: false, natural: true },
    ],
    'sort-keys-custom-order/export-object-keys': ['error', { sorting: 'asc' }],
    'sort-keys-custom-order/import-object-keys': ['error', { sorting: 'asc' }],
    'sort-keys-custom-order/object-keys': ['error', { sorting: 'asc' }],
  },
  settings: {},
});
