import configs from '@quisido/eslint-config';
import reactCompiler from 'eslint-plugin-react-compiler';
import reactRefresh from 'eslint-plugin-react-refresh';

/** @type {readonly import('eslint').Linter.FlatConfig[]} */
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
      'src/utils/capitalize.ts',
      'src/utils/map-v2-operation-handlers-to-api.ts',
    ],

    rules: {
      '@typescript-eslint/consistent-type-assertions': 'off',
    },
  },

  {
    files: ['src/utils/map-v2-operation-handlers-to-api.ts'],
    rules: {
      'func-style': 'off',
      'max-lines-per-function': 'off',
      'new-cap': 'off',
    },
  },
];
