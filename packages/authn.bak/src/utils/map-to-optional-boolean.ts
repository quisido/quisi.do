export default function mapToOptionalBoolean(
  value: unknown,
): boolean | undefined {
  if (typeof value !== 'boolean') {
    return;
  }

  return value;
}
