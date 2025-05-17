const DIGITS = 2;
const HEX = 16;

export default function mapDecimalToHexadecimal(decimal: number): string {
  return decimal.toString(HEX).padStart(DIGITS, '0');
}
