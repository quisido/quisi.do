import OBJECT_TYPE_ERROR from '../constants/object-type-error';

// We must use `object` as a return type here instead of
//   `Record<string, unknown>`, because the parsed value does not have an index
//   signature.
// eslint-disable-next-line @typescript-eslint/ban-types
export default function parseStringifiedObject(str: string): object {
  const parsedStr: unknown = JSON.parse(str);
  if (typeof parsedStr !== 'object' || parsedStr === null) {
    throw OBJECT_TYPE_ERROR;
  }
  return parsedStr;
}
