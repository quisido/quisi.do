import { execFileSync } from 'node:child_process';
import isString from '../../utils/is-string.js';
import getNpmCommand from './get-npm-command.js';
import isSpawnSyncReturns from './is-spawn-sync-returns.js';
import logCommand from './log-command.js';
import retry from './retry.js';

const ATTEMPTS = 3;
const [FILE, ...ARGS] = getNpmCommand();

const isActionableMessage = (message: string): boolean =>
  !message.startsWith('npm error A complete log of this run can be found in: ');

export default function npmExecWorkspace(
  workspaceDirectory: string,
  ...script: string[]
): string {
  logCommand(
    FILE,
    ...ARGS,
    ...script,
    `--workspace=packages/${workspaceDirectory}`,
  );

  try {
    return retry(ATTEMPTS, (): string =>
      execFileSync(
        FILE,
        [...ARGS, ...script, `--workspace=packages/${workspaceDirectory}`],
        { encoding: 'utf-8', shell: false, stdio: 'pipe' },
      ),
    );
  } catch (err: unknown) {
    if (!isSpawnSyncReturns(err)) {
      throw err;
    }

    if (!Array.isArray(err.stderr) || !err.stderr.every(isString)) {
      throw err.error ?? err;
    }

    const lastActionableMessage: string | undefined = err.stderr
      .filter(isActionableMessage)
      .pop();

    if (typeof lastActionableMessage === 'undefined') {
      throw err.error ?? err;
    }

    throw new Error(lastActionableMessage, { cause: err });
  }
}
