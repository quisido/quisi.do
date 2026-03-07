import { type Handler, type MetricDimensions } from '@quisido/worker';
import { MetricName } from './constants/metric-name.js';
import { emitPrivately, emitPublicly } from './handle-metric/emit-metric.js';
import handleCustomMetric from './handle-metric/handle-custom-metric.js';
import handleWorkerMetric from './handle-metric/handle-worker-metric.js';
import isWorkerMetricName from './utils/is-worker-metric-name.js';

export default async function handleMetric(
  this: Handler,
  name: string,
  dimensions: MetricDimensions,
): Promise<void> {
  if (isWorkerMetricName(name)) {
    const result = handleWorkerMetric(name, dimensions);

    if (result === null) {
      await handleMetric.call(this, MetricName.InvalidWorkerMetric, {
        dimensions: JSON.stringify(dimensions),
        name,
      });
      return;
    }

    if (result.privateDimensions !== undefined) {
      emitPrivately(this, name, result.privateDimensions);
    }

    if (result.publicDimensions !== undefined) {
      emitPublicly(this, name, result.publicDimensions);
    }

    return;
  }

  handleCustomMetric(this, name, dimensions);
}
