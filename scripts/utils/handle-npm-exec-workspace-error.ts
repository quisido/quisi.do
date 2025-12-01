/* eslint-disable no-console */
import isSpawnSyncReturns from './is-spawn-sync-returns.js';
import mapSpawnSyncReturnsToErrorMessage from './map-spawn-sync-returns-to-error-message.js';

export default function handleNpmExecWorkspaceError(
  err: unknown,
  script: readonly string[],
): never {
  if (!isSpawnSyncReturns(err)) {
    console.info(
      `NPM workspace command "${script.join(' ')}" failed with a non-SpawnSyncReturns error.`,
    );
    throw err;
  }

  console.info(...err.output);
  const message: string = mapSpawnSyncReturnsToErrorMessage(err);
  throw new Error(message, {
    cause: {
      ...err,
      output: undefined,
      stderr: undefined,
      stdout: undefined,
    },
  });
}
