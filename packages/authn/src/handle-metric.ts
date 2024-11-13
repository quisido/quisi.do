import type { Handler } from '@quisido/worker';
import { PUBLIC } from './constants/metric-dimensions.js';

const JSON_SPACE = 2;

export default function handleMetric(
  this: Handler,
  name: string,
  dimensions: Record<number | string | symbol, boolean | number | string>,
  isPublic?: boolean,
): void {
  if (typeof isPublic === 'undefined') {
    if (!Object.hasOwn(dimensions, PUBLIC)) {
      const err = new Error(
        'Attempted to emit a metric without explicit accessibility.',
      );
      this.console.error(err);
      throw err;
    }

    const newIsPublic: unknown = dimensions[PUBLIC];
    if (typeof newIsPublic !== 'boolean') {
      const err = new Error(
        'Attempted to emit a metric with invalid accessibility.',
      );
      this.console.error(err);
      throw err;
    }

    delete dimensions[PUBLIC];
    handleMetric.call(this, name, dimensions, newIsPublic);
    return;
  }

  const dimensionsStr: string = JSON.stringify(dimensions, null, JSON_SPACE);

  // Public metric
  if (isPublic) {
    if (dimensionsStr === '{}') {
      this.console.log('Public metric:', name);
    } else {
      this.console.log('Public metric:', name, dimensionsStr);
    }

    this.writeMetricDataPoint('PUBLIC_DATASET', name, dimensions);
    return;
  }

  // Private metric
  if (dimensionsStr === '{}') {
    this.console.log('Private metric:', name);
  } else {
    this.console.log('Private metric:', name, dimensionsStr);
  }

  this.writeMetricDataPoint('PRIVATE_DATASET', name, dimensions);
}
