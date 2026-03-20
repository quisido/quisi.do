/* eslint-disable sort-keys-custom-order/object-keys */
import type { CoverageOptions } from 'vitest/node';
import defineThresholds from './define-thresholds.js';
import { EXCLUDE } from './exclude.js';
import { join } from 'node:path';

export { type CoverageOptions } from 'vitest/node';

export default function defineCoverageOptions({
  exclude = [],
  thresholds = {},
  ...coverageOptions
}: Omit<CoverageOptions<'istanbul'>, 'provider'>): CoverageOptions<'istanbul'> {
  return {
    clean: true,
    enabled: true,
    exclude: [...EXCLUDE, ...exclude],
    reportOnFailure: true,
    // THE ERROR IS HERE
    // It is trying to copy this directory for some reason, causing it to fail.
    reportsDirectory: join('.tests', 'vitest'),
    skipFull: true,
    thresholds: defineThresholds(thresholds),
    ...coverageOptions,

    provider: 'istanbul',
    reporter: [
      ['clover', { file: join('coverage', 'clover.xml') }],
      ['cobertura', { file: join('coverage', 'cobertura.xml') }],
      ['json', { file: join('coverage', 'coverage.json') }],
      ['json-summary', { file: join('coverage', 'coverage-summary.json') }],
      ['lcov', { file: join('coverage', 'lcov.info') }],
      ['lcovonly', { file: join('coverage', 'lcov-only.info') }],
      ['html', { skipEmpty: true, verbose: false }],
      [
        'html-spa',
        {
          metricsToShow: ['branches', 'functions', 'lines', 'statements'],
          skipEmpty: true,
          verbose: false,
        },
      ],
      ['teamcity', { file: join('coverage', 'teamcity.txt') }],
      [
        'text',
        {
          file: join('coverage', 'text.txt'),
          maxCols: 80,
          skipEmpty: true,
          skipFull: true,
        },
      ],
      ['text-summary', { file: join('coverage', 'text-summary.txt') }],
    ],
  };
}
