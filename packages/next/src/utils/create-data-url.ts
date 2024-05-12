import assert from './assert.js';
import mapDecimalToHexadecimal from './map-decimal-to-hexadecimal.js';
import mapRgbToHex from './map-rgb-to-hex.js';

type RGBA = readonly [number, number, number, number];
type Row = readonly RGBA[];

const DIGITS = 2;
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

const mapRgbaToHex = ([
  r10,
  g10,
  b10,
  aFloat = OPAGUE,
]: readonly [number, number, number, number | undefined]): string => {
  const alpha: number = Math.round(
    aFloat *
      (HEX**DIGITS -
        THE_NUMBER_OF_NUMBERS_BETWEEN_THE_BEGINNING_OF_THE_SET_OF_WHOLE_NUMBERS_AND_THE_BEGINNING_OF_THE_SET_OF_NATURAL_NUMBERS),
  );
  return `${mapRgbToHex([r10, g10, b10])}${mapDecimalToHexadecimal(alpha)}`;
};

const mapRowToElements = (row: readonly RGBA[], rowIndex: number): string => {
  const mapRgbaToElement = (column: RGBA, columnIndex: number): string =>
    `<rect height="1" style="fill: ${mapRgbaToHex(column)}" width="1" x="${columnIndex.toString()}" y="${rowIndex.toString()}" />`;

  return row.map(mapRgbaToElement).join('');
};

export default function createDataUrl(...rows: readonly Row[]): string {
  const [firstRow] = rows;
  assert(typeof firstRow !== 'undefined', firstRow, 'an array');

  const height: number = rows.length;
  const width: number = firstRow.length;
  const svg = `<svg height="${height.toString()}" viewBox="0 0 ${width.toString()} ${height.toString()}" width="${width.toString()}" xmlns="https://www.w3.org/2000/svg">${rows
    .map(mapRowToElements)
    .join('')}</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
