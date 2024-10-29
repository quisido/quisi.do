import configs from '@quisido/eslint-config';

/** @type {readonly import('eslint').Linter.Config[]} */
export default [
  ...configs,

  // Rule: capitalized-comments
  {
    files: ['src/constants/metric-name.ts'],
    rules: {
      'capitalized-comments': 'off',
    },
  },

  // Rule: complexity
  {
    rules: {
      complexity: 'off',
    },

    files: [
      'src/features/analytics/datum-factory-factory.ts',
      'src/utils/is-console.ts',
    ],
  },

  // Rule: func-style
  {
    files: ['src/features/authn-user-id.ts'],
    rules: {
      'func-style': 'off',
    },
  },

  // Rule: max-lines-per-function
  {
    rules: {
      'max-lines-per-function': 'off',
    },

    files: [
      'src/features/analytics/datum-factory-factory.ts',
      'src/features/analytics/map-row-to-datum.ts',
      'src/test/authn-test.ts',
      'src/test/fetch.ts',
    ],
  },

  // Rule: max-params
  {
    files: ['src/features/authn-state.ts', 'src/features/handle-fetch.ts'],
    rules: {
      'max-params': ['error', { max: 5 }],
    },
  },

  // Rule: no-await-in-loop
  {
    files: ['src/utils/map-readable-stream-to-string.ts'],
    rules: {
      'no-await-in-loop': 'off',
    },
  },

  // Rule: no-console
  {
    files: ['src/features/get-console.ts'],
    rules: {
      'no-console': 'off',
    },
  },

  // Rule: no-magic-numbers
  {
    rules: {
      'no-magic-numbers': 'off',
    },

    files: [
      'src/constants/gender.ts',
      'src/constants/oauth-provider.ts',
      'src/constants/patreon-gender.ts',
      'src/constants/status-code.ts',
      'src/modules/trace-parent/constants/trace-flag.ts',
      'src/modules/trace-parent/types/parent-id-length.ts',
      'src/modules/trace-parent/types/trace-id-length.ts',
    ],
  },

  // Rule: no-undefined
  {
    rules: {
      'no-undefined': 'off',
    },

    files: [
      'src/routes/patreon/handle-invalid-invalid-patreon-access-token-request-description.ts',
      'src/routes/patreon/handle-invalid-patreon-access-token-request-description.ts',
      'src/routes/patreon/handle-missing-invalid-patreon-access-token-request-description.ts',
    ],
  },

  {
    rules: {
      camelcase: 'off',
      'max-statements': 'off',
      'no-undefined': 'off',

      // Consider passing parameters as a single object instead.
      'max-params': 'off',
    },
  },
];
