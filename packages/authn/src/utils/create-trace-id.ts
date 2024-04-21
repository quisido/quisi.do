const HEX = '0123456789abcdef';
const TRACE_ID_LENGTH = 32;

const getRandomHexCharacter = (): string => {
  const index: number = Math.floor(Math.random() * HEX.length);
  return HEX.charAt(index);
};

export default function createTraceId(): string {
  return new Array(TRACE_ID_LENGTH)
    .fill(null)
    .map(getRandomHexCharacter)
    .join('');
}
