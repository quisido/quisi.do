import { join } from 'node:path';
import type { server } from 'typescript';
import createJsx from './create-jsx.js';

interface Options {
  readonly skipLibCheck?: boolean | undefined;
}

export default async function createCompilerOptions({
  skipLibCheck = false,
}: Options): Promise<server.protocol.CompilerOptions> {
  const cwd: string = process.cwd();

  const compilerOptions: server.protocol.CompilerOptions = {
    declarationDir: join(cwd, 'dist'),
    generateCpuProfile: join(cwd, '.cache', 'quisi-start.cpuprofile'),
    noEmit: false,
    outDir: join(cwd, 'dist'),
    /**
     *   While the `rootDir` for development and testing is `/` to include all
     * files, the `rootDir` for the development server is `src` so that only
     * source files are emitted.
     */
    rootDir: join(cwd, 'src'),
    skipLibCheck,
    tsBuildInfoFile: join(cwd, '.cache', 'quisi-start.tsbuildinfo'),
  };

  const jsx: server.protocol.JsxEmit | undefined = await createJsx();
  if (typeof jsx !== 'undefined') {
    compilerOptions.jsx = jsx;
  }

  return compilerOptions;
}
