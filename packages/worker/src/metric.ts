export type Metric = Record<'name', string> &
  Partial<Record<string, number | string>>;
