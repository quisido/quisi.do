import configs from '@quisido/eslint-config';

/** @type {readonly import('eslint').Linter.FlatConfig[]} */
export default [
  ...configs,

  {
    files: ['src/error-code.ts'],
    rules: {
      'capitalized-comments': 'off',
    },
  },

  {
    files: ['src/error-code.ts', 'src/whoami-response-code.ts'],
    rules: {
      'no-magic-numbers': 'off',
    },
  },
];
