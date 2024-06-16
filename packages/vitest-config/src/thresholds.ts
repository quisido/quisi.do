import type { BaseCoverageOptions } from 'vitest';

type Thresholds = Required<BaseCoverageOptions>['thresholds'];

export const THRESHOLDS: Thresholds = {
  branches: 100,
  functions: 100,
  lines: 100,
  statements: 100,
};
