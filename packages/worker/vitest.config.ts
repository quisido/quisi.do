import config, {
  COVERAGE_OPTIONS,
  EXCLUDE,
  INLINE_CONFIG,
} from '@quisido/vitest-config';
import { defineConfig } from 'vite';

export default defineConfig({
  ...config,
  test: {
    ...INLINE_CONFIG,
    coverage: {
      ...COVERAGE_OPTIONS,
      exclude: [...EXCLUDE, 'scripts/'],
    },
  },
});
