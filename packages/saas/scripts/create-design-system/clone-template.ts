/// <reference types="bun-types" />

export default async function cloneTemplate(slug: string): Promise<void> {
  const cp: Bun.Subprocess = Bun.spawn(
    [
      'cp',
      '--no-clobber',
      '--one-file-system',
      '--preserve',
      '--recursive',
      './src/design-systems/template/.',
      `./src/design-systems/${slug}/`,
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
}
