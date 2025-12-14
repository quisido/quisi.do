import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import getDisposableTempDir from '../../utils/get-disposable-temp-dir.js';
import type { Config } from '../config/config.js';
import tsc from '../tsc/tsc.js';

export default async function build({
  skipLibCheck = false,
}: Config): Promise<void> {
  const tempDir: string = await getDisposableTempDir();

  const cwd: string = process.cwd();
  const tsconfigPath: string = join(tempDir, 'tsconfig.build.json');
  await writeFile(
    tsconfigPath,
    JSON.stringify({
      compilerOptions: {
        declarationDir: join(cwd, 'dist'),
        noEmit: false,
        outDir: join(cwd, 'dist'),
        rootDir: join(cwd, 'src'),
        skipLibCheck,
        tsBuildInfoFile: join(cwd, '.cache', 'tsconfig.build.tsbuildinfo'),
      },
      exclude: ['*.test.ts', '*.test.tsx'],
      extends: join(cwd, 'tsconfig.json'),
      include: [join(cwd, 'src')],
    }),
    { encoding: 'utf8' },
  );

  await tsc('--project', tsconfigPath);
}
