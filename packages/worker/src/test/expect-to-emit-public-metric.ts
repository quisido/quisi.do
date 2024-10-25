import { expect } from 'vitest';
import type { Metric } from '../metric.js';
import { TEST_CONSOLE_LOG } from './console.js';
import { EXPECT_ANY_NUMBER, EXPECT_ANY_STRING } from './expect-any.js';

const JSON_SPACE = 2;
const NONE = 0;
const UNSPECIFIED = 0;

export default function expectToEmitPublicMetric(metric: Metric): void {
  const metrics: string[] = [];
  for (const call of TEST_CONSOLE_LOG.mock.calls) {
    const [prefix, metricStr] = call as readonly unknown[];
    if (prefix !== 'Public metric:' || typeof metricStr !== 'string') {
      continue;
    }

    try {
      const metricJson: unknown = JSON.parse(metricStr);
      expect(metricJson).toEqual({
        timestamp: EXPECT_ANY_NUMBER,
        traceFlags: NONE,
        traceId: EXPECT_ANY_STRING,
        traceParentId: '0000000000000000',
        traceVersion: UNSPECIFIED,
        ...metric,
      });
      return;
    } catch (_err: unknown) {
      metrics.push(metricStr);
      continue;
    }
  }

  throw new Error(`Expected to emit a public metric:

${JSON.stringify(metric, null, JSON_SPACE)}

in:

${metrics.join('\n\n')}`);
}
