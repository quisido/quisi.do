import type { MetricDimensions } from '@quisido/worker';
import type MetricResult from './metric-result.js';

export default function handleInvalidBinding(
  dimensions: MetricDimensions,
): MetricResult | null {
  const { key, type, value } = dimensions;

  if (
    typeof key !== 'string' ||
    typeof type !== 'string' ||
    typeof value !== 'string'
  ) {
    return null;
  }

  return {
    privateDimensions: { key, value },
    publicDimensions: { key, type },
  };
}
