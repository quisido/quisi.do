import configs from '@quisido/eslint-config';

/** @type {readonly import('eslint').Linter.FlatConfig[]} */
export default [
  ...configs,

  {
    files: [
      'src/constants/gender.ts',
      'src/constants/oauth-provider.ts',
      'src/constants/patreon-gender.ts',
      'src/constants/status-code.ts',
      'src/modules/trace-parent/constants/trace-flag.ts',
      'src/modules/trace-parent/types/parent-id-length.ts',
      'src/modules/trace-parent/types/trace-id-length.ts',
    ],

    rules: {
      'no-magic-numbers': 'off',
    },
  },

  {
    files: ['src/constants/metric-name.ts'],
    rules: {
      'capitalized-comments': 'off',
    },
  },

  {
    files: ['src/features/get-console.ts'],
    rules: {
      'no-console': 'off',
    },
  },

  {
    files: ['src/features/authn-state.ts', 'src/features/handle-fetch.ts'],
    rules: {
      'max-params': ['error', { max: 5 }],
    },
  },

  {
    files: [
      'src/routes/patreon/get-patreon-token-response.ts',
      'src/routes/patreon/handle-invalid-patreon-access-token-request-description.ts',
    ],

    rules: {
      camelcase: 'off',
    },
  },

  {
    files: ['src/test/fetch.ts'],
    rules: {
      'max-lines-per-function': 'off',
    },
  },

  {
    files: ['src/utils/is-console.ts'],
    rules: {
      complexity: 'off',
    },
  },

  {
    files: ['src/utils/map-readable-stream-to-string.ts'],
    rules: {
      'no-await-in-loop': 'off',
    },
  },

  {
    files: [
      'src/routes/patreon/handle-invalid-invalid-patreon-access-token-request-description.ts',
      'src/routes/patreon/handle-invalid-patreon-access-token-request-description.ts',
      'src/routes/patreon/handle-missing-invalid-patreon-access-token-request-description.ts',
    ],

    rules: {
      'no-undefined': 'off',
    },
  },

  {
    rules: {
      'max-statements': 'off',
    },
  },
];
