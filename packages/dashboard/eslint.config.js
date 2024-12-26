import configs, { disableRulesForFiles } from '@quisido/eslint-config';

export default [
  ...configs,

  ...disableRulesForFiles({
    complexity: ['src/features/handle-fetch.ts', 'src/handle-metric.ts'],
    'max-lines': ['src/handle-metric.ts'],
    'max-params': ['src/handle-metric.ts'],
    'max-statements': ['src/features/handle-fetch.ts', 'src/handle-metric.ts'],

    'max-lines-per-function': [
      'src/features/handle-fetch.ts',
      'src/handle-metric.ts',
    ],
  }),
];
