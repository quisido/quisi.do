import { defineESLintConfig, type ESLintConfig } from 'quisido';

const CONFIG: readonly ESLintConfig[] = defineESLintConfig(
  {
    files: ['.github/actions/*/*.mjs', 'scripts/**', 'utils/**', '*.test.ts'],
    rules: {
      'import-x/no-nodejs-modules': 'off',
    },
  },
  {
    ignores: ['packages/**'],
  },
);

export default CONFIG;
