import type { CoverageOptions } from 'vitest/node';
import { EXCLUDE } from './exclude.js';
import { THRESHOLDS } from './thresholds.js';

export const COVERAGE_OPTIONS: CoverageOptions = {
  all: true,
  clean: true,
  enabled: true,
  exclude: [...EXCLUDE],
  provider: 'istanbul',
  skipFull: true,
  thresholds: THRESHOLDS,
};
