import { defineVitestConfig, type VitestConfig } from 'quisi';

const CONFIG: VitestConfig = await defineVitestConfig({
  test: {
    coverage: {
      enabled: false,
      provider: 'istanbul',
    },
  },
});

export default CONFIG;
