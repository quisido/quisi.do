import type { ConfigWithExtends } from '@eslint/config-helpers';
import { defineConfig as eslintDefineConfig } from 'eslint/config';
import { LINTER_OPTIONS } from './linter-options.js';
import type { PickPartial } from './pick-partial.js';

export type Config = PickPartial<
  Required<ConfigWithExtends>,
  'basePath' | 'language' | 'languageOptions' | 'processor'
>;

export default function defineConfig(config: Config): Config {
  const [linterConfig] = eslintDefineConfig(config);

  return {
    extends: [],
    files: [],
    ignores: [],
    linterOptions: LINTER_OPTIONS,
    name: '@quisido/eslint-config',
    plugins: {},
    rules: {},
    settings: {},

    // Spread last to allow overriding defaults.
    ...linterConfig,
  };
}
