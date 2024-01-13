import type DataPoint from '../types/data-point.js';

export default class FetchDataset {
  private readonly _dataset: AnalyticsEngineDataset | undefined;

  private readonly _start: Date;

  public constructor(
    dataset: Readonly<AnalyticsEngineDataset> | undefined,
    start: Readonly<Date>,
  ) {
    this._dataset = dataset;
    this._start = start;
  }

  public readonly writeDataPoint = ({
    message,
    statusCode,
  }: Readonly<DataPoint>): void => {
    if (typeof this._dataset === 'undefined') {
      return;
    }

    const duration: number = this._start.getTime() - Date.now();
    this._dataset.writeDataPoint({
      blobs: [message],
      doubles: [duration, statusCode],
      indexes: [statusCode.toString()],
    });
  };
}
