import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    clearMocks: true,
    environment: 'happy-dom',
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
