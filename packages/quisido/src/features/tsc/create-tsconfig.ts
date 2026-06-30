import { dirname, join } from 'node:path';
import type TSConfig from '../../types/tsconfig.js';
import createCompilerOptions from './create-compiler-options.js';
import createReferences from './create-references.js';

interface Options {
  readonly extends: string;
  readonly id: string;
}

export default async function createTSConfig({
  extends: extendsPath,
  id,
}: Options): Promise<TSConfig> {
  const hash: string = Buffer.from(extendsPath).toString('base64url');
  const rootDir: string = extendsPath.endsWith('.json') ? dirname(extendsPath) : extendsPath;
  const tsConfigPath: string = extendsPath.endsWith('.json') ? extendsPath : join(extendsPath, 'tsconfig.json');
  return {
    compilerOptions: await createCompilerOptions({ hash: `${hash}-${id}`, rootDir }),
    exclude: [
      join(rootDir, 'src', '**', '*.test.ts'),
      join(rootDir, 'src', '**', '*.test.tsx'),
      join(rootDir, 'src', '*.test.ts'),
      join(rootDir, 'src', '*.test.tsx'),
    ],
    extends: tsConfigPath,
    include: [join(rootDir, 'src')],
    references: await createReferences({ id, rootDir, tsConfigPath }),
  };
}
