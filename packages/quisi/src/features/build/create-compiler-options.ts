import { join } from 'node:path';
import type { CompilerOptions, JsxEmit } from 'typescript';
import createJsx from './create-jsx.js';

interface Options {
  readonly skipLibCheck?: boolean | undefined;
}

export default async function createCompilerOptions({
  skipLibCheck = false,
}: Options): Promise<CompilerOptions> {
  const cwd: string = process.cwd();

  const compilerOptions: CompilerOptions = {
    declarationDir: join(cwd, 'dist'),
    generateCpuProfile: join(cwd, '.cache', 'quisi-build.cpuprofile'),
    noEmit: false,
    outDir: join(cwd, 'dist'),
    rootDir: join(cwd, 'src'),
    skipLibCheck,
    tsBuildInfoFile: join(cwd, '.cache', 'quisi-build.tsbuildinfo'),
  };

  const jsx: JsxEmit | undefined = await createJsx();
  if (typeof jsx !== 'undefined') {
    compilerOptions.jsx = jsx;
  }

  return compilerOptions;
}
