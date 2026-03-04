import defineVitestInlineConfig from './define-vitest-inline-config.js';
import type QuisidoUserConfig from './quisido-user-config.js';
import { PLUGIN_OPTIONS } from './plugin-options.js';

export { type default as QuisidoUserConfig } from './quisido-user-config.js';

export default async function defineVitestConfig({
  plugins = [],
  test = {},
  ...userConfig
}: QuisidoUserConfig): Promise<QuisidoUserConfig> {
  return {
    plugins: [...PLUGIN_OPTIONS, ...plugins],
    test: await defineVitestInlineConfig(test),
    ...userConfig,
  };
}
