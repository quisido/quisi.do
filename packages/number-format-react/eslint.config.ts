import reactCompilerPlugin from 'eslint-plugin-react-compiler';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import { defineESLintConfig, type ESLintConfig } from 'quisido';

const CONFIG: readonly ESLintConfig[] = defineESLintConfig(
  // Plugins: react-compiler, react-hooks, react-refresh
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      'react-compiler': reactCompilerPlugin,
      'react-hooks': {
        ...reactHooksPlugin,
        configs: {},
      },
      'react-refresh': reactRefreshPlugin,
    },
    rules: {
      'react-compiler/react-compiler': 'error',
      'react-hooks/exhaustive-deps': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-refresh/only-export-components': 'error',
    },
  },
);

export default CONFIG;
