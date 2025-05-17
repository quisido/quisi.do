import { defineConfig } from 'vitest/config';
import USER_CONFIG, {
  COVERAGE_OPTIONS,
  EXCLUDE,
  INLINE_CONFIG,
} from '@quisido/vitest-config';

export default defineConfig({
  ...USER_CONFIG,
  test: {
    ...INLINE_CONFIG,
    coverage: {
      ...COVERAGE_OPTIONS,
      exclude: [...EXCLUDE, 'scripts/*'],
    },
  },
});
