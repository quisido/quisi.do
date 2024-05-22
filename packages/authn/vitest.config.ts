import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    clearMocks: true,
    environment: 'node',
    mockReset: true,
    restoreMocks: true,

    coverage: {
      all: true,
      clean: true,
      enabled: true,
      provider: 'istanbul',
      skipFull: true,

      thresholds: {
        branches: 28,
        functions: 53,
        lines: 51,
        statements: 51,
      },
    },
  },
});
