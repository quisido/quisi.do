import configs from '@quisido/eslint-config';

/** @type {readonly import('eslint').Linter.FlatConfig[]} */
export default [
  ...configs,

  {
    files: ['src/features/handle-fetch-request.ts'],
    rules: {
      'max-statements': 'off',
    },
  },

  {
    files: [
      'src/account-number.ts',
      'src/modules/trace-parent/constants/trace-flag.ts',
      'src/product.ts',
      'src/usage-type.ts',
    ],

    rules: {
      'no-magic-numbers': 'off',
    },
  },

  {
    files: ['src/fetch-context.test.ts'],
    rules: {
      'no-new': 'off',
    },
  },

  {
    files: ['src/map-readable-stream-to-string.ts'],
    rules: {
      'no-await-in-loop': 'off',
    },
  },

  {
    files: ['src/worker.ts'],
    rules: {
      'max-params': 'off',
    },
  },
];
