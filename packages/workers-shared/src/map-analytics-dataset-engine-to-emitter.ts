import mapMetricDimensionsToDataPoint from './map-metric-dimensions-to-datapoint.js';

export default function mapAnalyticsEngineDatasetToEmitter<
  M extends Record<'name', string> & Partial<Record<string, number | string>>,
>(dataset: AnalyticsEngineDataset): (metric: M) => void {
  return function emit({ name, ...dimensions }: M): void {
    dataset.writeDataPoint({
      ...mapMetricDimensionsToDataPoint(dimensions),
      indexes: [name],
    });
  };
}
