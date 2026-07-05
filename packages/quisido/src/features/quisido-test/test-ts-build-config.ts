import mapObjectToEntries from '../../utils/map-object-to-entries.js';
import type { PackageType } from '../../utils/package-type.js';
import parseJson from '../../utils/parse-json.js';
import readPackageFile from '../../utils/read-package-file.js';
import type { CompilerOptions } from './assert-compiler-options.js';
import assertTSConfig from './assert-tsconfig.js';

interface Options {
  readonly type: PackageType;
}

const EMPTY_ARR: readonly never[] = [];

const EXPECTED_COMPILER_OPTIONS: Pick<CompilerOptions, 'tsBuildInfoFile'> = {
  tsBuildInfoFile: '.cache/tsconfig.build.tsbuildinfo',
};

const EXPECTED_APPLICATION_COMPILER_OPTIONS: CompilerOptions =
  EXPECTED_COMPILER_OPTIONS;

const EXPECTED_LIBRARY_COMPILER_OPTIONS: CompilerOptions = {
  ...EXPECTED_COMPILER_OPTIONS,
  declarationDir: 'dist',
  noEmit: false,
  outDir: 'dist',
  rootDir: 'src',
};

const EXPECTED_EXCLUDE = {
  'src/**/*.test.ts': 'test files',
  'src/**/*.test.tsx': 'React test files',
  'src/*.test.ts': 'test files',
  'src/*.test.tsx': 'React test files',
};

export default async function testTsBuildConfig({
  type,
}: Options): Promise<void> {
  const tsConfigStr: string | null = await readPackageFile(
    'tsconfig.build.json',
  );

  if (tsConfigStr === null) {
    throw new Error(
      'Expected package to contain a `tsconfig.build.json` file.',
    );
  }

  const tsConfig: unknown = parseJson(tsConfigStr);
  assertTSConfig(tsConfig);

  const { compilerOptions, exclude = EMPTY_ARR } = tsConfig;

  // compilerOptions
  const expectedCompilerOptions: CompilerOptions =
    type === 'application'
      ? EXPECTED_APPLICATION_COMPILER_OPTIONS
      : EXPECTED_LIBRARY_COMPILER_OPTIONS;
  for (const [option, value] of mapObjectToEntries(expectedCompilerOptions)) {
    if (compilerOptions[option] !== value) {
      throw new Error(
        `Expected TypeScript build \`${option}\` compiler option to be ${JSON.stringify(value)}.`,
        { cause: tsConfig },
      );
    }
  }

  // exclude
  for (const [pattern, description] of Object.entries(EXPECTED_EXCLUDE)) {
    if (!exclude.includes(pattern)) {
      throw new Error(
        `Expected TypeScript build configuration to exclude ${description} (${pattern}).`,
        { cause: tsConfig },
      );
    }
  }
}
