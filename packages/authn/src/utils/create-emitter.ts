import type Environment from '../constants/environment.js';
import type MetricName from '../constants/metric-name.js';
import mapDimensionsToDataPoint from './map-dimensions-to-datapoint.js';

interface Options {
  readonly analyticsEngineDataset: AnalyticsEngineDataset;
  readonly environment: Environment;
  readonly startTime: number;
}

export default function createEmitter({
  analyticsEngineDataset,
  environment,
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
    const { blobs, doubles } = mapDimensionsToDataPoint(dimensions);
    const duration: number = Date.now() - startTime;

    const getDoubles = (): number[] => {
      if (value === null) {
        return [duration, ...doubles];
      }
      return [value, duration, ...doubles];
    };

    analyticsEngineDataset.writeDataPoint({
      blobs: [environment, ...blobs],
      doubles: getDoubles(),
      indexes: [name],
    });
  };
}
