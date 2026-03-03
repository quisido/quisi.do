import defineVitestInlineConfig from './define-vitest-inline-config.js';
import type QuisiUserConfig from './quisi-user-config.js';
import { PLUGIN_OPTIONS } from './plugin-options.js';

export { type default as QuisiUserConfig } from './quisi-user-config.js';

export default async function defineVitestConfig({
  plugins = [],
  test = {},
  ...userConfig
}: QuisiUserConfig): Promise<QuisiUserConfig> {
  return {
    plugins: [...PLUGIN_OPTIONS, ...plugins],
    test: await defineVitestInlineConfig(test),
    ...userConfig,
  };
}
