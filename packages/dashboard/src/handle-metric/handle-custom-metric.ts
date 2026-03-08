import { type Handler, type MetricDimensions } from '@quisido/worker';
import { PUBLIC } from '../constants/metric-dimensions.js';
import type MetricEmitters from './metric-emitters.js';

interface CustomMetricContext {
  readonly dimensions: MetricDimensions;
  readonly name: string;
}

const handleCustomMetric = function handleCustomMetric(
  this: Handler,
  { dimensions, name }: CustomMetricContext,
  { emitPrivately, emitPublicly }: MetricEmitters,
): void {
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
};

export default handleCustomMetric;
