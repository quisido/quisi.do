import { type ConfigWithExtends } from '@eslint/config-helpers';
import { type Config, defineConfig } from 'eslint/config';
import defaultConfigs from './default-configs.js';

export default function defineESLintConfig(
  ...configs: readonly ConfigWithExtends[]
): Config[] {
  return defineConfig(...defaultConfigs, ...configs);
}
