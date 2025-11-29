import defineConfig, { type Config } from './define-config.js';
import JSON from './json.js';
import { PACKAGE_JSON_SORT_KEYS_OPTIONS } from './package-json-sort-keys-options.js';

const PACKAGE_JSON_CONFIG: Config = defineConfig({
  ...JSON,
  files: ['**/package.json'],
  ignores: [],
  name: '@quisido/package-json',
  rules: {
    ...JSON.rules,
    'json/sort-keys': 'off',
    'jsonc/sort-keys': ['error', ...PACKAGE_JSON_SORT_KEYS_OPTIONS],
  },
});

export default PACKAGE_JSON_CONFIG;
