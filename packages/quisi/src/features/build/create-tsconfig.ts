import { join } from 'node:path';
import createCompilerOptions from './create-compiler-options.js';

interface Options {
  readonly skipLibCheck?: boolean | undefined;
}

export default async function createTSConfig({
  skipLibCheck,
}: Options): Promise<Record<string, unknown>> {
  const cwd: string = process.cwd();

  return {
    compilerOptions: await createCompilerOptions({ skipLibCheck }),
    exclude: [
      join(cwd, 'src', '**', '*.test.ts'),
      join(cwd, 'src', '**', '*.test.tsx'),
      join(cwd, 'src', '*.test.ts'),
      join(cwd, 'src', '*.test.tsx'),
    ],
    extends: join(cwd, 'tsconfig.json'),
    include: [join(cwd, 'src')],
  };
}
