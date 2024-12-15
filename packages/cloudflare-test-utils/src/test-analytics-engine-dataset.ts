/// <reference types="@cloudflare/workers-types" />

import { expect, vi } from 'vitest';

export default class TestAnalyticsEngineDataset
  implements AnalyticsEngineDataset
{
  public readonly writeDataPoint =
    vi.fn<(event?: AnalyticsEngineDataPoint) => void>();

  public readonly expectToHaveWrittenDataPoint = (
    event?: AnalyticsEngineDataPoint,
  ): void => {
    expect(this.writeDataPoint).toHaveBeenCalledWith(event);
  };
}
