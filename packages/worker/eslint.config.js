import configs from '@quisido/eslint-config';

/** @type {readonly import('eslint').Linter.Config[]} */
export default [
  ...configs,

  // Rule: func-style
  {
    files: ['src/exported-handler.test.ts'],
    rules: {
      'func-style': 'off',
    },
  },

  // Rule: max-classes-per-file
  {
    files: ['src/exported-handler.test.ts'],
    rules: {
      'max-classes-per-file': 'off',
    },
  },

  // Rule: max-lines
  {
    files: ['src/handler.ts'],
    rules: {
      'max-lines': 'off',
    },
  },

  // Rule: max-lines-per-function
  {
    files: ['src/exported-handler.ts', 'src/handler.ts'],
    rules: {
      'max-lines-per-function': 'off',
    },
  },

  // Rule: max-statements
  {
    files: [
      'src/exported-handler.ts',
      'src/exported-handler.test.ts',
      'src/handler.ts',
    ],

    rules: {
      'max-statements': 'off',
    },
  },

  // Rule: no-magic-numbers
  {
    files: ['src/metric.ts'],
    rules: {
      'no-magic-numbers': 'off',
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
    files: ['src/create-worker-exported-handler.ts'],
    rules: {
      '@typescript-eslint/no-this-alias': 'off',
      'consistent-this': 'off',
    },
  },

  {
    files: ['src/fetch-context.test.ts'],
    rules: {
      '@typescript-eslint/only-throw-error': 'off',
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
      '@typescript-eslint/no-this-alias': 'off',
      'consistent-this': 'off',
      'max-classes-per-file': 'off',
      'max-params': 'off',
      'no-use-before-define': 'off',
    },
  },
];
