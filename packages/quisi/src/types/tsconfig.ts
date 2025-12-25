import type { CompilerOptions } from 'typescript';

export default interface TSConfig {
  readonly compilerOptions: CompilerOptions;
  readonly exclude?: string[] | undefined;
  readonly extends?: string | undefined;
  readonly include?: string[] | undefined;
}
