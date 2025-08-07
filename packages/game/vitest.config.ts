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
        branches: 0,
        functions: 0,
        lines: 0,
        statements: 0,
      },
    } as CoverageOptions,
    environment: 'jsdom',
  },
});
