const LAST_TWO = -2;
const START = 0;

export default function mapStringToShorten2Characters(str: string): string {
  return str.slice(START, str.length + LAST_TWO);
}
