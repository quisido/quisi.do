import config, {
  COVERAGE_OPTIONS,
  INLINE_CONFIG,
  THRESHOLDS,
} from '@quisido/vitest-config';
import { defineConfig } from 'vite';

export default defineConfig({
  ...config,
  test: {
    ...INLINE_CONFIG,
    coverage: {
      ...COVERAGE_OPTIONS,

      // @ts-expect-error: 'thresholds' does not exist in type...
      thresholds: {
        ...THRESHOLDS,
        branches: 6,
        functions: 16,
        lines: 52,
        statements: 51,
      },
    },
  },
});
