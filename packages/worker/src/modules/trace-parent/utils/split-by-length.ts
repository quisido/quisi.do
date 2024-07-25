export default function splitByLength(str: string, length: number): string[] {
  const result: string[] = [];
  for (let si = 0; si < str.length; si += length) {
    result.push(str.substring(si, si + length));
  }
  return result;
}
