const BASE = 10;

export default function safeParseInt(value: string): number {
  const int: number = parseInt(value, BASE);
  if (!isNaN(int)) {
    return int;
  }

  throw new Error(`Expected an integer but received: ${value}`, {
    cause: value,
  });
}
