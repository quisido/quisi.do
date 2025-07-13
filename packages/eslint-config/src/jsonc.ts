import JSON from './json.js';
import defineConfig from './define-config.js';

export default defineConfig({
  ...JSON,
  files: ['**/*.code-workspace', '**/*.jsonc', '**/.hintrc', '.vscode/*.json'],
  ignores: [],
  language: 'json/jsonc',
  name: '@quisido/jsonc',
});
