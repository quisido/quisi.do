/* eslint-disable sort-keys-custom-order/object-keys */
import type { ResolvedConfig } from 'vitest/node';
import defineCoverageOptions from './define-coverage-options.js';
import { EXCLUDE } from './exclude.js';
import type QuisidoVitestInlineConfig from './quisido-vitest-inline-config.js';
import { cpus } from 'node:os';

interface Options extends QuisidoVitestInlineConfig {
  readonly disableReports: boolean;
}

type Reporter = ResolvedConfig['reporters'][number];

const MAX_WORKERS: number = cpus().length;

const DEFAULT_REPORTERS: readonly Reporter[] = [
  ['agent', { silent: 'passed-only', summary: true }],
  ['default', { silent: 'passed-only', summary: true }],
  ['hanging-process', {}],
  ['html', { outputDir: '.tests/vitest' }],
  ['json', { outputFile: '.tests/vitest/report.json' }],
  ['junit', { outputFile: '.tests/vitest/report.junit.xml' }],
];

export default function defineVitestInlineConfig({
  coverage = {},
  disableReports,
  exclude = [],
  reporters = [],
  setupFiles = [],
  typecheck,
  ...vitestInlineConfig
}: Options): QuisidoVitestInlineConfig {
  const getReporters = (): NonNullable<
    QuisidoVitestInlineConfig['reporters']
  > => {
    if (disableReports) {
      return [];
    }

    if (Array.isArray(reporters)) {
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
    attachmentsDir: '.tests/vitest/attachments',
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
    // pool: 'typescript',
    reporters: getReporters(),
    setupFiles: ['quisido/vitest-setup-file.js', ...getSetupFiles()],
    typecheck: {
      ...typecheck,
      enabled: false,
    },
    ...vitestInlineConfig,
  };
}
