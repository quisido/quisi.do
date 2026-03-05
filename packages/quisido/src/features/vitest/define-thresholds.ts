import type { BaseCoverageOptions } from 'vitest/node';

// eslint-disable-next-line no-magic-numbers
type MaxThreshold = 100;
type Thresholds = Required<BaseCoverageOptions>['thresholds'];

type GlobThresholds = Partial<
  Record<
    string,
    Pick<
      Thresholds,
      MaxThreshold | 'statements' | 'functions' | 'branches' | 'lines'
    >
  >
>;

const MAX_COVERAGE_THRESHOLD = 100;

export default function defineThresholds(
  thresholds: Thresholds | (Thresholds & GlobThresholds),
): Thresholds {
  return {
    branches: MAX_COVERAGE_THRESHOLD,
    functions: MAX_COVERAGE_THRESHOLD,
    lines: MAX_COVERAGE_THRESHOLD,
    statements: MAX_COVERAGE_THRESHOLD,
    ...thresholds,
  };
}
