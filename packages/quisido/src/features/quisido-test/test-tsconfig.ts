import mapObjectToEntries from '../../utils/map-object-to-entries.js';
import type { PackageType } from '../../utils/package-type.js';
import { parse as parseJsonC } from 'jsonc-parser';
import readPackageFile from '../../utils/read-package-file.js';
import type { CompilerOptions } from './assert-compiler-options.js';
import assertTSConfig from './assert-tsconfig.js';

interface Options {
  readonly type: PackageType;
}

const EMPTY_ARR: readonly never[] = [];

const EXPECTED_COMPILER_OPTIONS: Record<PackageType, CompilerOptions> = {
  application: {
    declarationDir: '_site',
    outDir: '_site',
    tsBuildInfoFile: '.cache/tsconfig.tsbuildinfo',
  },
  library: {
    declarationDir: 'dist',
    outDir: 'dist',
    rootDir: '.',
    tsBuildInfoFile: '.cache/tsconfig.tsbuildinfo',
  },
  service: {
    declarationDir: 'dist',
    outDir: 'dist',
    rootDir: '.',
    tsBuildInfoFile: '.cache/tsconfig.tsbuildinfo',
  },
};

const EXPECTED_EXCLUDE: Record<PackageType, readonly string[]> = {
  application: ['.cache/', '.tests/', '_site/'],
  library: ['.cache/', '.tests/', 'dist/'],
  service: ['.cache/', '.tests/', 'dist/'],
};

export default async function testTsConfig({ type }: Options): Promise<void> {
  const tsConfigStr: string | null = await readPackageFile('tsconfig.json');

  if (tsConfigStr === null) {
    throw new Error('Expected package to contain a `tsconfig.json` file.');
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
        `Expected TypeScript \`${option}\` compiler option to be ${JSON.stringify(value)}.`,
        { cause: tsConfig },
      );
    }
  }

  // exclude
  const expectedExclude: readonly string[] = EXPECTED_EXCLUDE[type];

  for (const pattern of expectedExclude) {
    if (!exclude.includes(pattern)) {
      throw new Error(
        `Expected TypeScript configuration to exclude "${pattern}".`,
        { cause: tsConfig },
      );
    }
  }
}
