/* eslint-disable sort-keys-custom-order/object-keys */
import defineCoverageOptions, {
  type CoverageOptions,
} from './define-coverage-options.js';
import definePool from './define-pool.js';
import { EXCLUDE } from './exclude.js';
import type QuisiVitestInlineConfig from './quisi-vitest-inline-config.js';

const DEFAULT_COVERAGE_OPTIONS: CoverageOptions<'istanbul'> = {
  provider: 'istanbul',
};

export default async function defineVitestInlineConfig({
  coverage = DEFAULT_COVERAGE_OPTIONS,
  exclude = [],
  ...vitestInlineConfig
}: QuisiVitestInlineConfig): Promise<QuisiVitestInlineConfig> {
  return {
    clearMocks: true,
    coverage: defineCoverageOptions(coverage),
    environment: 'node',
    exclude: [...EXCLUDE, ...exclude],
    mockReset: true,
    name: 'Vitest',
    restoreMocks: true,
    ...vitestInlineConfig,

    ...(await definePool()),

    reporters: [
      ['default', { summary: true }],
      'hanging-process',
      ['html', { outputFile: '.tests/vitest/report.html' }],
      ['json', { outputFile: '.tests/vitest/report.json' }],
      ['junit', { outputFile: '.tests/vitest/report.junit.xml' }],
    ],

    typecheck: {
      enabled: false,
    },
  };
}
