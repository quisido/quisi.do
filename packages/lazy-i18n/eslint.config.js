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
      'src/components/provider/hooks/use-load-translations.ts',
      'src/components/provider/provider.hook.ts',
      'src/runnables/runnable-translate-function.ts',
    ],

    rules: {
      'max-lines-per-function': 'off',
      'max-statements': 'off',
    },
  },

  {
    files: ['src/components/provider/provider.hook.test.ts'],
    rules: {
      '@typescript-eslint/no-unnecessary-type-assertion': 'off',
    },
  },

  {
    files: ['src/runnables/runnable-translate-function.ts'],
    rules: {
      'no-useless-return': 'off',
    },
  },
];
