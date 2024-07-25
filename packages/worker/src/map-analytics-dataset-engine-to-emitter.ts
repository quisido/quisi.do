import mapMetricDimensionsToDataPoint from './map-metric-dimensions-to-datapoint.js';
import { type Metric } from './metric.js';

export default function mapAnalyticsEngineDatasetToEmitter(
  dataset: AnalyticsEngineDataset,
): (metric: Metric) => void {
  return function emit({ name, ...dimensions }: Metric): void {
    dataset.writeDataPoint({
      ...mapMetricDimensionsToDataPoint(dimensions),
      indexes: [name],
    });
  };
}
