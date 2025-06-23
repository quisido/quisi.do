import { mapStringToByteLength } from 'fmrs';

const SINGLE = 1;

export default function mapR2BucketValueToBytes(
  value: string | ArrayBuffer | ArrayBufferView | Blob | ReadableStream | null,
): number {
  if (value === null) {
    return SINGLE;
  }

  if (typeof value === 'string') {
    return mapStringToByteLength(value);
  }

  if (value instanceof Blob) {
    return value.size;
  }

  if (value instanceof ReadableStream) {
    throw new Error(
      'Cannot determine size of ReadableStream. Please convert it to a string or ArrayBuffer first.',
    );
  }

  return value.byteLength;
}
