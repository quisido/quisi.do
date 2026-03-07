import type { Handler, MetricDimensions } from '@quisido/worker';
import { PUBLIC } from '../constants/metric-dimensions.js';
import { emitPrivately, emitPublicly } from './emit-metric.js';

export default function handleCustomMetric(
  handler: Handler,
  name: string,
  dimensions: MetricDimensions,
): void {
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
    emitPublicly(handler, name, newDimensions);
  } else {
    emitPrivately(handler, name, newDimensions);
  }
}
