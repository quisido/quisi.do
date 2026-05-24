import execute, { type ExecutionResult } from '../../utils/execute.js';
import getDisposableTempDir from '../../utils/get-disposable-temp-dir.js';
import { NPX_COMMAND } from './npx-command.js';

interface Options {
  readonly env?: Partial<Record<string, string | undefined>> | undefined;
  readonly onStdErr?: ((data: string) => void) | undefined;
  readonly onStdOut?: ((data: string) => void) | undefined;
}

const mapEnvToNpmCacheEnv = async (
  env: Partial<Record<string, string | undefined>> = {},
): Promise<Partial<Record<string, string | undefined>>> => ({
  NPM_CONFIG_CACHE: await getDisposableTempDir(),
  ...env,
});

export default async function npx(
  options: Options,
  ...args: readonly string[]
): Promise<ExecutionResult>;
export default async function npx(
  ...args: readonly string[]
): Promise<ExecutionResult>;
export default async function npx(
  options: Options | string,
  ...args: readonly string[]
): Promise<ExecutionResult> {
  const [npxFile, ...npxArgs] = NPX_COMMAND;

  if (typeof options === 'string') {
    return await execute(npxFile, [...npxArgs, options, ...args], {
      env: await mapEnvToNpmCacheEnv(),
    });
  }

  const { env, onStdErr, onStdOut } = options;
  return await execute(npxFile, [...npxArgs, ...args], {
    env: await mapEnvToNpmCacheEnv(env),
    onStdErr,
    onStdOut,
  });
}
