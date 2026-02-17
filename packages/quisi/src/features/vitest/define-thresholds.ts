import type { BaseCoverageOptions } from 'vitest/node';
import getTestConfig from '../config/get-test-config.js';

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

export default async function defineThresholds(
  thresholds: Thresholds | (Thresholds & GlobThresholds),
): Promise<Thresholds> {
  const { coverage = {} } = await getTestConfig();

  return {
    branches: coverage.branches ?? MAX_COVERAGE_THRESHOLD,
    functions: coverage.functions ?? MAX_COVERAGE_THRESHOLD,
    lines: coverage.lines ?? MAX_COVERAGE_THRESHOLD,
    statements: coverage.statements ?? MAX_COVERAGE_THRESHOLD,
    ...thresholds,
  };
}
