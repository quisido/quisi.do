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
        branches: 9,
        functions: 19,
        lines: 24,
        statements: 25,
      },
    },
  },
});
