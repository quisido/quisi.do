const BASE = 10;

export default function round(num: number, decimals: number): number {
  const pow: number = BASE ** decimals;
  return Math.round(num * pow) / pow;
}
