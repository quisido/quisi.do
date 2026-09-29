import { type Plugin } from '@eslint/config-helpers';
import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import {
  flatConfigs as importXFlatConfigs,
  importX as importXPlugin,
} from 'eslint-plugin-import-x';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierPluginRecommended from 'eslint-plugin-prettier/recommended';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
import sortKeysCustomOrder from 'eslint-plugin-sort-keys-custom-order';

import defineConfig, { type Config } from './define-config.js';
import fileGlobsByExtension from './file-globs-by-extension.js';
import { LANGUAGE_OPTIONS } from './language-options.js';
import { LINTER_OPTIONS } from './linter-options.js';

const IGNORED_EXTENSIONS = [
  'code-workspace',
  'css',
  'gif',
  'jpg',
  'json',
  'jsonc',
  'png',
  'scss',
] as const;

const toDot = (ext: string): string => `.${ext}`;

export const JS_CONFIG: Config = defineConfig({
  extends: [],
  files: fileGlobsByExtension('js', 'jsx', 'mjs'),
  ignores: [],
  languageOptions: LANGUAGE_OPTIONS,
  linterOptions: LINTER_OPTIONS,
  name: '@quisido/js',

  plugins: {
    'import-x': importXPlugin,
    prettier: prettierPlugin,
    'simple-import-sort': simpleImportSortPlugin,
    'sort-keys-custom-order': sortKeysCustomOrder as unknown as Plugin,
  },

  rules: {
    ...js.configs.all.rules,
    ...js.configs.recommended.rules,
    ...importXFlatConfigs.react.rules,
    ...importXFlatConfigs.recommended.rules,
    ...importXFlatConfigs['stage-0'].rules,
    ...prettierConfig.rules,
    ...prettierPluginRecommended.rules,
    camelcase: ['error', { properties: 'never' }],
    // Commented out code may be lowercase.
    'capitalized-comments': 'off',
    complexity: 'warn',
    // Too many false positives.
    'consistent-return': 'off',
    'func-name-matching': 'off',
    'id-length': [
      'error',
      { exceptions: ['_', 'x', 'y'], properties: 'never' },
    ],
    'import-x/consistent-type-specifier-style': ['error', 'prefer-inline'],
    'import-x/default': 'error',
    'import-x/dynamic-import-chunkname': ['error', { allowEmpty: true }],
    'import-x/export': 'error',
    'import-x/exports-last': 'error',
    // `import-x/extensions` throws an error when importing files with `.d.ts`.
    'import-x/extensions': 'off',
    'import-x/first': 'error',
    'import-x/group-exports': 'off',
    'import-x/imports-first': 'error',
    // You can't always control how many dependencies a module has.
    'import-x/max-dependencies': 'off',
    'import-x/named': 'error',
    'import-x/namespace': 'error',
    'import-x/newline-after-import': 'error',
    'import-x/no-absolute-path': 'error',
    'import-x/no-amd': 'error',
    'import-x/no-anonymous-default-export': 'error',
    'import-x/no-commonjs': 'error',
    'import-x/no-cycle': 'error',
    // Some files expect a default export, e.g. `eslint.config.ts`.
    'import-x/no-default-export': 'off',
    'import-x/no-deprecated': 'error',
    'import-x/no-duplicates': 'error',
    'import-x/no-dynamic-require': 'error',
    'import-x/no-empty-named-blocks': 'error',
    'import-x/no-extraneous-dependencies': 'error',
    'import-x/no-import-module-exports': 'error',
    // Some exports are internal modules, e.g. `eslint/config`.
    'import-x/no-internal-modules': 'off',
    'import-x/no-mutable-exports': 'error',
    'import-x/no-named-as-default': 'error',
    'import-x/no-named-as-default-member': 'error',
    'import-x/no-named-default': 'error',
    'import-x/no-named-export': 'off',
    // Some dependencies are vended as namespaces.
    'import-x/no-namespace': 'off',
    'import-x/no-nodejs-modules': 'error',
    'import-x/no-relative-packages': 'error',
    'import-x/no-relative-parent-imports': 'off',
    // Some dependencies poorly name their default exports.
    'import-x/no-rename-default': 'off',
    'import-x/no-restricted-paths': 'error',
    'import-x/no-self-import': 'error',
    'import-x/no-unassigned-import': [
      'error',
      { allow: ['**/*.css', '**/*.scss'] },
    ],
    'import-x/no-unresolved': [
      'error',
      {
        amd: false,
        commonjs: false,
        ignore: [`\\.(?:${IGNORED_EXTENSIONS.join('|')})$`],
      },
    ],
    'import-x/no-unused-modules': [
      'error',
      {
        ignoreUnusedTypeExports: false,
        missingExports: true,
        suppressMissingFileEnumeratorAPIWarning: true,
        unusedExports: true,
      },
    ],
    'import-x/no-useless-path-segments': 'error',
    'import-x/no-webpack-loader-syntax': 'error',
    // Disabled in favor of `simple-import-sort/imports`.
    'import-x/order': 'off',
    // Prefer named exports for `const`s.
    'import-x/prefer-default-export': 'off',
    'import-x/prefer-namespace-import': 'error',
    'import-x/unambiguous': 'error',
    /**
     * `eslint-plugin-simple-import-sort` recommends these `import` settings be
     * "error", but they are incompatible with ESLint >=10.
     */
    'import/first': 'off',
    'import/newline-after-import': 'off',
    'import/no-duplicates': 'off',
    // Disable in favor of `simple-import-sort/imports`.
    'import/order': 'off',
    'max-lines': 'warn',
    'max-lines-per-function': [
      'warn',
      { IIFEs: true, skipBlankLines: true, skipComments: true },
    ],
    'max-params': 'warn',
    'max-statements': 'warn',
    'no-bitwise': 'off',
    'no-continue': 'off',
    'no-global-assign': 'error',
    // This is better handled by `@stylistic/max-len` or Prettier.
    'no-inline-comments': 'off',
    'no-magic-numbers': ['error', { ignore: [-1, 0, 1] }],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-shadow-restricted-names': 'error',
    // This rule is a good goal, but some ternaries are better than their alternatives.
    'no-ternary': 'warn',
    // This is safe due to `no-global-assign` and `no-shadow-restricted-names`.
    'no-undefined': 'off',
    'one-var': 'off',
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^\\u0000'],
          ['^node:'],
          ['^@?\\w'],
          [
            '^\\.\\./\\.\\./\\.\\./\\.\\./\\.\\./',
            '^\\.\\./\\.\\./\\.\\./\\.\\./',
            '^\\.\\./\\.\\./\\.\\./',
            '^\\.\\./\\.\\./',
            '^\\.\\./',
            '^\\./',
          ],
        ],
      },
    ],
    'sort-imports': [
      'error',
      {
        allowSeparatedGroups: false,
        // Ignore features handled by `eslint-plugin-import`.
        ignoreCase: true,
        ignoreDeclarationSort: true,
        ignoreMemberSort: true,
      },
    ],
    'sort-keys': 'off',
    'sort-keys-custom-order/export-object-keys': ['error', { sorting: 'asc' }],
    'sort-keys-custom-order/import-object-keys': ['error', { sorting: 'asc' }],
    'sort-keys-custom-order/object-keys': ['error', { sorting: 'asc' }],
  },

  settings: {
    'import-x/extensions': ['.js', '.jsx', ...IGNORED_EXTENSIONS.map(toDot)],
  },
});
