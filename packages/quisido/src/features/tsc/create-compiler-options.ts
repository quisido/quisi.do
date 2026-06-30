import { join } from 'node:path';
import type { server } from 'typescript';
import createJsx from './create-jsx.js';

interface Options {
  readonly hash: string;
  readonly rootDir: string;
}

export default async function createCompilerOptions({
  hash,
  rootDir,
}: Options): Promise<server.protocol.CompilerOptions> {
  const compilerOptions: server.protocol.CompilerOptions = {
    declarationDir: join(rootDir, 'dist'),
    generateCpuProfile: join(rootDir, '.cache', `quisido-tsc-${hash}.cpuprofile`),
    noEmit: false,
    outDir: join(rootDir, 'dist'),
    rootDir: join(rootDir, 'src'),
    skipLibCheck: true,
    tsBuildInfoFile: join(rootDir, '.cache', `quisido-${hash}.tsbuildinfo`),
  };

  const jsx: server.protocol.JsxEmit | undefined = await createJsx();
  if (typeof jsx !== 'undefined') {
    compilerOptions.jsx = jsx;
  }

  return compilerOptions;
}
