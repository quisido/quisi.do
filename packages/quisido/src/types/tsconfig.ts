/** JSON compiler options written by the CLI. */
export interface CompilerOptions {
  readonly declarationDir?: string | undefined;
  readonly jsx?: 'react-jsx' | undefined;
  readonly noEmit?: boolean | undefined;
  readonly outDir?: string | undefined;
  readonly rootDir?: string | undefined;
  readonly skipLibCheck?: boolean | undefined;
  readonly tsBuildInfoFile?: string | undefined;
}

export interface Reference {
  readonly path: string;
  readonly prepend?: boolean | undefined;
}

export default interface TSConfig {
  readonly compilerOptions: CompilerOptions;
  readonly exclude?: string[] | undefined;
  readonly extends?: string | undefined;
  readonly include?: string[] | undefined;
  readonly references?: readonly Reference[] | undefined;
}
