import defineConfig, { type Config } from './define-config.js';
import { JSON_CONFIG } from './json.js';
import { PACKAGE_JSON_SORT_KEYS_OPTIONS } from './package-json-sort-keys-options.js';

export const PACKAGE_JSON_CONFIG: Config = defineConfig({
  ...JSON_CONFIG,
  files: ['**/package.json'],
  ignores: [],
  name: '@quisido/package-json',

  rules: {
    ...JSON_CONFIG.rules,
    'json/sort-keys': 'off',
    'jsonc/sort-keys': ['error', ...PACKAGE_JSON_SORT_KEYS_OPTIONS],
  },
});
