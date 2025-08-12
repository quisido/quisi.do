export type PartialReadonlyRecord<
  K extends string | number | symbol,
  V,
> = Partial<Readonly<Record<K, V>>>;
