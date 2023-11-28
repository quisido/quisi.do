const reduceDictEntriesToRecord = <T>(
  record: Record<string, T>,
  [key, value]: [string, T | undefined],
): Record<string, T> => {
  if (typeof value === 'undefined') {
    return record;
  }

  return {
    ...record,
    [key]: value,
  };
};

export default function mapDictToRecord<T>(dict: NodeJS.Dict<T>): Record<string, T> {
  return Object.entries(dict).reduce(reduceDictEntriesToRecord, {});
}
