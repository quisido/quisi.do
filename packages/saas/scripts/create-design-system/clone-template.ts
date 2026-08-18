/// <reference types="bun-types" />
import { type Subprocess } from 'bun';

interface Options {
  readonly dir: string;
  readonly slug: string;
}

export default async function cloneTemplate({
  dir,
  slug,
}: Options): Promise<string> {
  const newDir: string = await Bun.resolve(slug, dir);

  const cp: Subprocess = Bun.spawn(
    [
      'cp',
      '--no-clobber',
      '--one-file-system',
      '--preserve',
      '--recursive',
      await Bun.resolve('template/.', dir),
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
