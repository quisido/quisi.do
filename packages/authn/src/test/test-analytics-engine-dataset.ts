import { vi } from 'vitest';

export default class TestAnalyticsEngineDataset
  implements AnalyticsEngineDataset
{
  readonly writeDataPoint: (event?: AnalyticsEngineDataPoint) => void;

  public constructor(writeDataPoint = vi.fn()) {
    this.writeDataPoint = writeDataPoint;
  }
}
