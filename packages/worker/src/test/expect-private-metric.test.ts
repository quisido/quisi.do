import { describe, expect, it } from 'vitest';
import { TEST_CONSOLE_LOG as testConsoleLog } from './console.js';
import expectPrivateMetric from './expect-private-metric.js';

describe('expectPrivateMetric', (): void => {
  it('should throw an error when the metric has not been emit', (): void => {
    expect((): void => {
      testConsoleLog('Private metric:', '{}');
      expectPrivateMetric({ name: 'test' });
    }).toThrow('Expected to emit a private metric:');
  });
});