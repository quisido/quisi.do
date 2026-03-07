import type { MetricDimensions } from '@quisido/worker';
import type MetricResult from './metric-result.js';

export default function handleFetch(
  dimensions: MetricDimensions,
): MetricResult | null {
  const { endTime, startTime, url } = dimensions;

  if (
    typeof endTime !== 'number' ||
    typeof startTime !== 'number' ||
    typeof url !== 'string'
  ) {
    return null;
  }

  try {
    const { origin } = new URL(url);
    return {
      privateDimensions: { endTime, startTime, url },
      publicDimensions: { endTime, origin, startTime },
    };
  } catch (_err: unknown) {
    return null;
  }
}
