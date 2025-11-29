import { isString } from 'fmrs';
import type { SpawnSyncReturns } from 'node:child_process';

const EMPTY = 0;

const isActionableMessage = (message: string): boolean =>
  !message.startsWith('npm error A complete log of this run can be found in: ');

export default function mapSpawnSyncReturnsToErrorMessage(
  ret: SpawnSyncReturns<unknown>,
): string {
  const { error, stderr } = ret;
  if (typeof stderr === 'string') {
    return stderr;
  }

  if (Array.isArray(stderr) && stderr.every(isString)) {
    const lastActionableMessage: string | undefined = stderr
      .filter(isActionableMessage)
      .pop();
    if (typeof lastActionableMessage !== 'undefined') {
      return lastActionableMessage;
    }

    if (stderr.length === EMPTY) {
      return error?.message ?? 'An unknown error occurred.';
    }

    return stderr.join('\n');
  }

  return error?.message ?? 'An unknown error occurred.';
}
