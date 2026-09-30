import jsonSchemaValidator from 'eslint-plugin-json-schema-validator';
import * as yamlParser from 'yaml-eslint-parser';

import defineConfig, { type Config } from './define-config.js';
import { LINTER_OPTIONS } from './linter-options.js';

export const GITHUB_WORKFLOW_CONFIG: Config = defineConfig({
  extends: [],
  files: ['.github/workflows/*.{yaml,yml}'],
  ignores: [],
  languageOptions: {
    parser: yamlParser,
  },
  linterOptions: LINTER_OPTIONS,
  name: '@quisido/github-workflow',
  plugins: {
    'json-schema-validator': jsonSchemaValidator,
  },
  rules: {
    // This should be enabled, but it throws an error when using a JSONC schema.
    // 'json-schema-validator/no-invalid': ['error', { useSchemastoreCatalog: true }],
  },
  settings: {},
});
