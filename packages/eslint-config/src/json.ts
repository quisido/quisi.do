import jsonPlugin from '@eslint/json';
import defineConfig from './define-config.js';
import { JSON_PLUGINS } from './json-plugins.js';
import { LINTER_OPTIONS } from './linter-options.js';

/**
 *   We don't use Prettier here, because Prettier does not support empty lines
 * in JSON files.
 */

export default defineConfig({
  extends: [],
  files: ['**/.*.json', '**/*.json', '**/*.webmanifest'],
  language: 'json/json',
  linterOptions: LINTER_OPTIONS,
  name: '@quisido/json',
  settings: {},

  ignores: [
    '.vscode/*.json',
    'package-lock.json',
    'tsconfig.json',
    'tsconfig.*.json',
  ],

  plugins: {
    ...JSON_PLUGINS,
  },

  rules: {
    ...jsonPlugin.configs.recommended.rules,
    'json/no-duplicate-keys': 'error',
    'json/no-empty-keys': 'error',
    'json/no-unnormalized-keys': 'error',
    'json/no-unsafe-values': 'error',

    'json/sort-keys': [
      'error',
      'asc',
      {
        allowLineSeparatedGroups: true,
        natural: true,
      },
    ],

    'json/top-level-interop': 'error',
  },
});
