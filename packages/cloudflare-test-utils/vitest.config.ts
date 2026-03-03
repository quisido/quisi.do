import { defineVitestConfig, type VitestConfig } from 'quisi';

const CONFIG: VitestConfig = await defineVitestConfig({
  test: {
    coverage: {
      thresholds: {
        branches: 6,
        functions: 16,
        lines: 51,
        statements: 50,
      },
    },
  },
});

export default CONFIG;
