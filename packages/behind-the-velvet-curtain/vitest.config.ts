import { playwright } from '@vitest/browser-playwright';
import { defineVitestConfig, type VitestConfig } from 'quisido';

const CONFIG: VitestConfig = await defineVitestConfig({
  test: {
    coverage: {
      enabled: false,
    },
    projects: [
      {
        test: {
          environment: 'jsdom',
          exclude: ['src/**/browser-smoke.test.ts'],
          include: ['src/**/*.test.ts'],
        },
      },
      {
        test: {
          browser: {
            enabled: true,
            headless: true,
            instances: [
              { browser: 'chromium', name: 'chromium' },
              { browser: 'firefox', name: 'firefox' },
              { browser: 'webkit', name: 'webkit' },
            ],
            provider: playwright({}),
          },
          include: ['src/**/browser-smoke.test.ts'],
        },
      },
    ],
  },
});

export default CONFIG;
