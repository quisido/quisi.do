import configs, {
  defineConfig,
  disableRulesForFiles,
} from '@quisido/eslint-config';

export default defineConfig(
  ...configs,

  ...disableRulesForFiles({
    '@typescript-eslint/no-dynamic-delete': ['src/handle-metric.ts'],
    '@typescript-eslint/unbound-method': ['src/test/test-exported-handler.ts'],
    'capitalized-comments': ['src/constants/metric-name.ts'],
    complexity: [
      'src/analytics/map-analytics-engine-row-index-to-datum-factory.ts',
      'src/handle-metric.ts',
      'src/utils/is-console.ts',
    ],
    'func-style': ['src/features/authn-user-id.ts'],
    'max-classes-per-file': ['src/authn-fetch-handler.ts'],
    'max-lines': ['src/handle-metric.ts'],
    'no-await-in-loop': ['src/utils/map-readable-stream-to-string.ts'],
    'no-console': ['src/features/get-console.ts'],
    'no-magic-numbers': [
      'src/analytics/is-zero.ts',
      'src/constants/gender.ts',
      'src/constants/oauth-provider.ts',
      'src/constants/patreon-gender.ts',
      'src/constants/status-code.ts',
      'src/modules/trace-parent/constants/trace-flag.ts',
      'src/modules/trace-parent/types/parent-id-length.ts',
      'src/modules/trace-parent/types/trace-id-length.ts',
    ],
    'no-undefined': [
      'src/routes/patreon/handle-invalid-invalid-patreon-access-token-request-description.ts',
      'src/routes/patreon/handle-invalid-patreon-access-token-request-description.ts',
      'src/routes/patreon/handle-missing-invalid-patreon-access-token-request-description.ts',
    ],
  }),

  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      camelcase: 'off',
      'max-lines-per-function': 'warn',
      'max-params': 'warn',
      'max-statements': 'warn',
      'no-undefined': 'off',
    },
  },

  {
    files: ['src/features/authn-state.ts', 'src/features/handle-fetch.ts'],
    rules: {
      'max-params': ['error', { max: 5 }],
    },
  },
);
