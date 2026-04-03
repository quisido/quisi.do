const encoder = new TextEncoder();

/**
 * Returns the UTF-8 byte length of a string.
 *
 * @example
 * mapStringToByteLength('hello');
 */
export default function mapStringToByteLength(value: string): number {
  return encoder.encode(value).length;
}
