import CONFIG, {
  COVERAGE_OPTIONS,
  INLINE_CONFIG,
  PLUGIN_OPTIONS,
} from '@quisido/vitest-config';
import react from '@vitejs/plugin-react';
import type { CoverageOptions } from 'vitest';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  ...CONFIG,
  plugins: [...PLUGIN_OPTIONS, react()],
  test: {
    ...INLINE_CONFIG,
    environment: 'jsdom',

    coverage: {
      ...COVERAGE_OPTIONS,

      thresholds: {
        branches: 4,
        functions: 7,
        lines: 7,
        statements: 7,
      },
    } as CoverageOptions,

    env: {
      CLARITY_TAG: 'test-clarity-tag',
    },
  },
});
