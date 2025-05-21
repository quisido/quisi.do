import config, { INLINE_CONFIG } from '@quisido/vitest-config';
import { defineConfig } from 'vite';

export default defineConfig({
  ...config,
  test: {
    ...INLINE_CONFIG,
    environment: 'jsdom',
  },
});
