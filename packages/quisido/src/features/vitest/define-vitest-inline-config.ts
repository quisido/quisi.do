/* eslint-disable sort-keys-custom-order/object-keys */
import defineCoverageOptions from './define-coverage-options.js';
import definePool from './define-pool.js';
import { EXCLUDE } from './exclude.js';
import type QuisidoVitestInlineConfig from './quisido-vitest-inline-config.js';
import { cpus } from 'node:os';

const MAX_WORKERS: number = cpus().length;

export default async function defineVitestInlineConfig({
  coverage = {},
  exclude = [],
  setupFiles = [],
  ...vitestInlineConfig
}: QuisidoVitestInlineConfig): Promise<QuisidoVitestInlineConfig> {
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
    ...vitestInlineConfig,

    ...(await definePool()),

    reporters: [
      ['default', { summary: true }],
      'hanging-process',
      ['html', { outputFile: '.tests/vitest/report.html' }],
      ['json', { outputFile: '.tests/vitest/report.json' }],
      ['junit', { outputFile: '.tests/vitest/report.junit.xml' }],
    ],

    setupFiles: ['quisido/vitest-setup-file.js', ...getSetupFiles()],

    typecheck: {
      enabled: false,
    },
  };
}
