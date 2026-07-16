// Generates a random integer from [min, max], inclusive.
export default function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
