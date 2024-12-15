import configs, { disableRulesForFiles } from '@quisido/eslint-config';

export default [
  ...configs,

  ...disableRulesForFiles({
    complexity: ['src/handle-metric.ts'],
    'max-lines': ['src/handle-metric.ts'],
    'no-await-in-loop': ['src/utils/map-readable-stream-to-string.ts'],

    'max-lines-per-function': [
      'src/features/handle-fetch.ts',
      'src/features/handle-get.ts',
      'src/features/handle-options.ts',
      'src/features/handle-post.ts',
      'src/handle-metric.ts',
    ],

    'max-params': [
      'src/features/handle-get.ts',
      'src/features/handle-options.ts',
      'src/features/handle-post.ts',
      'src/handle-metric.ts',
    ],

    'max-statements': [
      'src/handle-metric.ts',
      'src/features/handle-fetch-request.ts',
      'src/features/handle-get.ts',
      'src/features/handle-options.ts',
      'src/features/handle-post.ts',
    ],
  }),

  {
    rules: {
      // The `queries` function uses numbers as a generic.
      'no-magic-numbers': 'off',
    },
  },
];
