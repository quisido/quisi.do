import CONFIG, { INLINE_CONFIG, PLUGIN_OPTIONS } from '@quisido/vitest-config';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  ...CONFIG,
  plugins: [...PLUGIN_OPTIONS, react()],
  test: {
    ...INLINE_CONFIG,
    environment: 'jsdom',
  },
});
