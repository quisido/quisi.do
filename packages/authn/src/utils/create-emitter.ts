import type Environment from '../constants/environment.js';
import type MetricName from '../constants/metric-name.js';
import mapDimensionsToDataPoint from './map-dimensions-to-datapoint.js';

interface Options {
  readonly analyticsEngineDataset?: AnalyticsEngineDataset | undefined;
  readonly environment: Environment;
  readonly fetchTime: number;
  readonly startTime: number;
}

export default function createEmitter({
  analyticsEngineDataset,
  environment,
  fetchTime,
  startTime,
}: Options): (
  name: MetricName,
  value?: null | number,
  dimensions?: Readonly<Record<string, number | string>>,
) => void {
  return function emit(
    name: MetricName,
    value: null | number = null,
    dimensions: Readonly<Record<string, number | string>> = {},
  ): void {
    const now: number = Date.now();
    const fetchDuration: number = now - fetchTime;
    const isolateDuration: number = now - startTime;
    if (typeof analyticsEngineDataset === 'undefined') {
      console.log({
        dimensions,
        environment,
        fetchDuration,
        isolateDuration,
        name,
        value,
      });
      return;
    }

    const { blobs, doubles } = mapDimensionsToDataPoint(dimensions);
    const valueDoubles: readonly number[] = value === null ? [] : [value];
    analyticsEngineDataset.writeDataPoint({
      blobs: [environment, ...blobs],
      doubles: [fetchDuration, isolateDuration, ...valueDoubles, ...doubles],
      indexes: [name],
    });
  };
}
