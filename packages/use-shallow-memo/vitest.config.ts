import CONFIG, { INLINE_CONFIG } from '@quisido/vitest-config';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  ...CONFIG,
  test: {
    ...INLINE_CONFIG,
    environment: 'happy-dom',
  },
});
