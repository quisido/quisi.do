import { MetricName as WorkerMetricName, type Handler } from '@quisido/worker';
import { PUBLIC } from './constants/metric-dimensions.js';
import { MetricName } from './constants/metric-name.js';
import isWorkerMetricName from './utils/is-worker-metric-name.js';

const JSON_SPACE = 2;

export default function handleMetric(
  this: Handler,
  name: string,
  dimensions: Record<number | string | symbol, boolean | number | string>,
  isPublic?: boolean,
): void {
  if (typeof isPublic === 'undefined') {
    if (isWorkerMetricName(name)) {
      switch (name) {
        case WorkerMetricName.InvalidEnvironmentVariable: {
          const { key, type, value } = dimensions;
          if (
            typeof key !== 'string' ||
            typeof type !== 'string' ||
            typeof value !== 'string'
          ) {
            handleMetric.call(
              this,
              MetricName.InvalidWorkerMetric,
              { dimensions: JSON.stringify(dimensions), name },
              false,
            );
            return;
          }

          handleMetric.call(this, name, { key, type }, true);
          handleMetric.call(this, name, { key, value }, false);
          return;
        }
      }
    }

    if (!Object.hasOwn(dimensions, PUBLIC)) {
      this.logError(
        new Error('Attempted to emit a metric without explicit accessibility.'),
      );
      return;
    }

    const newIsPublic: unknown = dimensions[PUBLIC];
    if (typeof newIsPublic !== 'boolean') {
      this.logError(
        new Error('Attempted to emit a metric with invalid accessibility.'),
      );
      return;
    }

    delete dimensions[PUBLIC];
    handleMetric.call(this, name, dimensions, newIsPublic);
    return;
  }

  // Public metric
  const dimensionsStr: string = JSON.stringify(dimensions, null, JSON_SPACE);
  if (isPublic) {
    if (dimensionsStr === '{}') {
      this.log('Public metric:', name);
    } else {
      this.log('Public metric:', name, dimensionsStr);
    }

    this.writeMetricDataPoint('PUBLIC_DATASET', name, dimensions);
    return;
  }

  // Private metric
  if (dimensionsStr === '{}') {
    this.log('Private metric:', name);
  } else {
    this.log('Private metric:', name, dimensionsStr);
  }

  this.writeMetricDataPoint('PRIVATE_DATASET', name, dimensions);
}
