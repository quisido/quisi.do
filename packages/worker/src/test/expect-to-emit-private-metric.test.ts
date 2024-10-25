import { describe, expect, it } from 'vitest';
import { TEST_CONSOLE_LOG as testConsoleLog } from './console.js';
import expectToEmitPrivateMetric from './expect-to-emit-private-metric.js';

describe('expectToEmitPrivateMetric', (): void => {
  it('should throw an error when the metric has not been emit', (): void => {
    expect((): void => {
      testConsoleLog('Private metric:', '{}');
      expectToEmitPrivateMetric({ name: 'test' });
    }).toThrow('Expected to emit a private metric:');
  });
});
