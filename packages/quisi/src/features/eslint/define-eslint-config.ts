import { type ConfigWithExtends } from '@eslint/config-helpers';
import { type Config, defineConfig } from 'eslint/config';
import defaultConfigs from '../eslint-config/index.js';

export { type Config } from 'eslint/config';

export default function defineESLintConfig(
  ...configs: readonly ConfigWithExtends[]
): Config[] {
  return defineConfig(...defaultConfigs, ...configs);
}
