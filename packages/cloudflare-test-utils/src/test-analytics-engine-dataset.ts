/// <reference types="@cloudflare/workers-types" />

import { expect, vi } from 'vitest';

export default class TestAnalyticsEngineDataset
  implements AnalyticsEngineDataset
{
  public readonly expectToHaveWrittenDataPoint = (
    event?: AnalyticsEngineDataPoint,
  ): void => {
    expect(this.writeDataPoint).toHaveBeenCalledWith(event);
  };

  public readonly writeDataPoint =
    vi.fn<(event?: AnalyticsEngineDataPoint) => void>();
}
