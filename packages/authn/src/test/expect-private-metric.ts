import type { Metric } from '@quisido/worker';
import { expect } from 'vitest';
import { EXPECT_ANY_NUMBER } from './expect-any.js';
import { TEST_CONSOLE_LOG } from './test-console.js';

export default function expectPrivateMetric(metric: Metric): void {
  expect(TEST_CONSOLE_LOG).toHaveBeenCalledWith('Private:', {
    timestamp: EXPECT_ANY_NUMBER,
    traceFlags: 4,
    traceId: '00000000000000000000000000000002',
    traceParentId: '0000000000000003',
    traceVersion: 1,
    ...metric,
  });
}
