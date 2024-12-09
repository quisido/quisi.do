import config, {
  COVERAGE_OPTIONS,
  INLINE_CONFIG,
  THRESHOLDS,
} from '@quisido/vitest-config';

export default {
  ...config,
  test: {
    ...INLINE_CONFIG,
    coverage: {
      ...COVERAGE_OPTIONS,
      thresholds: {
        ...THRESHOLDS,
        branches: 6,
        functions: 35,
        lines: 55,
        statements: 55,
      },
    },
  },
};
