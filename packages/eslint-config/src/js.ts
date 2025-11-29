import js from '@eslint/js';
import type { ESLint } from 'eslint';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierPluginRecommended from 'eslint-plugin-prettier/recommended';
import sortKeysCustomOrder from 'eslint-plugin-sort-keys-custom-order';
import defineConfig, { type Config } from './define-config.js';
import { LANGUAGE_OPTIONS } from './language-options.js';
import { LINTER_OPTIONS } from './linter-options.js';

const JS_CONFIG: Config = defineConfig({
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
    'no-global-assign': 'error',

    // This is better handled by `@stylistic/max-len` or Prettier.
    'no-inline-comments': 'off',

    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-shadow-restricted-names': 'error',

    // This is safe due to `no-global-assign` and `no-shadow-restricted-names`.
    'no-undefined': 'off',

    'one-var': 'off',
    'sort-imports': 'off',
    'sort-keys': 'off',
    'sort-keys-custom-order/export-object-keys': ['error', { sorting: 'asc' }],
    'sort-keys-custom-order/import-object-keys': ['error', { sorting: 'asc' }],
    'sort-keys-custom-order/object-keys': ['error', { sorting: 'asc' }],
  },
  settings: {},
});

export default JS_CONFIG;
