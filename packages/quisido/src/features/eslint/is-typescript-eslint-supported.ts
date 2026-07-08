import * as ts from 'typescript';

interface TypeScriptCompilerApi {
  readonly Extension?: unknown;
  readonly ModuleKind?: unknown;
}

const TYPESCRIPT: TypeScriptCompilerApi = ts as unknown as TypeScriptCompilerApi;

export const TYPESCRIPT_VERSION: string = ts.version;

export default function isTypeScriptESLintSupported(): boolean {
  return (
    typeof TYPESCRIPT.Extension === 'object' &&
    TYPESCRIPT.Extension !== null &&
    typeof TYPESCRIPT.ModuleKind === 'object' &&
    TYPESCRIPT.ModuleKind !== null
  );
}
