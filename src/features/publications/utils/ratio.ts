const BASE = 10;
const BASE_POW = 2;
const PERCENT = 100;
const ZERO = 0;

export default function ratio(
  a: number,
  b: number,
  decimals: number = ZERO,
): number {
  return Math.round((a / b) * Math.pow(BASE, BASE_POW + decimals)) / PERCENT;
}
