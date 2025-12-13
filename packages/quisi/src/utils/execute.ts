import {
  type ChildProcess,
  execFile,
  type ExecFileException,
} from 'node:child_process';
import { EOL } from 'node:os';
import hasToStringMethod from './has-to-string-method.js';

export interface ExecutionResult {
  readonly stderr: string;
  readonly stdout: string;
}

interface Options {
  readonly onStdErr?: undefined | ((data: string) => void);
  readonly onStdOut?: undefined | ((data: string) => void);
}

export default function execute(
  command: string,
  args: readonly string[],
  { onStdErr, onStdOut }: Options = {},
): Promise<ExecutionResult> {
  return new Promise<ExecutionResult>((resolve): void => {
    const childProcess: ChildProcess = execFile(
      command,
      args,
      { cwd: process.cwd(), encoding: 'utf-8', shell: false },
      (err: ExecFileException | null, stdout: string, stderr: string): void => {
        if (err === null) {
          resolve({ stderr, stdout });
          return;
        }

        resolve({ stderr: `${stderr}${EOL}${err.message}`, stdout });
      },
    );

    if (typeof onStdOut !== 'undefined' && childProcess.stdout !== null) {
      childProcess.stdout.on('data', (chunk: unknown): void => {
        if (!hasToStringMethod(chunk)) {
          return;
        }

        const str: unknown = chunk.toString();
        if (typeof str !== 'string') {
          return;
        }
        onStdOut(str);
      });
    }

    if (typeof onStdErr !== 'undefined' && childProcess.stderr !== null) {
      childProcess.stderr.on('data', (chunk: unknown) => {
        if (!hasToStringMethod(chunk)) {
          return;
        }

        const str: unknown = chunk.toString();
        if (typeof str !== 'string') {
          return;
        }
        onStdErr(str);
      });
    }
  });
}
