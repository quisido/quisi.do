import configs from '@quisido/eslint-config';

/** @type {readonly import('eslint').Linter.FlatConfig[]} */
export default [
  ...configs,
  {
    files: ['**/*.test.ts'],
    rules: {
      'no-undefined': 'off',
    },
  },
];
