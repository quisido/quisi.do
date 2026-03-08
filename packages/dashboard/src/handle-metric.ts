import { type Handler, type MetricDimensions } from '@quisido/worker';
import isWorkerMetricName from './utils/is-worker-metric-name.js';
import createMetricEmitters from './handle-metric/emit-metric.js';
import handleCustomMetric from './handle-metric/handle-custom-metric.js';
import handleWorkerMetric from './handle-metric/handle-worker-metric.js';

const handleMetric = function handleMetric(
  this: Handler,
  name: string,
  dimensions: MetricDimensions,
): void {
  const emitters = createMetricEmitters.call(this, {
    dimensions,
    handleMetric,
    name,
  });

  if (
    isWorkerMetricName(name) &&
    handleWorkerMetric(name, dimensions, emitters)
  ) {
    return;
  }

  handleCustomMetric.call(this, { dimensions, name }, emitters);
};

export default handleMetric;
