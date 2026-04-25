export default function toChecked(
  value: boolean | 'mixed',
): boolean | undefined {
  if (value === 'mixed') {
    return;
  }

  return value;
}
