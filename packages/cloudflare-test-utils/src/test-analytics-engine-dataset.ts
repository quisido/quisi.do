/// <reference types="@cloudflare/workers-types" />

import { expect, type Mock, vi } from 'vitest';

export default class TestAnalyticsEngineDataset
  implements AnalyticsEngineDataset
{
  public readonly expectToHaveWrittenDataPoint = (
    event?: AnalyticsEngineDataPoint,
  ): void => {
    expect(this.writeDataPoint).toHaveBeenCalledWith(event);
  };

  public readonly writeDataPoint: Mock<
    (event?: AnalyticsEngineDataPoint) => void
  > = vi.fn<(event?: AnalyticsEngineDataPoint) => void>();
}
