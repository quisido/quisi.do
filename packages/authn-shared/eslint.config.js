import configs from '@quisido/eslint-config';

/** @type {readonly import('eslint').Linter.FlatConfig[]} */
export default [
  ...configs,
  {
    files: ['src/error-code.ts'],
    rules: {
      'capitalized-comments': 'off',
      'no-magic-numbers': 'off',
    },
  },
];
