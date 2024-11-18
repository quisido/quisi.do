const FIRST = 0;
const ID_COUNT = 4;
const MAX_ADDRESS = 255;

export default function mapNumberToIp(num: number): string {
  const address: number[] = [];

  for (let index = FIRST; index < ID_COUNT; index++) {
    address.unshift(Math.floor(num / MAX_ADDRESS ** index) % MAX_ADDRESS);
  }

  return address.join('.');
}
