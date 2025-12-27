import execute, { type ExecutionResult } from '../../utils/execute.js';
import { NPX_COMMAND } from './npx-command.js';

export default async function npx(
  ...args: readonly string[]
): Promise<ExecutionResult> {
  const [npxFile, ...npxArgs] = NPX_COMMAND;
  return await execute(npxFile, [...npxArgs, ...args]);
}
