export default function createRandomNumberGenerator(
  min: number,
  max: number,
): () => number {
  return function getRandomNumber(): number {
    return Math.floor(Math.random() * (max - min)) + min;
  };
}
