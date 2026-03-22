import { playwright } from '@vitest/browser-playwright';
import { defineVitestConfig, type VitestConfig } from 'quisido';

type BrowserProvider = NonNullable<
  NonNullable<NonNullable<VitestConfig['test']>['browser']>['provider']
>;

const CONFIG: VitestConfig = await defineVitestConfig({
  test: {
    browser: {
      enabled: true,
      headless: true,
      instances: [
        { browser: 'chromium', name: 'chromium' },
        { browser: 'firefox', name: 'firefox' },
        { browser: 'webkit', name: 'webkit' },
      ],
      // The browser provider currently resolves a second copy of Vitest types.
      provider: playwright() as unknown as BrowserProvider,
    },
    coverage: {
      enabled: false,
    },
    include: ['src/**/browser-smoke.test.ts'],
  },
});

export default CONFIG;
