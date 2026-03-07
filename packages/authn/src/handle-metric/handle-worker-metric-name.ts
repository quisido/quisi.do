import {
  type Handler,
  type MetricDimensions,
  MetricName as WorkerMetricName,
} from '@quisido/worker';
import { MetricName } from '../constants/metric-name.js';
import handleMetric from '../handle-metric.js';
import { emitPrivately, emitPublicly } from './emit-metric.js';
import handleWorkerMetric from './handle-worker-metric.js';

export default async function handleWorkerMetricName(
  this: Handler,
  name: WorkerMetricName,
  dimensions: MetricDimensions,
): Promise<void> {
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
}
