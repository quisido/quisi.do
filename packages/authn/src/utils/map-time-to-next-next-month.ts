const FIRST = 1;
const NEXT_NEXT = 1;
const NONE = 0;

export default function mapTimeToNextNextMonth(time: number): number {
  const date = new Date(time);
  return new Date(
    date.getFullYear(),
    date.getMonth() + NEXT_NEXT,
    FIRST,
    NONE,
    NONE,
    NONE,
    NONE,
  ).getTime();
}
