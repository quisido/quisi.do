import mapDimensionsToDataPoint from '../utils/map-dimensions-to-datapoint.js';
import Operation from './operation.js';

export default class CloudflareWorkerOperation<
  Cause = unknown,
  MetricName extends string = string,
  MetricValue extends number = number,
  MetricDimensions extends Readonly<Record<string, number | string>> = Readonly<
    Record<string, number | string>
  >,
> extends Operation<Cause, MetricName, MetricValue, MetricDimensions> {
  private _analyticsEngineDataset: AnalyticsEngineDataset | undefined;

  public constructor(traceId: string) {
    super(traceId);
  }

  public setAnalyticsEngineDataset(
    analyticsEngineDataset: AnalyticsEngineDataset,
  ): this {
    this._analyticsEngineDataset = analyticsEngineDataset;
    return this;
  }

  protected override _emit(
    name: MetricName,
    value: MetricValue | null,
    dimensions: MetricDimensions,
  ): void {
    if (typeof this._analyticsEngineDataset === 'undefined') {
      super._emit(name, value, dimensions);
      return;
    }

    const valueDoubles: readonly number[] = value === null ? [] : [value];
    const { blobs, doubles } = mapDimensionsToDataPoint({
      ...this.publicMetadata,
      ...dimensions,
    });

    this._analyticsEngineDataset.writeDataPoint({
      blobs,
      indexes: [name],
      doubles: [...valueDoubles, ...doubles],
    });
  }
}
