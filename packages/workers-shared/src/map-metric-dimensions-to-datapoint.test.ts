import { describe, expect, it } from 'vitest';
import mapMetricDimensionsToDataPoint from './map-metric-dimensions-to-datapoint.js';

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
