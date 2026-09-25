/// <reference types="bun-types" />
import { type Subprocess } from 'bun';
import { join } from 'node:path';

interface Options {
  readonly dir: string;
  readonly slug: string;
}

export default async function cloneTemplate({
  dir,
  slug,
}: Options): Promise<string> {
  const newDir: string = join(dir, slug);

  const cp: Subprocess = Bun.spawn(
    [
      'cp',
      '--no-clobber',
      '--one-file-system',
      '--preserve',
      '--recursive',
      `${join(dir, 'template')}/.`,
      newDir,
    ],
    {
      stderr: 'inherit',
      stdin: 'inherit',
      stdout: 'inherit',
    },
  );

  const exitCode: number = await cp.exited;
  if (exitCode !== 0) {
    throw new Error('Failed to clone the design system template.', {
      cause: exitCode,
    });
  }

  return newDir;
}
