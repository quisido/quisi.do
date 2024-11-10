const FALSE = 0;
const TRUE = 1;

export default function mapBooleanToNumber(value: boolean): number {
  if (value) {
    return TRUE;
  }

  return FALSE;
}
