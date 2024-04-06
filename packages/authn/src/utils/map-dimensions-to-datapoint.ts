import { sortArraysByIndex } from 'map-reduce-sort';

const KEY_INDEX = 0;
const mapEntryToValue = <T>([, value]: readonly [unknown, T]): T => value;

const reduceValuesToDataPoint = (
  datapoint: Required<Omit<AnalyticsEngineDataPoint, 'indexes'>>,
  value: number | string | undefined,
): Required<Omit<AnalyticsEngineDataPoint, 'indexes'>> => {
  if (typeof value === 'undefined') {
    return datapoint;
  }

  if (typeof value === 'number') {
    return {
      ...datapoint,
      doubles: [...datapoint.doubles, value],
    };
  }

  return {
    ...datapoint,
    blobs: [...datapoint.blobs, value],
  };
};

export default function mapDimensionsToDataPoint(
  dimensions: Readonly<Partial<Record<string, number | string>>>,
): Required<Omit<AnalyticsEngineDataPoint, 'indexes'>> {
  return Object.entries(dimensions)
    .sort(sortArraysByIndex(KEY_INDEX))
    .map(mapEntryToValue)
    .reduce(reduceValuesToDataPoint, {
      blobs: [],
      doubles: [],
    });
}
