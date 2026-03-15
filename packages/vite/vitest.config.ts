import react from '@vitejs/plugin-react';
import { defineVitestConfig, type VitestConfig } from 'quisido';

const CONFIG: VitestConfig = await defineVitestConfig({
  plugins: [react()],
  test: {
    coverage: {
      enabled: false,
    },
    env: {
      CLARITY_TAG: 'test-clarity-tag',
    },
    environment: 'jsdom',
  },
});

export default CONFIG;
