import { type Handler, type MetricDimensions } from '@quisido/worker';
import { MetricName } from '../constants/metric-name.js';
import mapDimensionsToString from '../utils/map-dimensions-to-string.js';
import type MetricEmitters from './metric-emitters.js';

type HandleMetricFn = (
  this: Handler,
  name: string,
  dimensions: MetricDimensions,
) => void;

interface MetricContext {
  readonly dimensions: MetricDimensions;
  readonly handleMetric: HandleMetricFn;
  readonly name: string;
}

const emitPublicly = (
  handler: Handler,
  name: string,
  subdimensions: MetricDimensions,
): void => {
  const subdimensionsStr: string = mapDimensionsToString(subdimensions);
  handler.log('-'.repeat(`Public metric: ${name}`.length));
  handler.log('Public metric:', name);
  handler.log(subdimensionsStr);
  handler.writeMetricDataPoint('PUBLIC_DATASET', name, subdimensions);
};

const emitPrivately = (
  handler: Handler,
  name: string,
  subdimensions: MetricDimensions,
): void => {
  const subdimensionsStr: string = mapDimensionsToString(subdimensions);
  handler.log('------------------------');
  handler.log('Private metric:', name);
  handler.log(subdimensionsStr);
  handler.writeMetricDataPoint('PRIVATE_DATASET', name, subdimensions);
};

const createMetricEmitters = function createMetricEmitters(
  this: Handler,
  { dimensions, handleMetric, name }: MetricContext,
): MetricEmitters {
  return {
    emitInvalidWorkerMetric: (): void => {
      handleMetric.call(this, MetricName.InvalidWorkerMetric, {
        dimensions: JSON.stringify(dimensions),
        name,
      });
    },
    emitPrivately: (subdimensions: MetricDimensions): void => {
      emitPrivately(this, name, subdimensions);
    },
    emitPublicly: (subdimensions: MetricDimensions): void => {
      emitPublicly(this, name, subdimensions);
    },
  };
};

export default createMetricEmitters;
