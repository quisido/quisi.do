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
    files: ['src/features/handle-fetch.ts', 'src/features/state.ts'],
    rules: {
      'max-params': ['error', { max: 5 }],
    },
  },

  {
    files: ['src/features/patreon/get-patreon-token-response.ts'],
    rules: {
      camelcase: 'off',
    },
  },

  {
    files: ['src/features/telemetry-queue.ts'],
    rules: {
      'no-console': 'off',
    },
  },

  {
    files: ['src/test/fetch.ts'],
    rules: {
      'max-lines-per-function': 'off',
    },
  },

  {
    files: ['src/utils/map-readable-stream-to-string.ts'],
    rules: {
      'no-await-in-loop': 'off',
    },
  },

  {
    rules: {
      'max-statements': 'off',
    },
  },
];
