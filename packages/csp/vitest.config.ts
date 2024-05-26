import CONFIG, { COVERAGE_OPTIONS, INLINE_CONFIG } from '@quisido/vitest-config';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  ...CONFIG,
  test: {
    ...INLINE_CONFIG,

    coverage: {
      ...COVERAGE_OPTIONS,

      thresholds: {
        branches: 9,
        functions: 19,
        lines: 24,
        statements: 25,
      },
    },
  },
});
