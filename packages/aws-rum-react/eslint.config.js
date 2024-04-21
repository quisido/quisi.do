import configs from '@quisido/eslint-config';

/** @type {readonly import('eslint').Linter.FlatConfig[]} */
export default [
  ...configs,

  {
    files: [
      'src/test/utils/describe-package-json-scripts.ts',
      'src/test/utils/package-json-should-have.ts',
    ],

    rules: {
      'max-lines-per-function': 'off',
    },
  },
];
