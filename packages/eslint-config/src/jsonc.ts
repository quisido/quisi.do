import { type ESLint, type Linter } from 'eslint';
import jsonc from 'eslint-plugin-jsonc';
import jsoncParser from 'jsonc-eslint-parser';
import defineConfig, { type Config } from './define-config.js';
import JSON from './json.js';
import mapFlatConfigToRulesRecord from './map-flat-config-to-rules-record.js';

const JSONC_CONFIG: Config = defineConfig({
  ...JSON,
  files: [
    '.vscode/*.json',
    '**/*.code-workspace',
    '**/*.json5',
    '**/*.jsonc',
    '.hintrc',
    '*.hintrc',
    'tsconfig.json',
    'tsconfig.*.json',
  ],
  ignores: ['node_modules/'],
  language: 'json/jsonc',
  languageOptions: {
    allowTrailingCommas: true,
    parser: jsoncParser,
  },
  name: '@quisido/jsonc',
  plugins: {
    ...JSON.plugins,
    jsonc: jsonc as ESLint.Plugin,
  },
  rules: {
    'jsonc/no-bigint-literals': 'error',
    'jsonc/no-binary-expression': 'error',
    'jsonc/no-binary-numeric-literals': 'error',
    'jsonc/no-comments': 'off',
    'jsonc/no-dupe-keys': 'error',
    'jsonc/no-escape-sequence-in-identifier': 'error',
    'jsonc/no-hexadecimal-numeric-literals': 'error',
    'jsonc/no-infinity': 'error',
    'jsonc/no-multi-str': 'error',
    'jsonc/no-nan': 'error',
    'jsonc/no-number-props': 'error',
    'jsonc/no-numeric-separators': 'error',
    'jsonc/no-octal-numeric-literals': 'error',
    'jsonc/no-parenthesized': 'error',
    'jsonc/no-plus-sign': 'error',
    'jsonc/no-regexp-literals': 'error',
    'jsonc/no-sparse-arrays': 'error',
    'jsonc/no-template-literals': 'error',
    'jsonc/no-undefined-value': 'error',
    'jsonc/no-unicode-codepoint-escapes': 'error',
    'jsonc/no-useless-escape': 'error',
    'jsonc/valid-json-number': 'error',
    'jsonc/vue-custom-block/no-parsing-error': 'error',
    'no-unused-expressions': 'off',
    'no-unused-vars': 'off',
    strict: 'off',
    ...mapFlatConfigToRulesRecord(
      jsonc.configs['flat/prettier'] as readonly Linter.Config[],
    ),
  },
});

export default JSONC_CONFIG;
