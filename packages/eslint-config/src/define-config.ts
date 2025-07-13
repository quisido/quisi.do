import { defineConfig as eslintDefineConfig } from 'eslint/config';
import type { PickPartial } from './pick-partial.js';
import { LINTER_OPTIONS } from './linter-options.js';
import type { ConfigWithExtends } from '@eslint/config-helpers';

export type Config = PickPartial<Required<ConfigWithExtends>, OptionalConfig>;

type OptionalConfig = 'language' | 'languageOptions' | 'processor';

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
    ...linterConfig,
  };
}
