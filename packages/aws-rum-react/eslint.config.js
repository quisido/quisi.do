import configs from '@quisido/eslint-config';
import reactCompiler from 'eslint-plugin-react-compiler';
import reactRefresh from 'eslint-plugin-react-refresh';

/** @type {readonly import('eslint').Linter.Config[]} */
export default [
  ...configs,

  {
    plugins: {
      'react-compiler': reactCompiler,
      'react-refresh': reactRefresh,
    },

    rules: {
      'react-compiler/react-compiler': 'error',
      'react-refresh/only-export-components': 'error',
    },
  },

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
