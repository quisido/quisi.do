import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierPluginRecommended from 'eslint-plugin-prettier/recommended';
import jsonPlugin from '@eslint/json';
import defineConfig from './define-config.js';
import { LINTER_OPTIONS } from './linter-options.js';
import { JSON_PLUGINS } from './json-plugins.js';

export default defineConfig({
  extends: ['json/recommended'],
  files: ['**/.*.json', '**/*.json'],
  ignores: ['.vscode/*.json'],
  language: 'json/json',
  linterOptions: LINTER_OPTIONS,
  name: '@quisido/json',
  settings: {},

  plugins: {
    ...JSON_PLUGINS,
    prettier: prettierPlugin,
  },

  rules: {
    ...jsonPlugin.configs.recommended.rules,
    ...prettierConfig.rules,
    ...prettierPluginRecommended.rules,
    'no-duplicate-keys': 'error',
    'no-empty-keys': 'error',
    'no-unnormalized-keys': 'error',
    'no-unsafe-values': 'error',
    'sort-keys': 'error',
    'top-level-interop': 'error',
  },
});
