/* eslint-disable sort-keys-custom-order/object-keys */
import type { CoverageOptions } from 'vitest/node';
import defineThresholds from './define-thresholds.js';
import { EXCLUDE } from './exclude.js';

export { type CoverageOptions } from 'vitest/node';

export default async function defineCoverageOptions({
  exclude = [],
  thresholds = {},
  ...coverageOptions
}: CoverageOptions<'istanbul'>): Promise<CoverageOptions<'istanbul'>> {
  return {
    clean: true,
    enabled: true,
    exclude: [...EXCLUDE, ...exclude],
    reportOnFailure: true,
    reportsDirectory: '.tests',
    skipFull: true,
    thresholds: await defineThresholds(thresholds),
    ...coverageOptions,

    provider: 'istanbul',
    reporter: [
      ['clover', { file: 'vitest/coverage/clover.xml' }],
      ['cobertura', { file: 'vitest/coverage/cobertura.xml' }],
      ['json', { file: 'vitest/coverage/coverage.json' }],
      ['json-summary', { file: 'vitest/coverage/coverage-summary.json' }],
      ['lcov', { file: 'vitest/coverage/lcov.info' }],
      ['lcovonly', { file: 'vitest/coverage/lcov-only.info' }],
      ['html', { skipEmpty: true, verbose: false }],
      [
        'html-spa',
        {
          metricsToShow: ['branches', 'functions', 'lines', 'statements'],
          skipEmpty: true,
          verbose: false,
        },
      ],
      ['teamcity', { file: 'vitest/coverage/teamcity.txt' }],
      [
        'text',
        {
          file: 'vitest/coverage/text.txt',
          maxCols: 80,
          skipEmpty: true,
          skipFull: true,
        },
      ],
      ['text-summary', { file: 'vitest/coverage/text-summary.txt' }],
    ],
  };
}
