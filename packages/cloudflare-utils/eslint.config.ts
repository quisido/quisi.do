import configs, {
  defineConfig,
  disableRulesForFiles,
} from '@quisido/eslint-config';

export default defineConfig(
  ...configs,

  ...disableRulesForFiles({
    '@typescript-eslint/no-duplicate-enum-values': ['src/pricing.ts'],
    '@typescript-eslint/prefer-literal-enum-member': ['src/pricing.ts'],
    camelcase: ['src/is-analytics-engine-response.test.ts'],
    'no-magic-numbers': ['src/pricing.ts', 'src/status-code.ts'],
    'no-underscore-dangle': ['src/is-analytics-engine-row.ts'],
  }),
);
