import configs from '@quisido/eslint-config';

/** @type {readonly import('eslint').Linter.FlatConfig[]} */
export default [
  ...configs,

  {
    files: [
      'src/suites/github-workflow/github-workflow.ts',
      'src/suites/packages/packages.ts',
      'src/suites/packages/utils/create-dependencies-test.ts',
      'src/suites/vscode/vscode.ts',
    ],

    rules: {
      'max-lines-per-function': 'off',
      'max-statements': 'off',
      'no-useless-return': 'off',
    },
  },
];
