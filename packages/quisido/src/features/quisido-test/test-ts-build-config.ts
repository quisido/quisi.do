import mapObjectToEntries from '../../utils/map-object-to-entries.js';
import type { PackageType } from '../../utils/package-type.js';
import parseJsonC from '../../utils/parse-jsonc.js';
import readPackageFile from '../../utils/read-package-file.js';
import type { CompilerOptions } from './assert-compiler-options.js';
import assertTSConfig from './assert-tsconfig.js';

interface Options {
  readonly jsx: boolean;
  readonly type: PackageType;
}

const EMPTY_ARR: readonly never[] = [];

const EXPECTED_COMPILER_OPTIONS: Record<PackageType, CompilerOptions> = {
  application: {
    tsBuildInfoFile: '.cache/tsconfig.build.tsbuildinfo',
  },
  library: {
    noEmit: false,
    rootDir: 'src',
    tsBuildInfoFile: '.cache/tsconfig.build.tsbuildinfo',
  },
  service: {
    rootDir: 'src',
    tsBuildInfoFile: '.cache/tsconfig.build.tsbuildinfo',
  },
};

const EXPECTED_JSX_EXCLUDE: Record<string, string> = {
  'src/**/*.test.tsx': 'React test files',
  'src/*.test.tsx': 'React test files',
};

const EXPECTED_PACKAGE_EXCLUDE: Record<string, string> = {
  'src/**/*.test.ts': 'test files',
  'src/*.test.ts': 'test files',
};

export default async function testTsBuildConfig({
  jsx,
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

  const tsConfig: unknown = parseJsonC(tsConfigStr);
  assertTSConfig(tsConfig);

  const { compilerOptions, exclude = EMPTY_ARR } = tsConfig;

  // compilerOptions
  const expectedCompilerOptions: CompilerOptions =
    EXPECTED_COMPILER_OPTIONS[type];

  for (const [option, value] of mapObjectToEntries(expectedCompilerOptions)) {
    if (compilerOptions[option] !== value) {
      throw new Error(
        `Expected TypeScript build \`${option}\` compiler option to be ${JSON.stringify(value)}.`,
        { cause: tsConfig },
      );
    }
  }

  // exclude
  const expectedExclude: Record<string, string> = {
    ...EXPECTED_PACKAGE_EXCLUDE,
  };

  if (jsx) {
    Object.assign(expectedExclude, EXPECTED_JSX_EXCLUDE);
  }

  for (const [pattern, description] of Object.entries(expectedExclude)) {
    if (!exclude.includes(pattern)) {
      throw new Error(
        `Expected TypeScript build configuration to exclude ${description} (${pattern}).`,
        { cause: tsConfig },
      );
    }
  }
}
