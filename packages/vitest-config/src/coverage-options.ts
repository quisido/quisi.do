import type { CoverageOptions } from 'vitest/node';
import { EXCLUDE } from './exclude.js';
import { THRESHOLDS } from './thresholds.js';

export { type CoverageOptions } from 'vitest/node';

export const COVERAGE_OPTIONS: CoverageOptions<'istanbul'> = {
  clean: true,
  enabled: true,
  exclude: [...EXCLUDE],
  provider: 'istanbul',
  reporter: [
    ['clover', { file: 'clover.xml' }],
    ['cobertura', { file: 'cobertura.xml' }],
    ['json', { file: 'coverage.json' }],
    ['json-summary', { file: 'coverage-summary.json' }],
    ['lcov', { file: 'lcov.info' }],
    ['lcovonly', { file: 'lcov-only.info' }],
    [
      'html',
      {
        skipEmpty: true,
        verbose: true,
      },
    ],
    [
      'html-spa',
      {
        metricsToShow: ['branches', 'functions', 'lines', 'statements'],
        skipEmpty: true,
        verbose: true,
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
  reportOnFailure: true,
  reportsDirectory: '.vitest/coverage',
  skipFull: true,
  thresholds: THRESHOLDS,
};
