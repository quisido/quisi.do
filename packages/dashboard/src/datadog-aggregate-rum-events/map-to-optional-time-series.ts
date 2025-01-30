import { RUMAggregateBucketValueTimeseriesPoint } from '@datadog/datadog-api-client/dist/packages/datadog-api-client-v2/index.js';

const DEFAULT_VALUE = 0;

const isRUMAggregateBucketValueTimeseriesPoint = (
  value: unknown,
): value is RUMAggregateBucketValueTimeseriesPoint =>
  value instanceof RUMAggregateBucketValueTimeseriesPoint;

const mapToValue = ({
  value = DEFAULT_VALUE,
}: RUMAggregateBucketValueTimeseriesPoint): number => Math.round(value);

export default function mapToOptionalTimeSeries(
  points: unknown,
): readonly number[] | undefined {
  if (!Array.isArray(points)) {
    return;
  }

  if (!points.every(isRUMAggregateBucketValueTimeseriesPoint)) {
    return;
  }

  return points.map(mapToValue);
}
