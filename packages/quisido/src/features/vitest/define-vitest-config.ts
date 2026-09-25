import defineVitestInlineConfig from './define-vitest-inline-config.js';
import { PLUGIN_OPTIONS } from './plugin-options.js';
import type QuisidoUserConfig from './quisido-user-config.js';

export { type default as QuisidoUserConfig } from './quisido-user-config.js';

export interface Options extends QuisidoUserConfig {
  /**
   * Optimize test run speed by disabling reports when they are not needed, e.g.
   * when the test suite is being ran by a VS Code extension.
   * @default false
   */
  readonly disableReports?: boolean | undefined;
}

const getDisableReports = (): boolean =>
  process.env['VITEST_VSCODE'] === 'true';

// eslint-disable-next-line @typescript-eslint/require-await
export default async function defineVitestConfig({
  disableReports = getDisableReports(),
  plugins = [],
  test = {},
  ...userConfig
}: Options): Promise<Options> {
  return {
    plugins: [...PLUGIN_OPTIONS, ...plugins],
    test: defineVitestInlineConfig({
      ...test,
      disableReports,
    }),
    ...userConfig,
  };
}
