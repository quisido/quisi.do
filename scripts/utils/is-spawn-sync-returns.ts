import type { SpawnSyncReturns } from 'node:child_process';

const isOutput = (value: unknown): value is readonly unknown[] | null =>
  value === null || Array.isArray(value);

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
    isOutput(result.output) &&
    'status' in result &&
    isStatus(result.status) &&
    'stderr' in result &&
    'stdout' in result
  );
}
