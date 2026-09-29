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

export default interface CodeWorkspace {
  readonly folders: readonly Folder[];
  readonly settings: Record<string, JsonSerializable>;
}
