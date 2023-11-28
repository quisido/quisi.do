const HEXADECIMAL_BASE = 16;
const LENGTH = 32;

export default function mapNumberToSentryEventId(n: number): string {
  const hexadecimal: string = n.toString(HEXADECIMAL_BASE);
  const prefixLength: number = LENGTH - hexadecimal.length;
  const prefix: string = '0'.repeat(prefixLength);
  return `${prefix}${hexadecimal}`;
}
