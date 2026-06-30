import { join } from 'node:path';
import type TSConfig from '../../types/tsconfig.js';
import createCompilerOptions from './create-compiler-options.js';
import createReferences from './create-references.js';

interface Options {
  readonly cwd: string;
  readonly id: string;
}

export default async function createTSConfig({
  cwd,
  id,
}: Options): Promise<TSConfig> {
  return {
    compilerOptions: await createCompilerOptions({ cwd, id }),
    exclude: [
      join(cwd, 'src', '**', '*.test.ts'),
      join(cwd, 'src', '**', '*.test.tsx'),
      join(cwd, 'src', '*.test.ts'),
      join(cwd, 'src', '*.test.tsx'),
    ],
    extends: join(cwd, 'tsconfig.json'),
    include: [join(cwd, 'src')],
    references: await createReferences({ cwd, id }),
  };
}
