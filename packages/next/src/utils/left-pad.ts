const DEFAULT_LENGTH = 2;

export default function leftPad(
  n: number | string,
  length: number = DEFAULT_LENGTH,
): string {
  if (typeof n === 'number') {
    return leftPad(n.toString(), length);
  }

  if (n.length < length) {
    const zeroes: string = '0'.repeat(length - n.length);
    return `${zeroes}${n}`;
  }

  return n;
}
