import configs from '@quisido/eslint-config';

export default [
  ...configs,

  {
    rules: {
      // The `queries` function uses numbers as a generic.
      'no-magic-numbers': 'off',
    },
  },

  {
    files: ['src/constants/*.ts'],
    rules: {
      'no-magic-numbers': 'off',
    },
  },

  {
    files: [
      'src/features/handle-fetch.ts',
      'src/features/handle-get.ts',
      'src/features/handle-options.ts',
      'src/features/handle-post.ts',
    ],

    rules: {
      'max-lines-per-function': 'off',
      'max-params': 'off',
      'max-statements': 'off',
    },
  },

  {
    files: ['src/utils/map-readable-stream-to-string.ts'],
    rules: {
      'no-await-in-loop': 'off',
    },
  },
];
