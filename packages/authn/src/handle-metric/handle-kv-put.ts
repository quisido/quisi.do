import type { MetricDimensions } from '@quisido/worker';
import type MetricResult from './metric-result.js';

export default function handleKVPut(
  dimensions: MetricDimensions,
): MetricResult | null {
  const { bytes, endTime, env, startTime, ttl } = dimensions;

  if (
    typeof bytes !== 'number' ||
    typeof endTime !== 'number' ||
    typeof env !== 'string' ||
    typeof startTime !== 'number' ||
    typeof ttl !== 'number'
  ) {
    return null;
  }

  return {
    publicDimensions: { bytes, endTime, env, startTime, ttl },
  };
}
