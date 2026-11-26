import {
  type Handler,
  type MetricDimensions,
  MetricName as WorkerMetricName,
} from '@quisido/worker';
import { PUBLIC } from './constants/metric-dimensions.js';
import { MetricName } from './constants/metric-name.js';
import WORKER_METRIC_DIMENSION_SPECS from './constants/worker-metric-dimension-specs.js';
import hasValidDimensionTypes from './utils/has-valid-dimension-types.js';
import isWorkerMetricName from './utils/is-worker-metric-name.js';
import mapDimensionsToString from './utils/map-dimensions-to-string.js';
import pickDimensions from './utils/pick-dimensions.js';

export default function handleMetric(
  this: Handler,
  name: string,
  dimensions: MetricDimensions,
): void {
  const emitPublicly = (subdimensions: MetricDimensions): void => {
    const subdimensionsStr: string = mapDimensionsToString(subdimensions);
    this.log('-'.repeat(`Public metric: ${name}`.length));
    this.log('Public metric:', name);
    this.log(subdimensionsStr);
    this.writeMetricDataPoint('PUBLIC_DATASET', name, subdimensions);
  };

  const emitPrivately = (subdimensions: MetricDimensions): void => {
    const subdimensionsStr: string = mapDimensionsToString(subdimensions);
    this.log('------------------------');
    this.log('Private metric:', name);
    this.log(subdimensionsStr);
    this.writeMetricDataPoint('PRIVATE_DATASET', name, subdimensions);
  };

  if (isWorkerMetricName(name)) {
    const emitInvalidWorkerMetric = (): void => {
      handleMetric.call(this, MetricName.InvalidWorkerMetric, {
        dimensions: JSON.stringify(dimensions),
        name,
      });
    };

    const spec = WORKER_METRIC_DIMENSION_SPECS[name];
    if (spec !== undefined) {
      if (!hasValidDimensionTypes(dimensions, spec.required)) {
        emitInvalidWorkerMetric();
        return;
      }

      if (name === WorkerMetricName.Fetch) {
        const { endTime, startTime, url } = dimensions;
        if (
          typeof endTime !== 'number' ||
          typeof startTime !== 'number' ||
          typeof url !== 'string'
        ) {
          emitInvalidWorkerMetric();
          return;
        }
        try {
          const { origin } = new URL(url);
          emitPrivately({ endTime, startTime, url });
          emitPublicly({ endTime, origin, startTime });
        } catch (_err: unknown) {
          emitInvalidWorkerMetric();
        }
        return;
      }

      if (spec.privateKeys !== undefined) {
        emitPrivately(pickDimensions(dimensions, spec.privateKeys));
      }

      if (spec.publicKeys !== undefined) {
        emitPublicly(pickDimensions(dimensions, spec.publicKeys));
      }
      return;
    }
  }

  // Custom metrics
  if (!Object.hasOwn(dimensions, PUBLIC)) {
    this.logError(
      new Error('Attempted to emit a metric without explicit accessibility.', {
        cause: { dimensions, name },
      }),
    );
    return;
  }

  const { [PUBLIC]: isPublic, ...newDimensions } = dimensions;
  if (typeof isPublic !== 'boolean') {
    this.logError(
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
}
