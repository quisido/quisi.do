import { defineESLintConfig, type ESLintConfig } from 'quisido';
import reactCompiler from 'eslint-plugin-react-compiler';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

const CONFIG: readonly ESLintConfig[] = defineESLintConfig(
  // Design systems
  {
    files: ['src/design-systems/**/*.ts', 'src/design-systems/**/*.tsx'],
    rules: {
      'max-lines': 'off',
      'max-lines-per-function': 'off',
      'max-statements': 'off',
    },
  },

  // Design systems core-test
  {
    files: ['src/design-systems/core-test/test-*.tsx'],
    rules: {
      'no-magic-numbers': 'off',
    },
  },

  // NodeJS
  {
    files: ['scripts/**/*.js'],
    languageOptions: {
      globals: {
        process: 'readonly',
      },
    },
  },

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

  // Temporary rules
  {
    rules: {
      'no-warning-comments': 'warn',
    },
  },
);

export default CONFIG;
