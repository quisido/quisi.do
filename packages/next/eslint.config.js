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
    files: ['src/constants/*.ts'],
    rules: {
      'no-magic-numbers': 'off',
    },
  },

  {
    files: ['src/utils/assert.ts'],
    rules: {
      'max-params': 'off',
    },
  },

  {
    files: ['src/utils/map-oscpu-to-name.ts'],
    rules: {
      complexity: 'off',
      'max-lines-per-function': 'off',
    },
  },

  {
    files: ['src/utils/split.ts'],
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },
];
