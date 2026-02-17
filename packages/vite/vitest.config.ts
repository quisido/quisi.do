import { defineVitestConfig, type VitestConfig } from 'quisi';

const CONFIG: VitestConfig = await defineVitestConfig({
  test: {
    coverage: {
      enabled: false,
      provider: 'istanbul',
    },
    env: {
      CLARITY_TAG: 'test-clarity-tag',
    },
    environment: 'jsdom',
  },
});

export default CONFIG;
