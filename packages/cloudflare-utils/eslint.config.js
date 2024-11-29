import configs, { disableRulesForFiles } from '@quisido/eslint-config';

/** @type {readonly import('eslint').Linter.Config[]} */
export default [
  ...configs,

  ...disableRulesForFiles({
    'no-magic-numbers': ['src/status-code.ts', 'src/usage-type.ts'],
    'no-underscore-dangle': ['src/is-analytics-engine-row.ts'],
  }),
];
