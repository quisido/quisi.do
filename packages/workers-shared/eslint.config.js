import configs from '@quisido/eslint-config';

/** @type {readonly import('eslint').Linter.FlatConfig[]} */
export default [
  ...configs,

  {
    files: ['src/state.ts', 'src/telemetry.ts'],
    rules: {
      'max-params': 'off',
    },
  },

  {
    files: ['src/state.test.ts'],
    rules: {
      'no-new': 'off',
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
];
