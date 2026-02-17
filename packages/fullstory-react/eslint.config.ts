import { defineESLintConfig, type ESLintConfig } from 'quisi';

const CONFIG: readonly ESLintConfig[] = defineESLintConfig(
  // Plugins: react-compiler, react-hooks, react-refresh
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      'react-compiler': reactCompiler,
      'react-hooks': {
        ...reactHooks,
        configs: {},
      },
      'react-refresh': reactRefresh,
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
