import configs, { disableRulesForFiles } from '@quisido/eslint-config';

/** @type {readonly import('eslint').Linter.Config[]} */
export default [
  ...configs,

  ...disableRulesForFiles({
    'func-style': ['src/exported-handler.test.ts', 'src/handler.test.ts'],
    'max-lines': ['src/handler.ts'],
    'max-lines-per-function': ['src/exported-handler.ts', 'src/handler.ts'],
    'no-await-in-loop': ['src/map-readable-stream-to-string.ts'],

    'max-classes-per-file': [
      'src/exported-handler.test.ts',
      'src/fetch-handler.test.ts',
      'src/handler.test.ts',
    ],

    'max-statements': [
      'src/exported-handler.ts',
      'src/exported-handler.test.ts',
      'src/fetch-handler.test.ts',
      'src/handler.ts',
    ],

    'no-magic-numbers': [
      'src/metric.ts',
      'src/modules/trace-parent/constants/trace-flag.ts',
    ],
  }),
];
