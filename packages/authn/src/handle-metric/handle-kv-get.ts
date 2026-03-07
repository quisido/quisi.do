import type { MetricDimensions } from '@quisido/worker';
import type MetricResult from './metric-result.js';

export default function handleKVGet(
  dimensions: MetricDimensions,
): MetricResult | null {
  const { endTime, env, key, startTime } = dimensions;

  if (
    typeof endTime !== 'number' ||
    typeof env !== 'string' ||
    typeof key !== 'string' ||
    typeof startTime !== 'number'
  ) {
    return null;
  }

  return {
    privateDimensions: { endTime, env, key, startTime },
    publicDimensions: { endTime, env, startTime },
  };
}
