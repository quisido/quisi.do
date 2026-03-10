import type { MetricDimensions } from '@quisido/worker';
import type MetricResult from './metric-result.js';
import validateD1Dimensions from './validate-d1-dimensions.js';

export default function handleD1All(
  dimensions: MetricDimensions,
): MetricResult | null {
  const validated = validateD1Dimensions(dimensions);
  if (validated === null) {
    return null;
  }

  const { results } = dimensions;
  if (typeof results !== 'number') {
    return null;
  }

  return {
    privateDimensions: { ...validated, results },
    publicDimensions: {
      changedDb: validated.changedDb,
      changes: validated.changes,
      duration: validated.duration,
      endTime: validated.endTime,
      env: validated.env,
      results,
      rowsRead: validated.rowsRead,
      rowsWritten: validated.rowsWritten,
      sizeAfter: validated.sizeAfter,
      startTime: validated.startTime,
    },
  };
}
