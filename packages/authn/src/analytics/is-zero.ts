const ZERO = 0;

export default function isZero(value: unknown): value is 0 {
  return value === ZERO;
}

export const findZero = isZero;
