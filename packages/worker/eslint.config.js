import configs from '@quisido/eslint-config';

/** @type {readonly import('eslint').Linter.Config[]} */
export default [
  ...configs,

  {
    files: ['src/create-worker-exported-handler.ts'],
    rules: {
      '@typescript-eslint/no-this-alias': 'off',
      'consistent-this': 'off',
    },
  },

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
    files: ['src/snapshot.ts'],
    rules: {
      'max-params': 'off',
    },
  },

  {
    files: ['src/worker.ts'],
    rules: {
      'max-params': 'off',
      'no-use-before-define': 'off',
    },
  },
];
