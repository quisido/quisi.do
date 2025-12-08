import execute, { type ExecutionResult } from '../../utils/execute.js';

interface Options {
  readonly configFilePath: string;
  readonly npxCommand: readonly [string, ...(readonly string[])];
  readonly tempDir: string;
}

export default async function transpileConfig({
  configFilePath,
  npxCommand: [npxFile, ...npxArgs],
  tempDir,
}: Options): Promise<ExecutionResult> {
  return await execute(npxFile, [
    ...npxArgs,
    'tsc',
    '--lib',
    'esnext',
    '--outDir',
    tempDir,
    '--skipLibCheck',
    configFilePath,
  ]);
}
