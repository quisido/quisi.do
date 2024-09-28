const CUBED = 3;
const MAX = 128;
let n = 0;
const QUARTED  = 4;
const SQUARED = 2;

export default function createIp(): string {
  ++n;
  const first: number = n % Math.pow(MAX, QUARTED);
  const second: number = n % Math.pow(MAX, CUBED);
  const third: number = n % Math.pow(MAX, SQUARED);
  const fourth: number = n % MAX;
  return `${first}.${second}.${third}.${fourth}`;
}
