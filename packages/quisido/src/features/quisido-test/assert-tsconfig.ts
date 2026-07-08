import assertCompilerOptions, {
  type CompilerOptions,
} from './assert-compiler-options.js';

export interface TSConfig {
  readonly compilerOptions: CompilerOptions;
  readonly exclude?: readonly string[] | undefined;
}

const isNotString = (value: unknown): value is string =>
  typeof value !== 'string';

export default function assertTSConfig(
  tsConfig: unknown,
): asserts tsConfig is TSConfig {
  if (typeof tsConfig !== 'object' || tsConfig === null) {
    throw new Error('Expected TypeScript configuration to be JSON.', {
      cause: tsConfig,
    });
  }

  if (!('compilerOptions' in tsConfig)) {
    throw new Error(
      'Expected TypeScript configuration to contain compiler options.',
      { cause: tsConfig },
    );
  }

  const { compilerOptions } = tsConfig;
  assertCompilerOptions(compilerOptions);

  if (
    'exclude' in tsConfig &&
    (!Array.isArray(tsConfig.exclude) || tsConfig.exclude.some(isNotString))
  ) {
    throw new Error(
      'Expected TypeScript configuration to contain exclusions.',
      { cause: tsConfig },
    );
  }
}
