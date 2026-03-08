import { type Handler, type MetricDimensions } from '@quisido/worker';
import { PUBLIC } from './constants/metric-dimensions.js';
import { MetricName } from './constants/metric-name.js';
import emitWorkerMetric from './utils/emit-worker-metric.js';
import isWorkerMetricName from './utils/is-worker-metric-name.js';
import mapDimensionsToString from './utils/map-dimensions-to-string.js';

type EmitFn = (subdimensions: MetricDimensions) => void;

interface CustomMetricContext {
  readonly emitPrivately: EmitFn;
  readonly emitPublicly: EmitFn;
  readonly name: string;
}

const createEmitPublicly =
  (handler: Handler, name: string): EmitFn =>
  (subdimensions: MetricDimensions): void => {
    const subdimensionsStr: string = mapDimensionsToString(subdimensions);
    handler.log('-'.repeat(`Public metric: ${name}`.length));
    handler.log('Public metric:', name);
    handler.log(subdimensionsStr);
    handler.writeMetricDataPoint('PUBLIC_DATASET', name, subdimensions);
  };

const createEmitPrivately =
  (handler: Handler, name: string): EmitFn =>
  (subdimensions: MetricDimensions): void => {
    const subdimensionsStr: string = mapDimensionsToString(subdimensions);
    handler.log('------------------------');
    handler.log('Private metric:', name);
    handler.log(subdimensionsStr);
    handler.writeMetricDataPoint('PRIVATE_DATASET', name, subdimensions);
  };

const emitCustomMetric = (
  handler: Handler,
  dimensions: MetricDimensions,
  { emitPrivately, emitPublicly, name }: CustomMetricContext,
): void => {
  if (!Object.hasOwn(dimensions, PUBLIC)) {
    handler.logError(
      new Error('Attempted to emit a metric without explicit accessibility.', {
        cause: { dimensions, name },
      }),
    );
    return;
  }

  const { [PUBLIC]: isPublic, ...newDimensions } = dimensions;
  if (typeof isPublic !== 'boolean') {
    handler.logError(
      new Error('Attempted to emit a metric with invalid accessibility.', {
        cause: { dimensions, name },
      }),
    );
    return;
  }

  if (isPublic) {
    emitPublicly(newDimensions);
  } else {
    emitPrivately(newDimensions);
  }
};

export default function handleMetric(
  this: Handler,
  name: string,
  dimensions: MetricDimensions,
): void {
  const emitPublicly = createEmitPublicly(this, name);
  const emitPrivately = createEmitPrivately(this, name);

  if (isWorkerMetricName(name)) {
    emitWorkerMetric(name, dimensions, {
      emitInvalid: (): void => {
        handleMetric.call(this, MetricName.InvalidWorkerMetric, {
          dimensions: JSON.stringify(dimensions),
          name,
        });
      },
      emitPrivately,
      emitPublicly,
    });
    return;
  }

  emitCustomMetric(this, dimensions, { emitPrivately, emitPublicly, name });
}
