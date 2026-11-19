import mapNumberToIp from './map-number-to-ip.js';

const RADIX = 36;

export default function mapStringToIp(str: string): string {
  const num: number = parseInt(str, RADIX);
  return mapNumberToIp(num);
}
