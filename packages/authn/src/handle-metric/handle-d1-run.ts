import type { MetricDimensions } from '@quisido/worker';
import type MetricResult from './metric-result.js';
import validateD1Dimensions from './validate-d1-dimensions.js';

export default function handleD1Run(
  dimensions: MetricDimensions,
): MetricResult | null {
  const validated = validateD1Dimensions(dimensions);
  if (validated === null) {
    return null;
  }

  const { lastRowId, query, ...publicFields } = validated;
  return {
    privateDimensions: validated,
    publicDimensions: publicFields,
  };
}
