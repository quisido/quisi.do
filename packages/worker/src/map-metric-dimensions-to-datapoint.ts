import { mapEntryToValue, sortEntriesByKey } from 'fmrs';
import reduceMetricDimensionValuesToDataPoint from './reduce-metric-dimension-values-to-data-point.js';

export default function mapMetricDimensionsToDataPoint(
  dimensions: Readonly<
    Partial<Record<number | string | symbol, boolean | number | string>>
  >,
): Required<Omit<AnalyticsEngineDataPoint, 'indexes'>> {
  return Object.entries(dimensions)
    .sort(sortEntriesByKey)
    .map(mapEntryToValue)
    .reduce(reduceMetricDimensionValuesToDataPoint, {
      blobs: [],
      doubles: [],
    });
}
