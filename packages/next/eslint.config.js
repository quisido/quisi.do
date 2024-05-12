import configs from '@quisido/eslint-config';

export default [
  ...configs,

  {
    files: ['src/constants/*.ts'],
    rules: {
      'no-magic-numbers': 'off',
    },
  },

  {
    files: ['src/utils/assert.ts'],
    rules: {
      'max-params': 'off',
    },
  },

  {
    files: ['src/utils/map-oscpu-to-name.ts'],
    rules: {
      complexity: 'off',
      'max-lines-per-function': 'off',
    },
  },

  {
    files: ['src/utils/split.ts'],
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },
];
