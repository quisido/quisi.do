import npx from '../npx/npx.js';

export default async function tsc(...args: readonly string[]): Promise<void> {
  const npxArgs: readonly string[] = ['tsc', ...args];
  const { stderr, stdout } = await npx(...npxArgs);

  // `tsc` emits errors via stdout.
  if (stderr !== '' || stdout !== '') {
    throw new Error(stdout + stderr, { cause: npxArgs.join(' ') });
  }
}
