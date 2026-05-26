/* eslint-disable sort-keys-custom-order/object-keys */
import type { CoverageOptions } from 'vitest/node';
import defineThresholds from './define-thresholds.js';
import { EXCLUDE } from './exclude.js';
import { join } from 'node:path';

export { type CoverageOptions } from 'vitest/node';

export interface IstanbulCoverageOptions extends CoverageOptions {
  readonly provider: 'istanbul';
}

export type QuisidoCoverageOptions = Omit<IstanbulCoverageOptions, 'provider'>;

export default function defineCoverageOptions({
  exclude = [],
  thresholds = {},
  ...coverageOptions
}: QuisidoCoverageOptions): IstanbulCoverageOptions {
  return {
    clean: true,
    enabled: true,
    exclude: [...EXCLUDE, ...exclude],
    reportOnFailure: true,
    // THE ERROR IS HERE
    // It is trying to copy this directory for some reason, causing it to fail.
    reportsDirectory: join('.tests', 'vitest-coverage'),
    skipFull: true,
    thresholds: defineThresholds(thresholds),
    ...coverageOptions,

    provider: 'istanbul',
    reporter: [
      ['clover', { file: 'clover.xml' }],
      ['cobertura', { file: 'cobertura.xml' }],
      ['json', { file: 'coverage.json' }],
      ['json-summary', { file: 'coverage-summary.json' }],
      ['lcov', { file: 'lcov.info' }],
      ['lcovonly', { file: 'lcov-only.info' }],
      ['html', { skipEmpty: true, verbose: false }],
      [
        'html-spa',
        {
          metricsToShow: ['branches', 'functions', 'lines', 'statements'],
          skipEmpty: true,
          verbose: false,
        },
      ],
      ['teamcity', { file: 'teamcity.txt' }],
      [
        'text',
        {
          file: 'text.txt',
          maxCols: 80,
          skipEmpty: true,
          skipFull: true,
        },
      ],
      ['text-summary', { file: 'text-summary.txt' }],
    ],
  };
}
