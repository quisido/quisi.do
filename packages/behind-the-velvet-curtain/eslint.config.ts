import { defineESLintConfig, type ESLintConfig } from 'quisido';

const CONFIG: readonly ESLintConfig[] = defineESLintConfig(
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.d.ts'],
    name: '@quisido/behind-the-velvet-curtain',
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      'import-x/no-unresolved': [
        'error',
        { ignore: ['@monogatari/core', '\\.css$'] },
      ],
      'no-warning-comments': 'warn',
    },
  },

  // Utilities
  {
    files: ['utils/**'],
    rules: {
      'import-x/no-nodejs-modules': 'off',
    },
  },
);

export default CONFIG;
