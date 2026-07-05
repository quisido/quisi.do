import { dirname, join } from 'node:path';
import type TSConfig from '../../types/tsconfig.js';
import createCompilerOptions from './create-compiler-options.js';
import createReferences from './create-references.js';

interface Options {
  readonly consumers: readonly string[];
  readonly extends: string;
  readonly id: string;
}

interface ImplOptions {
  readonly consumers: readonly string[];
  readonly id: string;
  readonly rootDir: string;
  readonly tsConfigPath: string;
}

const createTSConfigWithPaths = async ({
  consumers,
  id,
  rootDir,
  tsConfigPath,
}: ImplOptions): Promise<TSConfig> => {
  const [compilerOptions, references] = await Promise.all([
    createCompilerOptions({ rootDir }),
    createReferences({ consumers, id, rootDir, tsConfigPath }),
  ]);
  return {
    compilerOptions,
    exclude: [
      join(rootDir, 'src', '**', '*.test.ts'),
      join(rootDir, 'src', '**', '*.test.tsx'),
      join(rootDir, 'src', '*.test.ts'),
      join(rootDir, 'src', '*.test.tsx'),
    ],
    extends: tsConfigPath,
    include: [join(rootDir, 'src')],
    references,
  };
};

export default function createTSConfig({
  extends: extendsPath,
  ...options
}: Options): Promise<TSConfig> {
  /**
   * If we are extending a `.json` file, treat it as the config path and set the
   * root directory to it's directory.
   */
  if (extendsPath.endsWith('.json')) {
    return createTSConfigWithPaths({
      ...options,
      rootDir: dirname(extendsPath),
      tsConfigPath: extendsPath,
    });
  }

  /**
   * If we are extending a module, treat it as the root directory and its
   * `tsconfig.json` export as the TSConfig path.
   */
  return createTSConfigWithPaths({
    ...options,
    rootDir: extendsPath,
    tsConfigPath: join(extendsPath, 'tsconfig.json'),
  });
}
