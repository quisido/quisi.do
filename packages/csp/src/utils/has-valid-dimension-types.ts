import { type MetricDimensions } from '@quisido/worker';
import type { DimensionType } from '../constants/worker-metric-dimension-specs.js';

export default function hasValidDimensionTypes(
  dimensions: MetricDimensions,
  required: Readonly<Record<string, DimensionType>>,
): boolean {
  for (const [key, expectedType] of Object.entries(required)) {
    if (typeof dimensions[key] !== expectedType) {
      return false;
    }
  }
  return true;
}
