/* eslint-disable no-magic-numbers */

const MAX_HEX = 255;
const MAX_HUE = 359;

const hslToRgb = (
  hue: number,
  saturation: number,
  lightness: number,
): [number, number, number] => {
  const magicK = (magicN: number) => (magicN + hue / 30) % 12;
  const magicA: number = saturation * Math.min(lightness, 1 - lightness);
  const magicF = (magicN: number) =>
    lightness -
    magicA *
      Math.max(
        -1,
        Math.min(Math.min(magicK(magicN) - 3, 9 - magicK(magicN)), 1),
      );
  return [
    Math.round(MAX_HEX * magicF(0)),
    Math.round(MAX_HEX * magicF(8)),
    Math.round(MAX_HEX * magicF(4)),
  ];
};

export default function createPrefixColors(total: number): string[] {
  const step = MAX_HUE / total;
  return new Array(total).fill(null).map((_: null, index: number): string => {
    const hue: number = Math.round(step * index);
    const [red, green, blue] = hslToRgb(hue, 0.5, 0.5);
    return `#${[red, green, blue]
      .map((hex: number): string => hex.toString(16).padStart(2, '0'))
      .join('')
      .toUpperCase()}`;
  });
}
