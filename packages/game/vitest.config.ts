import { defineVitestConfig, type VitestConfig } from 'quisido';

const CONFIG: VitestConfig = await defineVitestConfig({
  test: {
    coverage: {
      enabled: false,
      provider: 'istanbul',
    },
    environment: 'jsdom',
  },
});

export default CONFIG;
