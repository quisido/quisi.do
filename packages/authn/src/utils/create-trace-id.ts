const CHARACTERS = '0123456789abcdefghijklmnopqrstuvwxyz';
const characterCount: number = CHARACTERS.length;

const getRandomCharacter = (): string => {
  const index: number = Math.floor(Math.random() * characterCount);
  return CHARACTERS.charAt(index);
};

export default function createTraceId(): string {
  return new Array(32).fill(null).map(getRandomCharacter).join('');
}
