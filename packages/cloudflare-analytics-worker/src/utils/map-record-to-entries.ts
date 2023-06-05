const filterByDefinedValues = <T>(
  entry: [string, T | undefined],
): entry is [string, T] => {
  const [, value] = entry;
  return typeof value !== 'undefined';
};

export default function mapRecordToEntries<T>(
  record: Record<string, T | undefined>,
): readonly [string, T][] {
  return Object.entries(record).filter(filterByDefinedValues);
}
