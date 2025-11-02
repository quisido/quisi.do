import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import isString from '../../utils/is-string.js';
import isSpawnSyncReturns from './is-spawn-sync-returns.js';
import logCommand from './log-command.js';
import retry from './retry.js';

const ATTEMPTS = 3;
const { execPath: EXEC_PATH } = process;

const NPM_CLI_PATH: string = join(
  dirname(EXEC_PATH),
  'node_modules',
  'npm',
  'bin',
  'npm-cli.js',
);

const isActionableMessage = (message: string): boolean =>
  !message.startsWith('npm error A complete log of this run can be found in: ');

export default function npmExecWorkspace(
  workspaceDirectory: string,
  ...script: string[]
): string {
  logCommand(
    EXEC_PATH,
    NPM_CLI_PATH,
    ...script,
    `--workspace=packages/${workspaceDirectory}`,
  );

  try {
    return retry(ATTEMPTS, (): string =>
      execFileSync(
        EXEC_PATH,
        [NPM_CLI_PATH, ...script, `--workspace=packages/${workspaceDirectory}`],
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
