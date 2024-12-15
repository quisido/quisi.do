import { describe, expect, it } from 'vitest';
import { mapMetricDimensionsToDataPoint } from './index.js';

describe('mapMetricDimensionsToDataPoint', (): void => {
  it('should handle undefined values', (): void => {
    expect(
      mapMetricDimensionsToDataPoint({
        test: undefined,
      }),
    ).toEqual({
      blobs: [],
      doubles: [],
    });
  });
});
