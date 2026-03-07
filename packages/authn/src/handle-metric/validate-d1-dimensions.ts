import type { MetricDimensions } from '@quisido/worker';

interface D1Dimensions {
  readonly changedDb: boolean;
  readonly changes: number;
  readonly duration: number;
  readonly endTime: number;
  readonly env: string;
  readonly lastRowId: number;
  readonly query: string;
  readonly rowsRead: number;
  readonly rowsWritten: number;
  readonly sizeAfter: number;
  readonly startTime: number;
  readonly [key: string]: boolean | number | string;
}

export default function validateD1Dimensions(
  dimensions: MetricDimensions,
): D1Dimensions | null {
  const {
    changedDb,
    changes,
    duration,
    endTime,
    env,
    lastRowId,
    query,
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
    typeof rowsRead !== 'number' ||
    typeof rowsWritten !== 'number' ||
    typeof sizeAfter !== 'number' ||
    typeof startTime !== 'number'
  ) {
    return null;
  }

  return {
    changedDb,
    changes,
    duration,
    endTime,
    env,
    lastRowId,
    query,
    rowsRead,
    rowsWritten,
    sizeAfter,
    startTime,
  };
}
