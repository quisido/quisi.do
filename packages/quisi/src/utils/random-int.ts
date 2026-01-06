export default function randomInt(min: number, max: number): number {
  // eslint-disable-next-line no-magic-numbers
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
