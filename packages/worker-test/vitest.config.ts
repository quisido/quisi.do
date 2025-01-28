import config, {
  COVERAGE_OPTIONS,
  EXCLUDE,
  INLINE_CONFIG,
  THRESHOLDS,
} from '@quisido/vitest-config';
import { defineConfig } from 'vite';
import type { CoverageOptions } from 'vitest/node';

export default defineConfig({
  ...config,
  test: {
    ...INLINE_CONFIG,
    coverage: {
      ...COVERAGE_OPTIONS,
      exclude: [...EXCLUDE, 'scripts/'],
      thresholds: {
        ...THRESHOLDS,
        branches: 31,
        functions: 29,
        lines: 48,
        statements: 47,
      },
    } as CoverageOptions,
  },
});
