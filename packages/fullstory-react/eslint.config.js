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
    'func-style': ['src/utils/map-v2-operation-handlers-to-api.ts'],
    'max-lines-per-function': ['src/utils/map-v2-operation-handlers-to-api.ts'],
    'new-cap': ['src/utils/map-v2-operation-handlers-to-api.ts'],

    '@typescript-eslint/consistent-type-assertions': [
      'src/utils/capitalize.ts',
      'src/utils/map-v2-operation-handlers-to-api.ts',
    ],
  }),
];
