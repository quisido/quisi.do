import mapDecimalToHexadecimal from './map-decimal-to-hexadecimal.js';

export default function mapRgbToHex(
  rgb: readonly [number, number, number],
): string {
  return `#${rgb.map(mapDecimalToHexadecimal).join('')}`;
}
