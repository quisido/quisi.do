/* eslint-disable sort-keys-custom-order/object-keys */
import type { ResolvedConfig } from 'vitest/node';
import defineCoverageOptions from './define-coverage-options.js';
import definePool from './define-pool.js';
import { EXCLUDE } from './exclude.js';
import type QuisidoVitestInlineConfig from './quisido-vitest-inline-config.js';
import { cpus } from 'node:os';

type Reporter = ResolvedConfig['reporters'][number];

const MAX_WORKERS: number = cpus().length;

const DEFAULT_REPORTERS: readonly Reporter[] = [
  ['default', { summary: true }],
  // 'hanging-process',
  ['html', { outputFile: '.tests/vitest/report.html' }],
  ['json', { outputFile: '.tests/vitest/report.json' }],
  ['junit', { outputFile: '.tests/vitest/report.junit.xml' }],
];

export default async function defineVitestInlineConfig({
  coverage = {},
  exclude = [],
  reporters = [],
  setupFiles = [],
  typecheck,
  ...vitestInlineConfig
}: QuisidoVitestInlineConfig): Promise<QuisidoVitestInlineConfig> {
  const getReporters = (): NonNullable<
    QuisidoVitestInlineConfig['reporters']
  > => {
    // Don't generate reports in VS Code.
    if (process.env['VITEST_VSCODE'] === 'true') {
      return [];
    }

    if (reporters instanceof Array) {
      return [...DEFAULT_REPORTERS, ...reporters];
    }

    return [...DEFAULT_REPORTERS, reporters];
  };

  const getSetupFiles = (): readonly string[] => {
    if (typeof setupFiles === 'string') {
      return [setupFiles];
    }

    return setupFiles;
  };

  return {
    clearMocks: true,
    coverage: defineCoverageOptions(coverage),
    environment: 'node',
    exclude: [...EXCLUDE, ...exclude],
    fileParallelism: false,
    maxConcurrency: MAX_WORKERS,
    maxWorkers: MAX_WORKERS,
    mockReset: true,
    name: 'Vitest',
    restoreMocks: true,
    ...(await definePool()),
    reporters: getReporters(),
    setupFiles: ['quisido/vitest-setup-file.js', ...getSetupFiles()],
    typecheck: {
      ...typecheck,
      enabled: false,
    },
    ...vitestInlineConfig,
  };
}
