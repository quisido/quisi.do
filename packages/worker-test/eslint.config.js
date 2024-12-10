import configs, { disableRulesForFiles } from '@quisido/eslint-config';

/** @type {readonly import('eslint').Linter.Config[]} */
export default [
  ...configs,

  ...disableRulesForFiles({
    '@typescript-eslint/unbound-method': ['src/test-exported-handler.ts'],
    'max-statements': ['src/test-exported-handler.ts'],
  }),
];
