const DEFAULT_LENGTH = 2;

export default function leftPad(
  num: number | string,
  length: number = DEFAULT_LENGTH,
): string {
  if (typeof num === 'number') {
    return leftPad(num.toString(), length);
  }

  if (num.length < length) {
    const zeroes: string = '0'.repeat(length - num.length);
    return `${zeroes}${num}`;
  }

  return num;
}
