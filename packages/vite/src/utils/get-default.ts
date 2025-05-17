interface DefaultExport<T> {
  readonly default: T;
}

export default function getDefault<T>({
  default: defaultExport,
}: DefaultExport<T>): T {
  return defaultExport;
}
