import type { CompilerOptions } from 'typescript/unstable/proto';

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
