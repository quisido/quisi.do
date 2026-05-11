import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';
import { defineVitestConfig, type VitestConfig } from 'quisido';

const CONFIG: VitestConfig = await defineVitestConfig({
  plugins: [react()],
  test: {
    attachmentsDir: '.tests/vitest/attachments',
    browser: {
      enabled: true,
      headless: true,
      instances: [{ browser: 'chromium', name: 'Chromium' }],
      provider: playwright(),
      screenshotDirectory: '.tests/vitest/screenshots',
      trace: 'off',
      ui: false,
    },
    coverage: {
      enabled: false,
    },
    env: {
      CLARITY_TAG: 'test-clarity-tag',
    },
    setupFiles: [
      './test/cleanup-react-testing-library.ts',
      './test/expect-to-have-attribute.ts',
    ],

    // Allow more time for slower devices to support browsers.
    testTimeout: 15_000,
  },
});

export default CONFIG;
