import { isRecord, mapToString } from 'fmrs';
import assert from 'node:assert';
import { spawn, type ChildProcessWithoutNullStreams } from 'node:child_process';
import { readFile } from 'node:fs/promises';

const pkgBuffer: Buffer = await readFile('./package.json');
const pkgStr: string = pkgBuffer.toString();
const pkg: unknown = JSON.parse(pkgStr);

const [, , ...scripts] = process.argv;

if (!isRecord(pkg)) {
  throw new Error('Expected `package.json` to be a record.');
}

const { dependencies = {}, devDependencies = {} } = pkg;
if (!isRecord(dependencies)) {
  throw new Error('Expected `dependencies` to be a record.');
}

if (!isRecord(devDependencies)) {
  throw new Error('Expected `devDependencies` to be a record.');
}

const { QUISIDO_DEV_DEPENDENCIES = '' } = process.env;
const runningWorkspaceDependencies: readonly string[] =
  QUISIDO_DEV_DEPENDENCIES.split('|');
const workspaceDependencies: string[] = [];
for (const [name, version] of Object.entries(dependencies)) {
  if (version !== 'workspace:^') {
    continue;
  }

  if (runningWorkspaceDependencies.includes(name)) {
    continue;
  }

  workspaceDependencies.push(name);
}

const handleErr = (chunk: unknown): void => {
  const chunkStr: string = mapToString(chunk);
  console.error(chunkStr);
};

const handleOut = (chunk: unknown): void => {
  const chunkStr: string = mapToString(chunk);
  console.log(chunkStr);
};

const mapCodeToString = (code: null | number): string => {
  if (code === null) {
    return '0';
  }

  return code.toString();
};

const CWD: string = process.cwd();
const spawnChild = (command: string): ChildProcessWithoutNullStreams => {
  const [argv0, ...args] = command.split(' ');
  assert(typeof argv0 === 'string');
  return spawn(argv0, args, {
    cwd: CWD,
    detached: false,
    serialization: 'json',
    shell: true,
    stdio: 'pipe',
    windowsHide: true,

    env: {
      ...process.env,
      QUISIDO_DEV_DEPENDENCIES: [
        ...runningWorkspaceDependencies,
        ...workspaceDependencies,
      ].join('|'),
    },
  });
};

const SUCCESS_CODE = 0;
class ChildPromise extends Promise<void> {
  public constructor(command: (() => void) | string) {
    if (typeof command === 'function') {
      super(command);
      return;
    }

    const child: ChildProcessWithoutNullStreams = spawnChild(command);
    child.addListener('error', handleErr);
    child.stderr.addListener('data', handleErr);
    child.stdout.addListener('data', handleOut);

    const handleExit = (code: number): void => {
      child.kill(code);
    };
    process.addListener('exit', handleExit);

    super((resolve, reject): void => {
      const handleClose = (
        code: number | null,
        signal: NodeJS.Signals | null,
      ): void => {
        process.removeListener('exit', handleExit);

        if (code === SUCCESS_CODE) {
          resolve();
          return;
        }

        if (signal !== null) {
          reject(
            new Error(`Command "${command}" exited with signal ${signal}.`),
          );
          process.exit(code);
        }

        const codeStr: string = mapCodeToString(code);
        reject(new Error(`Command "${command}" exited with code ${codeStr}.`));
        process.exit(code);
      };

      child.addListener('close', handleClose);
    });
  }
}

const mapScriptToProcess = (script: string): Promise<void> => {
  const command = `npm run ${script}`;
  return new ChildPromise(command);
};

const mapWorkspaceDependencyToProcess = (dependency: string): Promise<void> => {
  const command = `npm run dev --workspace=packages/${dependency}`;
  return new ChildPromise(command);
};

await Promise.all([
  ...workspaceDependencies.map(mapWorkspaceDependencyToProcess),
  ...scripts.map(mapScriptToProcess),
]);
