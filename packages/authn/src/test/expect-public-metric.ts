import { expect } from 'vitest';
import { TEST_CONSOLE_LOG } from './test-console.js';

const JSON_SPACE = 2;

export default function expectPublicMetric(
  name: string,
  dimensions: Record<string, boolean | number | string>,
): void {
  const metrics: string[] = [];
  for (const call of TEST_CONSOLE_LOG.mock.calls) {
    const [prefix, metricStr] = call as readonly unknown[];
    if (prefix !== 'Public metric:' || typeof metricStr !== 'string') {
      continue;
    }

    try {
      const metricJson: unknown = JSON.parse(metricStr);
      expect(metricJson).toEqual(dimensions);
      return;
    } catch (_err: unknown) {
      metrics.push(metricStr);
      continue;
    }
  }

  throw new Error(`Expected to emit "${name}" publicly:

${JSON.stringify(dimensions, null, JSON_SPACE)}

in:

${metrics.join('\n\n')}`);
}
