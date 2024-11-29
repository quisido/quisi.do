import configs, { disableRulesForFiles } from '@quisido/eslint-config';

/** @type {readonly import('eslint').Linter.Config[]} */
export default [
  ...configs,

  ...disableRulesForFiles({
    'max-lines-per-function': [
      'src/suites/github-workflow/github-workflow.ts',
      'src/suites/packages/packages.ts',
      'src/suites/packages/utils/create-dependencies-test.ts',
      'src/suites/vscode/vscode.ts',
    ],

    'max-statements': [
      'src/suites/github-workflow/github-workflow.ts',
      'src/suites/packages/packages.ts',
      'src/suites/packages/utils/create-dependencies-test.ts',
      'src/suites/vscode/vscode.ts',
    ],

    'no-useless-return': [
      'src/suites/github-workflow/github-workflow.ts',
      'src/suites/packages/packages.ts',
      'src/suites/packages/utils/create-dependencies-test.ts',
      'src/suites/vscode/vscode.ts',
    ],
  }),
];
