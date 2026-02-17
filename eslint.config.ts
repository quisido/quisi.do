import { defineESLintConfig, type ESLintConfig } from 'quisi';

const CONFIG: readonly ESLintConfig[] = defineESLintConfig({
  ignores: ['packages/**'],
});

export default CONFIG;
