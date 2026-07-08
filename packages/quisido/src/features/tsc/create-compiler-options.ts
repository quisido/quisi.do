import { join } from 'node:path';
import type { CompilerOptions } from 'typescript/unstable/proto';
import createJsx from './create-jsx.js';

interface Options {
  readonly rootDir: string;
}

export default async function createCompilerOptions({
  rootDir,
}: Options): Promise<CompilerOptions> {
  const compilerOptions: CompilerOptions = {
    declarationDir: join(rootDir, 'dist'),
    noEmit: false,
    outDir: join(rootDir, 'dist'),
    rootDir: join(rootDir, 'src'),
    skipLibCheck: true,
    tsBuildInfoFile: join(rootDir, '.cache', `quisido.tsbuildinfo`),
  };

  const jsx: CompilerOptions['jsx'] = await createJsx();
  if (typeof jsx !== 'undefined') {
    compilerOptions.jsx = jsx;
  }

  return compilerOptions;
}
