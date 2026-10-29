import { describe, expect, it } from 'vitest';
import { isAnalyticsEngineResponse } from './index.js';

describe('isAnalyticsEngineResponse', (): void => {
  it('should return false when input is not an Analytics Engine response', (): void => {
    expect(isAnalyticsEngineResponse(true)).toBe(false);
    expect(isAnalyticsEngineResponse(null)).toBe(false);
    expect(isAnalyticsEngineResponse({})).toBe(false);
    expect(isAnalyticsEngineResponse({ data: true })).toBe(false);
    expect(isAnalyticsEngineResponse({ data: [] })).toBe(false);
    expect(isAnalyticsEngineResponse({ data: [true] })).toBe(false);
    expect(isAnalyticsEngineResponse({ data: [{ double1: '' }] })).toBe(false);
    expect(
      isAnalyticsEngineResponse({
        data: [
          {
            _sample_interval: 1,
            double1: 1,
            double10: 1,
            double11: 1,
            double12: 1,
            double13: 1,
            double14: 1,
            double15: 1,
            double16: 1,
            double17: 1,
            double18: 1,
            double19: 1,
            double2: 1,
            double20: 1,
            double3: 1,
            double4: 1,
            double5: 1,
            double6: 1,
            double7: 1,
            double8: 1,
            double9: 1,
          },
        ],
      }),
    ).toBe(false);
    expect(isAnalyticsEngineResponse({ data: [], meta: true })).toBe(false);
  });

  it('should return true for Analytics Engine responses', (): void => {
    expect(isAnalyticsEngineResponse({ data: [], meta: [] })).toBe(true);
  });
});
