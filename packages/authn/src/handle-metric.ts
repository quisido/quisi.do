import { type Handler, type MetricDimensions } from '@quisido/worker';
import handleCustomMetric from './handle-metric/handle-custom-metric.js';
import handleWorkerMetricName from './handle-metric/handle-worker-metric-name.js';
import isWorkerMetricName from './utils/is-worker-metric-name.js';

export default async function handleMetric(
  this: Handler,
  name: string,
  dimensions: MetricDimensions,
): Promise<void> {
  if (isWorkerMetricName(name)) {
    await handleWorkerMetricName.call(this, name, dimensions);
    return;
  }

  handleCustomMetric(this, name, dimensions);
}
