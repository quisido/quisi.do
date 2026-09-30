import reactCompiler from 'eslint-plugin-react-compiler';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import { defineESLintConfig, type ESLintConfig } from 'quisido';

const CONFIG: readonly ESLintConfig[] = defineESLintConfig(
  // Configuration files
  {
    files: ['*.config.ts'],
    rules: {
      'import-x/no-nodejs-modules': 'off',
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
      'react-refresh': reactRefreshPlugin,
    },
    rules: {
      'react-compiler/react-compiler': 'error',
      'react-hooks/exhaustive-deps': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-refresh/only-export-components': 'error',
    },
  },

  // Playwright
  {
    files: ['**/*.e2e.ts', 'test/e2e.ts'],
    rules: {
      'react-compiler/react-compiler': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'react-hooks/rules-of-hooks': 'off',
      'react-refresh/only-export-components': 'off',
    },
  },

  // Scripts
  {
    files: ['scripts/**'],
    rules: {
      'import-x/no-nodejs-modules': 'off',
    },
  },

  // Design Systems
  {
    files: ['src/design-systems/**'],
    rules: {
      complexity: 'off',
      'import-x/exports-last': 'off',
      'import-x/no-relative-parent-imports': 'off',
      'max-lines': 'off',
      'max-lines-per-function': 'off',
      'max-statements': 'off',
      'no-magic-numbers': 'off',
      'no-nested-ternary': 'off',
      'no-ternary': 'off',
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
