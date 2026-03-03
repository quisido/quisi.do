import { defineESLintConfig, type ESLintConfig } from 'quisi';

const CONFIG: readonly ESLintConfig[] = defineESLintConfig({
  files: ['**/*.ts', '**/*.tsx'],
  name: '@quisido/game',
  rules: {
    '@typescript-eslint/no-non-null-assertion': 'warn',
    '@typescript-eslint/no-unsafe-assignment': 'warn',
    'no-ternary': 'warn',
    'no-warning-comments': 'warn',
  },
});

export default CONFIG;
