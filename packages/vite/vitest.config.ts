import react from '@vitejs/plugin-react';
import { defineVitestConfig, type VitestConfig } from 'quisi';

const CONFIG: VitestConfig = await defineVitestConfig({
  plugins: [react()],
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
