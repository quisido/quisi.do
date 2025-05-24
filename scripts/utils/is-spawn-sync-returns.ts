import type { SpawnSyncReturns } from 'node:child_process';

const isStatus = (value: unknown): value is number | null =>
  value === null || typeof value === 'number';

export default function isSpawnSyncReturns(
  result: unknown,
): result is SpawnSyncReturns<unknown> {
  return (
    typeof result === 'object' &&
    result !== null &&
    (!('error' in result) ||
      typeof result.error === 'undefined' ||
      result.error instanceof Error) &&
    'output' in result &&
    Array.isArray(result.output) &&
    'status' in result &&
    isStatus(result.status) &&
    'stderr' in result &&
    'stdout' in result
  );
}
