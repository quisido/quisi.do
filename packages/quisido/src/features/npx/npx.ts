import execute, { type ExecutionResult } from '../../utils/execute.js';
import { NPX_COMMAND } from './npx-command.js';

interface Options {
  readonly env?: Partial<Record<string, string | undefined>> | undefined;
}
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
    return await execute(npxFile, [...npxArgs, options, ...args]);
  }

  const { env } = options;
  return await execute(npxFile, [...npxArgs, ...args], { env });
}
