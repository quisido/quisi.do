const BASE = 10;

export default function round(n: number, decimals: number): number {
  const pow: number = Math.pow(BASE, decimals);
  return Math.round(n * pow) / pow;
}
