/* eslint-disable no-console */
import isSpawnSyncReturns from './is-spawn-sync-returns.js';
import mapSpawnSyncReturnsToErrorMessage from './map-spawn-sync-returns-to-error-message.js';

export default function handleNpmExecWorkspaceError(
  err: unknown,
  script: readonly string[],
): never {
  if (isSpawnSyncReturns(err)) {
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

  if (err instanceof Error) {
    // `ExecException` is an error with additional properties.
    if ('stdout' in err) {
      console.log(err.stdout);
    }
    if ('stderr' in err) {
      console.error(err.stderr);
    }
    throw err;
  }

  console.log(
    `NPM workspace command "${script.join(' ')}" failed with an unknown error.`,
  );
  throw new Error(JSON.stringify(err));
}
