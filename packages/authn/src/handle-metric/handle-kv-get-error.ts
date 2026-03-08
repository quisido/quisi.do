import type { MetricDimensions } from '@quisido/worker';
import type MetricResult from './metric-result.js';

export default function handleKVGetError(
  dimensions: MetricDimensions,
): MetricResult | null {
  const { endTime, env, startTime } = dimensions;

  if (
    typeof endTime !== 'number' ||
    typeof env !== 'string' ||
    typeof startTime !== 'number'
  ) {
    return null;
  }

  return {
    publicDimensions: { endTime, env, startTime },
  };
}
