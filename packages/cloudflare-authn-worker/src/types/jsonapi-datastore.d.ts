declare module 'jsonapi-datastore' {
  export default class JsonApiDataStore {
    public readonly find: (type: string, id: number) => JsonApiDataStore;

    public readonly findAll: (type: string) => readonly JsonApiDataStore[];

    public readonly serialize: (() => string) &
      ((options: SerializeOptions) => string);

    public readonly sync: (data: string) => void;

    public readonly syncWithMeta: (data: string) => void;
  }

  interface SerializeOptions {
    readonly attributes: readonly string[];
    readonly relationships: readonly unknown[];
  }
}
