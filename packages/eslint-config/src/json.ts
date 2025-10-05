import jsonPlugin from '@eslint/json';
import type { ESLint } from 'eslint';
import jsonc from 'eslint-plugin-jsonc';
import defineConfig from './define-config.js';
import { LINTER_OPTIONS } from './linter-options.js';

/**
 *   We don't use Prettier here, because Prettier does not support empty lines
 * in JSON files.
 */

export default defineConfig({
  extends: [],
  files: ['**/.*.json', '**/*.json', '**/*.webmanifest'],
  ignores: [
    '.vscode/*.json',
    'package-lock.json',
    'tsconfig.json',
    'tsconfig.*.json',
  ],
  language: 'json/json',
  linterOptions: LINTER_OPTIONS,
  name: '@quisido/json',
  plugins: {
    ...jsonPlugin.configs.recommended.plugins,
    json: jsonPlugin,
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
