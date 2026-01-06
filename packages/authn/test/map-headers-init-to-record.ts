import { mapEntriesToRecord } from 'fmrs';

export default function mapHeadersInitToRecord(
  init: HeadersInit,
): Record<string, string> {
  if (init instanceof Headers) {
    return mapEntriesToRecord([...init.entries()]);
  }

  if (Symbol.iterator in init) {
    throw new Error('Iterable HeadersInit not supported');
  }

  return init;
}
