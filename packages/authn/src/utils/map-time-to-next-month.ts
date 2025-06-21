const FIRST = 1;
const INCREMENT = 1;
const NONE = 0;

export default function mapTimeToNextMonth(time: number): number {
  const date = new Date(time);
  return new Date(
    date.getFullYear(),
    date.getMonth() + INCREMENT,
    FIRST,
    NONE,
    NONE,
    NONE,
    NONE,
  ).getTime();
}
