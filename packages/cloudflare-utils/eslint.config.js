import configs, { disableRulesForFiles } from '@quisido/eslint-config';

/** @type {readonly import('eslint').Linter.Config[]} */
export default [
  ...configs,

  ...disableRulesForFiles({
    '@typescript-eslint/no-duplicate-enum-values': ['src/pricing.ts'],
    '@typescript-eslint/prefer-literal-enum-member': ['src/pricing.ts'],
    camelcase: ['src/is-analytics-engine-response.test.ts'],
    'no-magic-numbers': ['src/pricing.ts', 'src/status-code.ts'],
    'no-underscore-dangle': ['src/is-analytics-engine-row.ts'],
  }),
];
