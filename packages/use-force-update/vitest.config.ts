import { defineVitestConfig, type VitestConfig } from 'quisi';

const CONFIG: VitestConfig = await defineVitestConfig({
  test: {
    environment: 'jsdom',
  },
});

export default CONFIG;
