import npx from '../npx/npx.js';
import { STATIC_TSC_OPTIONS } from './static-tsc-options.js';

export default async function tsc(...args: readonly string[]): Promise<void> {
  const npxArgs: readonly string[] = ['tsc', ...STATIC_TSC_OPTIONS, ...args];
  const { stderr, stdout } = await npx(...npxArgs);

  // `tsc` emits errors via stdout.
  if (stderr !== '' || stdout !== '') {
    throw new Error(stdout + stderr, { cause: npxArgs.join(' ') });
  }
}
