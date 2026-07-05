import mapObjectToEntries from '../../utils/map-object-to-entries.js';
import type { PackageType } from '../../utils/package-type.js';
import parseJson from '../../utils/parse-json.js';
import readPackageFile from '../../utils/read-package-file.js';
import type { CompilerOptions } from './assert-compiler-options.js';
import assertTSConfig from './assert-tsconfig.js';

interface Options {
  readonly jsx: boolean;
  readonly type: PackageType;
}

const EMPTY_ARR: readonly never[] = [];

const EXPECTED_COMPILER_OPTIONS: Pick<CompilerOptions, 'tsBuildInfoFile'> = {
  tsBuildInfoFile: '.cache/tsconfig.tsbuildinfo',
};

const EXPECTED_APPLICATION_COMPILER_OPTIONS: CompilerOptions = {
  ...EXPECTED_COMPILER_OPTIONS,
  declarationDir: '_site',
  noEmit: true,
  outDir: '_site',
};

const EXPECTED_LIBRARY_COMPILER_OPTIONS: CompilerOptions = {
  ...EXPECTED_COMPILER_OPTIONS,
  declarationDir: 'dist',
  outDir: 'dist',
  rootDir: 'src',
};

const EXPECTED_PACKAGE_EXCLUDE: Record<string, string> = {
  'src/**/*.test.ts': 'test files',
  'src/*.test.ts': 'test files',
};

const EXPECTED_REACT_EXCLUDE: Record<string, string> = {
  'src/**/*.test.tsx': 'React test files',
  'src/*.test.tsx': 'React test files',
};

export default async function testTsConfig({
  jsx,
  type,
}: Options): Promise<void> {
  const tsConfigStr: string | null = await readPackageFile('tsconfig.json');

  if (tsConfigStr === null) {
    throw new Error('Expected package to contain a `tsconfig.json` file.');
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
        `Expected TypeScript \`${option}\` compiler option to be ${JSON.stringify(value)}.`,
        { cause: tsConfig },
      );
    }
  }

  // exclude
  const expectedExclude: Record<string, string> = {
    ...EXPECTED_PACKAGE_EXCLUDE,
  };

  if (jsx) {
    Object.assign(expectedExclude, EXPECTED_REACT_EXCLUDE);
  }

  for (const [pattern, description] of Object.entries(expectedExclude)) {
    if (!exclude.includes(pattern)) {
      throw new Error(
        `Expected TypeScript configuration to exclude ${description} (${pattern}).`,
        { cause: tsConfig },
      );
    }
  }
}
