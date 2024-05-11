import configs from '@quisido/eslint-config';

/** @type {readonly import('eslint').Linter.FlatConfig[]} */
export default [
  ...configs,

  {
    files: ['src/constants/account-number.ts', 'src/constants/usage-type.ts'],
    rules: {
      'no-magic-numbers': 'off',
    },
  },
];
