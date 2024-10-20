import type { InlineConfig } from 'vitest/node';
import { COVERAGE_OPTIONS } from './coverage-options.js';
import { EXCLUDE } from './exclude.js';

export const INLINE_CONFIG: InlineConfig = {
  clearMocks: true,
  coverage: COVERAGE_OPTIONS,
  environment: 'node',
  exclude: [...EXCLUDE],
  mockReset: true,
  restoreMocks: true,
};
