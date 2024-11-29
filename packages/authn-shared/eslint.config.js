import configs, { disableRulesForFiles } from '@quisido/eslint-config';

/** @type {readonly import('eslint').Linter.Config[]} */
export default [
  ...configs,

  ...disableRulesForFiles({
    'capitalized-comments': ['src/error-code.ts'],

    'no-magic-numbers': [
      'src/analytics-response-code.ts',
      'src/error-code.ts',
      'src/whoami-response-code.ts',
    ],
  }),
];
