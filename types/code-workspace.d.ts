declare module '*.code-workspace' {
  interface CodeWorkspace {
    readonly folders: readonly Folder[];
    readonly settings: Record<string, JsonSerializable>;
  }

  interface Folder {
    readonly path: string;
  }

  type JsonSerializable =
    | JsonSerializable[]
    | { [key: string]: JsonSerializable }
    | boolean
    | null
    | number
    | string;

  const codeWorkspace: CodeWorkspace;
  export default codeWorkspace;
}
