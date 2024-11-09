import configs from '@quisido/eslint-config';

/** @type {readonly import('eslint').Linter.Config[]} */
export default [
  ...configs,

  // Rule: no-magic-numbers
  {
    files: ['src/status-code.ts', 'src/usage-type.ts'],
    rules: {
      'no-magic-numbers': 'off',
    },
  },

  // Rule: no-underscore-dangle
  {
    files: ['src/is-analytics-engine-row.ts'],
    rules: {
      'no-underscore-dangle': 'off',
    },
  },
];
