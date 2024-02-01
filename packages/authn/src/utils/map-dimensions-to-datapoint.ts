import sortEntryByKey from './sort-entry-by-key.js';

const reduceEntriesToDataPoint = (
  datapoint: Required<Omit<AnalyticsEngineDataPoint, 'indexes'>>,
  [, value]: readonly [string, number | string],
): Required<Omit<AnalyticsEngineDataPoint, 'indexes'>> => {
  const { blobs = [], doubles = [] } = datapoint;
  if (typeof value === 'number') {
    return {
      blobs,
      doubles: [...doubles, value],
    };
  }
  return {
    blobs: [...blobs, value],
    doubles,
  };
};

export default function mapDimensionsToDataPoint(
  dimensions: Readonly<Record<string, number | string>>,
): Required<Omit<AnalyticsEngineDataPoint, 'indexes'>> {
  return Object.entries(dimensions)
    .sort(sortEntryByKey)
    .reduce(reduceEntriesToDataPoint, {
      blobs: [],
      doubles: [],
    });
}
