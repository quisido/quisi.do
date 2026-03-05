import npx from '../npx/npx.js';

export default async function tsc(...args: readonly string[]): Promise<void> {
  const npxArgs: readonly string[] = ['tsc', ...args];
  const { stdout } = await npx(...npxArgs);

  /**
   *  `tsc` emits errors via stdout.
   *   VS Code pollutes `stderr` with "Debugger attached." and "Waiting for the
   * debugger to disconnect..." when using Run & Debug mode, so we cannot rely
   * on `stderr` for messaging [not that it was used by `tsc` anyway].
   */
  if (stdout !== '') {
    throw new Error(stdout, {
      cause: npxArgs.join(' '),
    });
  }
}
