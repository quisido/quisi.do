import configs from '@quisido/eslint-config';

/** @type {readonly import('eslint').Linter.FlatConfig[]} */
export default [
  ...configs,
  {
    files: [
      'src/utils/capitalize.ts',
      'src/utils/map-v2-operation-handlers-to-api.ts',
    ],

    rules: {
      '@typescript-eslint/consistent-type-assertions': 'off',
    },
  },

  {
    files: ['src/utils/map-v2-operation-handlers-to-api.ts'],
    rules: {
      'func-style': 'off',
      'max-lines-per-function': 'off',
      'new-cap': 'off',
    },
  },
];
