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
    // Expected the dependency list for useMemo to be an array literal
    'react-compiler/react-compiler': ['src/hooks/use-shallow-memo.ts'],
  }),
];
