import { join } from 'node:path';
import type { CompilerOptions } from '../../types/tsconfig.js';
import createJsx from './create-jsx.js';

interface Options {
  readonly rootDir: string;
}

export default async function createCompilerOptions({
  rootDir,
}: Options): Promise<CompilerOptions> {
  return {
    declarationDir: join(rootDir, 'dist'),
    jsx: await createJsx(),
    noEmit: false,
    outDir: join(rootDir, 'dist'),
    rootDir: join(rootDir, 'src'),
    skipLibCheck: true,
    tsBuildInfoFile: join(rootDir, '.cache', `quisido.tsbuildinfo`),
  };
}
