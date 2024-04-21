import configs from '@quisido/eslint-config';

/** @type {readonly import('eslint').Linter.FlatConfig[]} */
export default [
  ...configs,

  {
    files: ['src/map-entries-to-record.ts'],
    rules: {
      '@typescript-eslint/prefer-reduce-type-parameter': 'off',
    },
  },

  {
    files: ['src/reduce-entries-to-record.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      'max-params': ['error', { max: 4 }],
    },
  },
];
