const HEXADECIMAL_BASE = 16;
const LENGTH = 32;

export default function mapNumberToSentryEventId(num: number): string {
  const hexadecimal: string = num.toString(HEXADECIMAL_BASE);
  const prefixLength: number = LENGTH - hexadecimal.length;
  const prefix: string = '0'.repeat(prefixLength);
  return `${prefix}${hexadecimal}`;
}
