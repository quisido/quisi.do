import { expect } from 'vitest';
import type { Metric } from '../metric.js';
import { TEST_CONSOLE_LOG } from './console.js';
import { EXPECT_ANY_NUMBER, EXPECT_ANY_STRING } from './expect-any.js';

const NONE = 0;
const UNSPECIFIED = 0;

export default function expectToEmitPrivateMetric(metric: Metric): void {
  expect(TEST_CONSOLE_LOG).toHaveBeenCalledWith('Private:', {
    timestamp: EXPECT_ANY_NUMBER,
    traceFlags: NONE,
    traceId: EXPECT_ANY_STRING,
    traceParentId: '0000000000000000',
    traceVersion: UNSPECIFIED,
    ...metric,
  });
}
