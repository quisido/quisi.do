import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

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
      ignoreEmptyLines: true,
      provider: 'v8',
      skipFull: true,

      thresholds: {
        branches: 100,
        functions: 100,
        lines: 100,
        statements: 100,
      },
    },
  },
});
