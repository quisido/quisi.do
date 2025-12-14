const CUBED = 3;
const INCREMENT = 1;
const MAX = 128;
const QUARTED = 4;
const SQUARED = 2;

let num = 0;
export default function createIp(): string {
  num += INCREMENT;
  const first = num % MAX ** QUARTED;
  const second: number = num % MAX ** CUBED;
  const third: number = num % MAX ** SQUARED;
  const fourth: number = num % MAX;
  return `${first.toString()}.${second.toString()}.${third.toString()}.${fourth.toString()}`;
}
