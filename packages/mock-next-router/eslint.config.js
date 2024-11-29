import configs, { disableRulesForFiles } from '@quisido/eslint-config';
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

  ...disableRulesForFiles({
    'no-underscore-dangle': [
      'src/utils/get-next-data.test.ts',
      'src/utils/get-next-data.ts',
      'src/utils/init-next-data.ts',
    ],
  }),
];
