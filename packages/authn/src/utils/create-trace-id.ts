const HEX = '0123456789abcdef';

const getRandomHexCharacter = (): string => {
  const index: number = Math.floor(Math.random() * HEX.length);
  return HEX.charAt(index);
};

export default function createTraceId(): string {
  return new Array(32).fill(null).map(getRandomHexCharacter).join('');
}
