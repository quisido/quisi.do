import type { server } from 'typescript';

export default interface TSConfig {
  readonly compilerOptions: server.protocol.CompilerOptions;
  readonly exclude?: string[] | undefined;
  readonly extends?: string | undefined;
  readonly include?: string[] | undefined;
}
