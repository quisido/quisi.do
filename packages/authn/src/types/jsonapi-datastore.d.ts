declare module 'jsonapi-datastore' {
  export class JsonApiDataStore {
    public readonly destroy: (model: JsonApiDataStoreModel) => void;

    public readonly find: (type: string, id: number) => JsonApiDataStoreModel;

    public readonly findAll: (type: string) => readonly JsonApiDataStoreModel[];

    public readonly initModel: (
      type: string,
      id: number,
    ) => JsonApiDataStoreModel;

    public readonly reset: () => void;

    public readonly sync: (data: object) => object;

    public readonly syncRecord: (rec: object) => object;

    public readonly syncWithMeta: (data: object) => object;
  }

  export class JsonApiDataStoreModel {
    public readonly serialize: (() => object) &
      ((options: SerializeOptions) => object);

    public readonly setAttribute: (attrName: string, value: unknown) => void;

    public readonly setRelationship: (
      relName: string,
      models: readonly JsonApiDataStoreModel[],
    ) => void;
  }

  interface SerializeOptions {
    readonly attributes: readonly string[];
    readonly relationships: readonly unknown[];
  }
}
