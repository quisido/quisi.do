import configs from '@quisido/eslint-config';

/** @type {readonly import('eslint').Linter.Config[]} */
export default [
  ...configs,

  // Rule: capitalized-comments
  {
    files: ['src/error-code.ts'],
    rules: {
      'capitalized-comments': 'off',
    },
  },

  // Rule: no-magic-numbers
  {
    files: [
      'src/analytics-response-code.ts',
      'src/error-code.ts',
      'src/whoami-response-code.ts',
    ],

    rules: {
      'no-magic-numbers': 'off',
    },
  },
];
