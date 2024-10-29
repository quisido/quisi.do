export default function isEmptyString(value: unknown): value is '' {
  return value === '';
}

export const findEmptyString = isEmptyString;
