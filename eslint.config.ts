import { defineESLintConfig, type ESLintConfig } from 'quisido';

const CONFIG: readonly ESLintConfig[] = defineESLintConfig({
  ignores: ['packages/**'],
});

export default CONFIG;
