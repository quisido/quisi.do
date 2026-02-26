import {
  type ChildProcess,
  type Serializable,
  spawn,
} from 'node:child_process';
import getNpmCommand from './get-npm-command.js';
import handleNpmExecWorkspaceError from './handle-npm-exec-workspace-error.js';
import logCommand from './log-command.js';

const [FILE, ...ARGS] = getNpmCommand();

const spawnAsync = async (
  command: string,
  args: readonly string[],
): Promise<string> => {
  const childProcess: ChildProcess = spawn(command, args, {
    shell: false,
    stdio: ['inherit', 'pipe', 'pipe'],
  });

  return new Promise((resolve, reject): void => {
    const messages: string[] = [];

    childProcess.on('message', (message: Serializable): void => {
      globalThis.console.log(message);
      // eslint-disable-next-line @typescript-eslint/no-base-to-string
      messages.push(message.toString());
    });

    childProcess.on('exit', (code: number | null) => {
      if (code === 0) {
        resolve(messages.join('\n'));
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });
  });
};

export default async function npmExecWorkspace(
  workspaceDirectory: string,
  ...script: string[]
): Promise<string> {
  logCommand('npm', ...script, `--workspace=packages/${workspaceDirectory}`);

  try {
    return await spawnAsync(FILE, [
      ...ARGS,
      ...script,
      `--workspace=packages/${workspaceDirectory}`,
    ]);
  } catch (err: unknown) {
    return handleNpmExecWorkspaceError(err, script);
  }
}
