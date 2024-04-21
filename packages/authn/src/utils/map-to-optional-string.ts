export default function mapToOptionalString(
  value: unknown,
): string | undefined {
  if (typeof value !== 'string') {
    return;
  }

  return value;
}
