import configs, { disableRulesForFiles } from '@quisido/eslint-config';

/** @type {readonly import('eslint').Linter.Config[]} */
export default [
  ...configs,

  ...disableRulesForFiles({
    '@typescript-eslint/no-dynamic-delete': ['src/handle-metric.ts'],
    'capitalized-comments': ['src/constants/metric-name.ts'],
    'func-style': ['src/features/authn-user-id.ts'],
    'max-classes-per-file': ['src/authn-fetch-handler.ts'],
    'no-await-in-loop': ['src/utils/map-readable-stream-to-string.ts'],
    'no-console': ['src/features/get-console.ts'],

    complexity: [
      'src/analytics/map-analytics-engine-row-index-to-datum-factory.ts',
      'src/utils/is-console.ts',
    ],

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
    rules: {
      camelcase: 'off',
      'max-lines-per-function': 'off',
      'max-statements': 'off',
      'no-undefined': 'off',

      // Consider passing parameters as a single object instead.
      'max-params': 'off',
    },
  },

  {
    files: ['src/features/authn-state.ts', 'src/features/handle-fetch.ts'],
    rules: {
      'max-params': ['error', { max: 5 }],
    },
  },
];
