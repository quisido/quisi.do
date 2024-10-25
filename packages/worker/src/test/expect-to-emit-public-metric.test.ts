import { describe, expect, it } from 'vitest';
import { TEST_CONSOLE_LOG as testConsoleLog } from './console.js';
import expectToEmitPublicMetric from './expect-to-emit-public-metric.js';

describe('expectToEmitPublicMetric', (): void => {
  it('should throw an error when the metric has not been emit', (): void => {
    expect((): void => {
      testConsoleLog('Public metric:', '{}');
      expectToEmitPublicMetric({ name: 'test' });
    }).toThrow('Expected to emit a public metric:');
  });
});
