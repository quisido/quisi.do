import { mapStringToByteLength } from 'fmrs';

export default function mapKVNamespaceValueToBytes(
  value: string | ArrayBuffer | ArrayBufferView | ReadableStream,
): number {
  if (typeof value === 'string') {
    return mapStringToByteLength(value);
  }

  if (value instanceof ReadableStream) {
    throw new Error(
      'Cannot determine size of ReadableStream. Please convert it to a string or ArrayBuffer first.',
    );
  }

  return value.byteLength;
}
