import defineConfig from './define-config.js';
import JSON from './json.js';

export default defineConfig({
  ...JSON,
  files: ['**/package.json'],
  ignores: [],
  name: '@quisido/package-json',

  rules: {
    ...JSON.rules,

    // `exports.types` has to be first.
    'json/sort-keys': 'off',
  },
});
