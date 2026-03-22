import { defineESLintConfig, type ESLintConfig } from 'quisido';

const CONFIG: readonly ESLintConfig[] = defineESLintConfig({
  files: ['**/*.ts', '**/*.tsx', '**/*.d.ts'],
  name: '@quisido/behind-the-velvet-curtain',
  rules: {
    '@typescript-eslint/no-non-null-assertion': 'warn',
    '@typescript-eslint/no-unsafe-assignment': 'warn',
    'no-ternary': 'warn',
    'no-warning-comments': 'warn',
  },
});

export default CONFIG;
