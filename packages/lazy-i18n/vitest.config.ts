import react from '@vitejs/plugin-react';
import { defineVitestConfig, type VitestConfig } from 'quisido/vitest';

const CONFIG: VitestConfig = await defineVitestConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
  },
});

export default CONFIG;
