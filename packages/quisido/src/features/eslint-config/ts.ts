import { type Plugin } from '@eslint/config-helpers';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import {
  flatConfigs as importXFlatConfigs,
  importX,
} from 'eslint-plugin-import-x';
import sortKeysCustomOrder from 'eslint-plugin-sort-keys-custom-order';
import { configs as tsConfigs } from 'typescript-eslint';

import validateArray from '../../utils/validate-array.js';
import defineConfig, { type Config } from './define-config.js';
import fileGlobsByExtension from './file-globs-by-extension.js';
import { JS_CONFIG } from './js.js';
import mapConfigsToRules from './map-configs-to-rules.js';
import { TYPESCRIPT_LANGUAGE_OPTIONS } from './typescript-language-options.js';

export { TYPESCRIPT_LANGUAGE_OPTIONS } from './typescript-language-options.js';

export const TS_CONFIG: Config = defineConfig({
  ...JS_CONFIG,
  files: fileGlobsByExtension('ts', 'tsx'),
  ignores: fileGlobsByExtension('d.ts', 'test.ts', 'test.tsx'),
  languageOptions: TYPESCRIPT_LANGUAGE_OPTIONS,
  name: '@quisido/ts',

  plugins: {
    ...JS_CONFIG.plugins,
    '@typescript-eslint': tsPlugin as unknown as Plugin,
    'import-x': importX,
    'sort-keys-custom-order': sortKeysCustomOrder as unknown as Plugin,
  },

  rules: {
    ...JS_CONFIG.rules,
    ...importXFlatConfigs.typescript.rules,
    ...tsConfigs.base.rules,
    ...tsConfigs.eslintRecommended.rules,
    ...mapConfigsToRules(tsConfigs.stylisticTypeChecked),
    ...mapConfigsToRules(tsConfigs.recommendedTypeChecked),
    ...mapConfigsToRules(tsConfigs.strictTypeChecked),

    '@typescript-eslint/consistent-type-imports': [
      'error',
      { fixStyle: 'inline-type-imports', prefer: 'type-imports' },
    ],

    /**
     * The ESLint rule is incorrect here when it throws "Explicit undefined is
     * unnecessary on an optional parameter." The rule does not allow for
     * `f(x?: X | undefined)` to be called with `f(undefined)`.
     */
    '@typescript-eslint/no-duplicate-type-constituents': [
      'error',
      { ignoreUnions: true },
    ],

    /**
     * Until this rule can be disabled for exports, it is incompatible with
     * `isolatedDeclarations`, e.g. `export const x: string = 'hello';`.
     */
    '@typescript-eslint/no-inferrable-types': 'off',

    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'all',
        argsIgnorePattern: '^_',
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_',
        ignoreRestSiblings: false,
      },
    ],

    '@typescript-eslint/restrict-template-expressions': [
      'error',
      {
        allow: [{ from: 'lib', name: ['URLSearchParams'] }],
        allowNumber: true,
      },
    ],

    // Exhaustive `switch`es do not require a default case.
    'default-case': 'off',
    'no-invalid-this': 'off',

    /**
     * ESLint incorrectly flags shadowing in TypeScript: (1) `enum`s and (2)
     * functions with `this` inside other functions with `this`.
     */
    'no-shadow': 'off',

    // https://eslint.org/docs/latest/rules/no-undef#handled_by_typescript
    'no-undef': 'off',

    // Required for `@typescript-eslint/no-floating-promises`.
    'no-void': ['error', { allowAsStatement: true }],

    /**
     * Until this rule can be disabled for exports, it is incompatible with
     * `isolatedDeclarations`, e.g. `export const { property } = object;`.
     */
    'prefer-destructuring': 'off',
    'sort-keys-custom-order/type-keys': ['error', { sorting: 'asc' }],
  },

  settings: {
    'import-x/extensions': [
      '.ts',
      '.tsx',
      ...validateArray(JS_CONFIG.settings['import-x/extensions']),
    ],
    'import-x/resolver-next': [
      createTypeScriptImportResolver({
        alwaysTryTypes: false,
        bun: true,
        enforceExtension: 1,
      }),
    ],
  },
});
