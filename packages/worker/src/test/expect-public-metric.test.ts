import { describe, expect, it } from 'vitest';
import { TEST_CONSOLE_LOG as testConsoleLog } from './console.js';
import expectPublicMetric from './expect-public-metric.js';

describe('expectPublicMetric', (): void => {
  it('should throw an error when the metric has not been emit', (): void => {
    expect((): void => {
      testConsoleLog('Public metric:', '{}');
      expectPublicMetric({ name: 'test' });
    }).toThrow('Expected to emit a public metric:');
  });
});
