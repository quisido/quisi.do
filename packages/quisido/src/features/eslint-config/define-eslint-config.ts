import { type ConfigWithExtends } from '@eslint/config-helpers';
import { type Config, defineConfig } from 'eslint/config';

import { DEFAULT_CONFIGS } from './default-configs.js';

export default function defineESLintConfig(
  ...configs: readonly ConfigWithExtends[]
): Config[] {
  return defineConfig(...DEFAULT_CONFIGS, ...configs);
}
