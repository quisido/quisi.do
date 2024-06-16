/// <reference types="@cloudflare/workers-types" />
import { describe, expect, it, vi } from 'vitest';
import { isAnalyticsEngineDataset } from './index.js';

describe('isAnalyticsEngineDataset', (): void => {
  it('should identify Analytics Engine dataset interfaces', (): void => {
    expect(isAnalyticsEngineDataset(true)).toBe(false);
    expect(isAnalyticsEngineDataset(null)).toBe(false);
    expect(isAnalyticsEngineDataset({})).toBe(false);

    expect(
      isAnalyticsEngineDataset({
        writeDataPoint: vi.fn(),
      }),
    ).toBe(true);
  });
});
