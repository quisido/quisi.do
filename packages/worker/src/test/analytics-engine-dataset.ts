export default class TestAnalyticsEngineDataset
  implements AnalyticsEngineDataset
{
  public readonly writeDataPoint: (event?: AnalyticsEngineDataPoint) => void;

  public constructor(
    writeDataPoint: (event?: AnalyticsEngineDataPoint) => void,
  ) {
    this.writeDataPoint = writeDataPoint;
  }
}
