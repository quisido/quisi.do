import {
  type Config,
  defineESLintConfig,
} from './src/features/eslint-config/index.js';

const CONFIG: readonly Config[] = defineESLintConfig({
  rules: {
    'import-x/no-nodejs-modules': 'off',
  },
});

export default CONFIG;
