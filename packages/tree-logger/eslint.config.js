import configs, { disableRulesForFiles } from '@quisido/eslint-config';

/** @type {readonly import('eslint').Linter.Config[]} */
export default [
  ...configs,

  ...disableRulesForFiles({
    'max-lines-per-function': ['src/tree-logger.ts'],
    'max-statements': ['src/tree-logger.ts'],
    'no-console': ['src/tree-logger.ts'],
  }),
];
