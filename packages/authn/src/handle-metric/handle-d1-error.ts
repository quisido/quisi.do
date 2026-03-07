import type { MetricDimensions } from '@quisido/worker';
import type MetricResult from './metric-result.js';

export default function handleD1Error(
  dimensions: MetricDimensions,
): MetricResult | null {
  const { endTime, env, query, startTime } = dimensions;

  if (
    typeof endTime !== 'number' ||
    typeof env !== 'string' ||
    typeof query !== 'string' ||
    typeof startTime !== 'number'
  ) {
    return null;
  }

  return {
    privateDimensions: {
      endTime,
      env,
      query,
      startTime,
    },

    publicDimensions: {
      endTime,
      env,
      startTime,
    },
  };
}
