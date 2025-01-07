import configs, { disableRulesForFiles } from '@quisido/eslint-config';
import reactCompiler from 'eslint-plugin-react-compiler';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

/** @type {readonly import('eslint').Linter.Config[]} */
export default [
  ...configs,

  ...disableRulesForFiles({
    'max-lines-per-function': [
      'src/test/utils/describe-package-json-scripts.ts',
      'src/test/utils/package-json-should-have.ts',
    ],
  }),

  // Plugins: react-compiler, react-hooks, react-refresh
  {
    plugins: {
      'react-compiler': reactCompiler,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },

    rules: {
      'react-compiler/react-compiler': 'error',
      'react-hooks/exhaustive-deps': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-refresh/only-export-components': 'error',
    },
  },
];
