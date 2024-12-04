import configs, { disableRulesForFiles } from '@quisido/eslint-config';

/** @type {readonly import('eslint').Linter.Config[]} */
export default [
  ...configs,

  ...disableRulesForFiles({
    '@typescript-eslint/no-base-to-string': ['src/map-to-string.ts'],
    '@typescript-eslint/no-unused-vars': ['src/reduce-entries-to-record.ts'],
    'max-statements': ['src/map-to-string.ts'],

    '@typescript-eslint/prefer-reduce-type-parameter': [
      'src/map-entries-to-record.ts',
    ],
  }),

  {
    files: ['src/reduce-entries-to-record.ts'],
    rules: {
      'max-params': ['error', { max: 4 }],
    },
  },
];
