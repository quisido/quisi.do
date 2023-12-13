import mapDecimalToHexadecimal from './map-decimal-to-hexadecimal';
import mapRgbToHex from './map-rgb-to-hex';

type RGBA = readonly [number, number, number, number];
type Row = readonly RGBA[];

const DIGITS = 2;
const FIRST = 0;
const HEX = 16;
const OPAGUE = 1;

/**
 *   Two hexadecimal digits can represent 256 values. These values are denoted
 * by 00 through FF, the equivalent of 0 through 255 in decimal. The number of
 * possible values (256) is a natural number, while the possible values
 * themselves (0-255) are whole numbers.
 *  The number of numbers between the beginning of the set of whole numbers and
 * the beginning of the set of natural numbers is 1. That one number is 0.
 */
const THE_BEGINNING_OF_THE_SET_OF_NATURAL_NUMBERS = 1;
const THE_BEGINNING_OF_THE_SET_OF_WHOLE_NUMBERS = 0;
const THE_NUMBER_OF_NUMBERS_BETWEEN_THE_BEGINNING_OF_THE_SET_OF_WHOLE_NUMBERS_AND_THE_BEGINNING_OF_THE_SET_OF_NATURAL_NUMBERS: number =
  Math.abs(
    THE_BEGINNING_OF_THE_SET_OF_NATURAL_NUMBERS -
      THE_BEGINNING_OF_THE_SET_OF_WHOLE_NUMBERS,
  );

const mapRgbaToHex = (
  r10: number,
  g10: number,
  b10: number,
  aFloat: number = OPAGUE,
): string => {
  const a: number = Math.round(
    aFloat *
      (Math.pow(HEX, DIGITS) -
        THE_NUMBER_OF_NUMBERS_BETWEEN_THE_BEGINNING_OF_THE_SET_OF_WHOLE_NUMBERS_AND_THE_BEGINNING_OF_THE_SET_OF_NATURAL_NUMBERS),
  );
  return `${mapRgbToHex([r10, g10, b10])}${mapDecimalToHexadecimal(a)}`;
};

const mapRowToElements = (row: readonly RGBA[], rowIndex: number): string => {
  const mapRgbaToElement = (column: RGBA, columnIndex: number): string => {
    return `<rect height="1" style="fill: ${mapRgbaToHex(
      ...column,
    )}" width="1" x="${columnIndex}" y="${rowIndex}" />`;
  };

  return row.map(mapRgbaToElement).join('');
};

export default function createDataUrl(...rows: readonly Row[]): string {
  const height: number = rows.length;
  const width: number = rows[FIRST].length;

  const svg = `<svg height="${height}" viewBox="0 0 ${width} ${height}" width="${width}" xmlns="http://www.w3.org/2000/svg">${rows
    .map(mapRowToElements)
    .join('')}</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
