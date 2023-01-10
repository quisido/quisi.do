import reduceSecondsTimeSeriesEntriesToMilliseconds from './reduce-seconds-time-series-entries-to-milliseconds';

/*
Given a time series reported in seconds (e.g. CloudWatch metrics), create a time
  series reported in milliseconds (i.e. timestamps).
*/

export default function mapSecondsTimeSeriesToMilliseconds(
  record: Record<string, number>,
): Record<string, number> {
  return Object.entries(record).reduce(
    reduceSecondsTimeSeriesEntriesToMilliseconds,
    {},
  );
}
