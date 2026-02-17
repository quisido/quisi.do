import jsonPlugin from '@eslint/json';
import { type ESLint } from 'eslint';
import jsonc from 'eslint-plugin-jsonc';
import defineConfig, { type Config } from './define-config.js';
import { LINTER_OPTIONS } from './linter-options.js';

/**
 *   We don't use Prettier here, because Prettier does not support empty lines
 * in JSON files.
 */

const JSON_CONFIG: Config = defineConfig({
  extends: [],

  files: [
    '**/.*.json',
    '**/*.json',
    '**/*.webmanifest',

    // Webhint
    '**/browser.info',
  ],

  ignores: [
    // NPM
    '**/package-lock.json',

    // TypeScript
    '**/tsconfig.json',
    '**/tsconfig.*.json',

    // VS Code
    '**/.vscode/*.json',
    '**/*.code-workspace',

    // Webhint
    '**/.hintrc',
    '**/hintrc.*.json',

    // Wrangler
    '**/wrangler.json',
  ],

  language: 'json/json',
  linterOptions: LINTER_OPTIONS,
  name: '@quisido/json',

  plugins: {
    ...jsonPlugin.configs.recommended.plugins,
    json: jsonPlugin as unknown as ESLint.Plugin,
    jsonc: jsonc as ESLint.Plugin,
  },

  rules: {
    ...jsonPlugin.configs.recommended.rules,
    'json/no-duplicate-keys': 'error',
    'json/no-empty-keys': 'error',
    'json/no-unnormalized-keys': 'error',
    'json/no-unsafe-values': 'error',
    'json/sort-keys': 'off',
    'json/top-level-interop': 'error',
    'jsonc/sort-keys': [
      'error',
      'asc',
      {
        allowLineSeparatedGroups: false,
        caseSensitive: true,
        minKeys: 2,
        natural: false,
      },
    ],
    'max-lines-per-function': 'off',
  },

  settings: {},
});

export default JSON_CONFIG;
