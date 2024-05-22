import react from '@vitejs/plugin-react';
import { defaultExclude, defineConfig } from 'vitest/config';
import { EXCLUDE } from './src/test/exclude.js';

export default defineConfig({
  plugins: [react()],

  test: {
    clearMocks: true,
    environment: 'jsdom',
    exclude: [...defaultExclude, ...EXCLUDE],
    mockReset: true,
    restoreMocks: true,

    coverage: {
      all: true,
      clean: true,
      enabled: true,
      exclude: [...defaultExclude, ...EXCLUDE],
      provider: 'istanbul',
      skipFull: true,

      thresholds: {
        branches: 4,
        functions: 7,
        lines: 7,
        statements: 7,
      },
    },

    env: {
      CLARITY_TAG: 'test-clarity-tag',
    },
  },
});
