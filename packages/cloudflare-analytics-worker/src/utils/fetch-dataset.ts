interface DataPoint {
  readonly message: string;
  readonly statusCode: number;
}

export default class FetchDataset {
  private readonly _dataset: AnalyticsEngineDataset;

  private readonly _start: Date;

  public constructor(dataset: Readonly<AnalyticsEngineDataset>, start: Date) {
    this._dataset = dataset;
    this._start = start;
  }

  public readonly writeDataPoint = ({
    message,
    statusCode,
  }: Readonly<DataPoint>): void => {
    const duration: number = this._start.getTime() - Date.now();
    this._dataset.writeDataPoint({
      blobs: [message],
      doubles: [duration, statusCode],
      indexes: [statusCode.toString()],
    });
  };
}
