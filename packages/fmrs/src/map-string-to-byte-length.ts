const encoder = new TextEncoder();

export default function mapStringToByteLength(value: string): number {
  return encoder.encode(value).length;
}
