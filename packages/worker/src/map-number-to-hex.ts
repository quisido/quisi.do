const HEXADECIMAL = 16;
const SINGLE = 1;

export default function mapNumberToHex(num: number): string {
  const str: string = num.toString(HEXADECIMAL);

  if (str.length === SINGLE) {
    return `0${str}`;
  }

  return str;
}
