import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import getDisposableTempDir from '../../utils/get-disposable-temp-dir.js';
import getPackageJson from '../../utils/get-package-json.js';
import type { Config } from '../config/config.js';
import tsc from '../tsc/tsc.js';
import createJsx from './create-jsx.js';

export default async function build({ skipLibCheck }: Config): Promise<void> {
  const tempDir: string = await getDisposableTempDir();

  const cwd: string = process.cwd();
  const { dependencies, devDependencies } = await getPackageJson();
  const tsconfigPath: string = join(tempDir, 'tsconfig.build.json');
  await writeFile(
    tsconfigPath,
    JSON.stringify({
      compilerOptions: {
        declarationDir: join(cwd, 'dist'),
        generateCpuProfile: join(cwd, '.cache', 'quisi-build.cpuprofile'),
        jsx: createJsx({ dependencies, devDependencies }),
        noEmit: false,
        outDir: join(cwd, 'dist'),
        rootDir: join(cwd, 'src'),
        skipLibCheck,
        tsBuildInfoFile: join(cwd, '.cache', 'quisi-build.tsbuildinfo'),
      },
      exclude: [
        join(cwd, 'src', '**', '*.test.ts'),
        join(cwd, 'src', '**', '*.test.tsx'),
        join(cwd, 'src', '*.test.ts'),
        join(cwd, 'src', '*.test.tsx'),
      ],
      extends: join(cwd, 'tsconfig.json'),
      include: [join(cwd, 'src')],
    }),
    { encoding: 'utf8' },
  );

  await tsc('--project', tsconfigPath);
}
