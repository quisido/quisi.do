import configs from '@quisido/eslint-config';

/** @type {readonly import('eslint').Linter.FlatConfig[]} */
export default [
  ...configs,

  {
    files: [
      'src/account-number.ts',
      'src/product.ts',
      'src/usage-type.ts',
    ],

    rules: {
      'no-magic-numbers': 'off',
    },
  },
];
