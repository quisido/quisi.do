import { mapEntryToValue, sortEntriesByKey } from 'fmrs';
import type { MetricDimensions } from './metric-dimensions.js';
import reduceMetricDimensionValuesToDataPoint from './reduce-metric-dimension-values-to-data-point.js';

export default function mapMetricDimensionsToDataPoint(
  dimensions: Readonly<Partial<MetricDimensions>>,
): Required<Omit<AnalyticsEngineDataPoint, 'indexes'>> {
  return Object.entries(dimensions)
    .sort(sortEntriesByKey)
    .map(mapEntryToValue)
    .reduce(reduceMetricDimensionValuesToDataPoint, {
      blobs: [],
      doubles: [],
    });
}
