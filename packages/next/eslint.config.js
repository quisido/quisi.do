import configs, { disableRulesForFiles } from '@quisido/eslint-config';
import reactCompiler from 'eslint-plugin-react-compiler';
import reactRefresh from 'eslint-plugin-react-refresh';

/** @type {readonly import('eslint').Linter.Config[]} */
export default [
  ...configs,

  ...disableRulesForFiles({
    '@typescript-eslint/no-non-null-assertion': ['src/utils/split.ts'],
    complexity: ['src/utils/map-oscpu-to-name.ts'],
    'max-lines-per-function': ['src/utils/map-oscpu-to-name.ts'],
    'max-params': ['src/utils/assert.ts'],
    'no-magic-numbers': ['src/constants/*.ts'],
    'no-undefined': ['src/hooks/use-emit/use-emit.ts'],
    'prefer-rest-params': ['src/modules/react-google-analytics/**/*.ts'],

    '@typescript-eslint/no-unused-vars': [
      'src/modules/react-google-analytics/**/*.ts',
    ],

    camelcase: [
      'src/hooks/use-effect-event.ts',
      'src/modules/react-google-analytics/**/*.ts',
    ],
  }),

  // Plugin: react-compiler
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
];
