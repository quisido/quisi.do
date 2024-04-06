const BASE = 16;

export default function mapHexToNumber(hex: string): number {
  return parseInt(hex, BASE);
}
