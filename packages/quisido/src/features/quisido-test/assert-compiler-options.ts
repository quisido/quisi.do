export interface CompilerOptions {
  readonly declarationDir?: string | undefined;
  readonly generateCpuProfile?: string | undefined;
  readonly noEmit?: boolean | undefined;
  readonly outDir?: string | undefined;
  readonly rootDir?: string | undefined;
  readonly tsBuildInfoFile?: string | undefined;
}

export default function assertCompilerOptions(
  compilerOptions: unknown,
): asserts compilerOptions is CompilerOptions | undefined {
  if (compilerOptions === undefined) {
    return;
  }

  if (typeof compilerOptions !== 'object' || compilerOptions === null) {
    throw new Error('Expected TypeScript compiler options to be an object.', {
      cause: compilerOptions,
    });
  }

  // declarationDir
  if (
    'declarationDir' in compilerOptions &&
    typeof compilerOptions.declarationDir !== 'string'
  ) {
    throw new Error(
      'Expected TypeScript declaration directory to be a string.',
      { cause: compilerOptions },
    );
  }

  // generateCpuProfile
  if (
    'generateCpuProfile' in compilerOptions &&
    typeof compilerOptions.generateCpuProfile !== 'string'
  ) {
    throw new Error('Expected TypeScript CPU profile to be a string.', {
      cause: compilerOptions,
    });
  }

  // noEmit
  if (
    'noEmit' in compilerOptions &&
    typeof compilerOptions.noEmit !== 'boolean'
  ) {
    throw new Error(
      'Expected TypeScript `noEmit` compiler option to be a boolean.',
      { cause: compilerOptions },
    );
  }

  // outDir
  if (
    'outDir' in compilerOptions &&
    typeof compilerOptions.outDir !== 'string'
  ) {
    throw new Error('Expected TypeScript output directory to be a string.', {
      cause: compilerOptions,
    });
  }

  // rootDir
  if (
    'rootDir' in compilerOptions &&
    typeof compilerOptions.rootDir !== 'string'
  ) {
    throw new Error('Expected TypeScript root directory to be a string.', {
      cause: compilerOptions,
    });
  }

  // tsBuildInfoFile
  if (
    'tsBuildInfoFile' in compilerOptions &&
    typeof compilerOptions.tsBuildInfoFile !== 'string'
  ) {
    throw new Error('Expected TypeScript cache file to be a string.', {
      cause: compilerOptions,
    });
  }
}
