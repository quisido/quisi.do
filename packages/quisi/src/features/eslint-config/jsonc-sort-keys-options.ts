export default interface JsoncSortKeysOption {
  readonly allowLineSeparatedGroups?: boolean | undefined;
  readonly order:
    | JsoncSortKeysOrderOption
    | readonly (JsoncSortKeysOrder | string)[];
  readonly pathPattern: string;
}

export interface JsoncSortKeysOrder {
  readonly keyPattern?: string | undefined;
  readonly order: JsoncSortKeysOrderOption;
}

export interface JsoncSortKeysOrderOption {
  readonly type: 'asc' | 'desc';
}
