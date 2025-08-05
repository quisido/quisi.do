import defineConfig from './define-config.js';
import JSON from './json.js';

export default defineConfig({
  ...JSON,
  ignores: ['node_modules/'],
  language: 'json/jsonc',
  name: '@quisido/jsonc',

  files: [
    '.vscode/*.json',
    '**/*.code-workspace',
    '**/*.jsonc',
    '.hintrc',
    '*.hintrc',
    'tsconfig.json',
    'tsconfig.*.json',
  ],

  languageOptions: {
    allowTrailingCommas: true,
  },
});
