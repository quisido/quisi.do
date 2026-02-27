import {
  type ChildProcess,
  type Serializable,
  spawn,
} from 'node:child_process';
import getScriptCommand from './get-script-command.js';
import handleNpmExecWorkspaceError from './handle-npm-exec-workspace-error.js';
import logCommand from './log-command.js';

const [FILE, ...ARGS] = getScriptCommand();

const spawnAsync = async (
  command: string,
  args: readonly string[],
): Promise<string> => {
  const childProcess: ChildProcess = spawn(command, args, {
    shell: false,
    stdio: ['inherit', 'pipe', 'pipe'],
    timeout: 300000, // 5 minutes
  });

  const { stderr, stdout } = childProcess;
  if (stderr === null) {
    throw new Error(
      `Expected child process to have an error stream for ${command} ${args.join(' ')}.`,
    );
  }

  if (stdout === null) {
    throw new Error(
      `Expected child process to have an output stream for ${command} ${args.join(' ')}.`,
    );
  }

  const stderrChunks: string[] = [];
  const stdoutChunks: string[] = [];

  stderr.on('data', (chunk: Serializable): void => {
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    globalThis.console.error(chunk.toString());
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    stderrChunks.push(chunk.toString());
  });

  stdout.on('data', (chunk: Serializable): void => {
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    globalThis.console.log(chunk.toString());
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    stdoutChunks.push(chunk.toString());
  });

  return new Promise((resolve, reject): void => {
    childProcess.on('exit', (code: number | null) => {
      if (code === 0) {
        resolve(stdoutChunks.join(''));
      } else {
        reject(
          new Error(
            `Command "${command} ${args.join(' ')}" failed (exit code ${code}):
${stderrChunks.join('')}`,
          ),
        );
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
