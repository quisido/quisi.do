import react from '@vitejs/plugin-react';
import { defaultExclude, defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],

  test: {
    clearMocks: true,
    environment: 'jsdom',
    mockReset: true,
    restoreMocks: true,

    coverage: {
      all: true,
      clean: true,
      enabled: true,
      provider: 'istanbul',
      skipFull: true,

      thresholds: {
        branches: 100,
        functions: 100,
        lines: 100,
        statements: 100,
      },
    },

    exclude: [
      ...defaultExclude,
      '.next/**',
      '.wrangler/**',
      'certificates/**',
      'coverage/**',
      'cypress/**',
    ],
  },
});
