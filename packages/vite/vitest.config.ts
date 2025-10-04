import CONFIG, {
  COVERAGE_OPTIONS,
  INLINE_CONFIG,
  PLUGIN_OPTIONS,
} from '@quisido/vitest-config';
import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
import type { CoverageOptions } from 'vitest/dist/node.js';

export default defineConfig({
  ...CONFIG,
  plugins: [...PLUGIN_OPTIONS, ...viteReact()],
  test: {
    ...INLINE_CONFIG,
    coverage: {
      ...COVERAGE_OPTIONS,
      thresholds: {
        branches: 3,
        functions: 5,
        lines: 6,
        statements: 6,
      },
    } as CoverageOptions,
    env: {
      CLARITY_TAG: 'test-clarity-tag',
    },
    environment: 'jsdom',
  },
});
