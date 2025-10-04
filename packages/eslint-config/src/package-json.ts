import defineConfig from './define-config.js';
import JSON from './json.js';

export default defineConfig({
  ...JSON,
  files: ['**/package.json'],
  ignores: [],
  name: '@quisido/package-json',

  rules: {
    ...JSON.rules,

    'json/sort-keys': 'off',
    'jsonc/sort-keys': [
      'error',
      {
        allowLineSeparatedGroups: false,
        order: [
          'name',
          'version',
          {
            keyPattern: '^(?!(dependencies|devDependencies|peerDependencies)$)',
            order: { type: 'asc' },
          },
          'dependencies',
          'devDependencies',
          'peerDependencies',
        ],
        pathPattern: '^$',
      },
      {
        allowLineSeparatedGroups: false,
        order: [
          'types',
          { keyPattern: '^(?!(default)$)', order: { type: 'asc' } },
          'default',
        ],
        pathPattern: 'exports',
      },
      {
        order: { type: 'asc' },
        pathPattern: '.*',
      },
    ],
  },
});
