import { mapBooleanToNumber } from 'fmrs';

export default function reduceMetricDimensionValuesToDataPoint(
  datapoint: Required<Omit<AnalyticsEngineDataPoint, 'indexes'>>,
  value: boolean | number | string | undefined,
): Required<Omit<AnalyticsEngineDataPoint, 'indexes'>> {
  if (typeof value === 'undefined') {
    return datapoint;
  }

  switch (typeof value) {
    case 'boolean': {
      const double: number = mapBooleanToNumber(value);
      return {
        ...datapoint,
        doubles: [...datapoint.doubles, double],
      };
    }

    case 'number':
      return {
        ...datapoint,
        doubles: [...datapoint.doubles, value],
      };

    case 'string':
      return {
        ...datapoint,
        blobs: [...datapoint.blobs, value],
      };

    case 'undefined':
      return datapoint;
  }
}
