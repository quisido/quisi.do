import { describe, expect, it } from 'vitest';
import expectPublicMetric from './expect-public-metric.js';

describe('expectPublicMetric', (): void => {
  it('should throw an error when the metric has not been emit', (): void => {
    expect((): void => {
      expectPublicMetric({ name: 'test' });
    }).toThrow('Expected to emit a public metric:');
  });
});
