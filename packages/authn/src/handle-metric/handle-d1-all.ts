import type { MetricDimensions } from '@quisido/worker';
import type MetricResult from './metric-result.js';

export default function handleD1All(
  dimensions: MetricDimensions,
): MetricResult | null {
  const {
    changedDb,
    changes,
    duration,
    endTime,
    env,
    lastRowId,
    query,
    results,
    rowsRead,
    rowsWritten,
    sizeAfter,
    startTime,
  } = dimensions;

  if (
    typeof changedDb !== 'boolean' ||
    typeof changes !== 'number' ||
    typeof duration !== 'number' ||
    typeof endTime !== 'number' ||
    typeof env !== 'string' ||
    typeof lastRowId !== 'number' ||
    typeof query !== 'string' ||
    typeof results !== 'number' ||
    typeof rowsRead !== 'number' ||
    typeof rowsWritten !== 'number' ||
    typeof sizeAfter !== 'number' ||
    typeof startTime !== 'number'
  ) {
    return null;
  }

  return {
    privateDimensions: {
      changedDb,
      changes,
      duration,
      endTime,
      env,
      lastRowId,
      query,
      results,
      rowsRead,
      rowsWritten,
      sizeAfter,
      startTime,
    },

    publicDimensions: {
      changedDb,
      changes,
      duration,
      endTime,
      env,
      results,
      rowsRead,
      rowsWritten,
      sizeAfter,
      startTime,
    },
  };
}
