const DEFAULT_LENGTH = 2;

export default function leftPad(
  num: number | string,
  length: number = DEFAULT_LENGTH,
): string {
  if (typeof num === 'number') {
    return leftPad(n.toString(), length);
  }

  if (num.length < length) {
    const zeroes: string = '0'.repeat(length - n.length);
    return `${zeroes}${num}`;
  }

  return num;
}
