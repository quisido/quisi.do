import configs from '@quisido/eslint-config';

/** @type {readonly import('eslint').Linter.FlatConfig[]} */
export default [
  ...configs,

  {
    files: ['src/get-error-code.ts'],
    rules: {
      'no-magic-numbers': 'off',
    },
  },
];
