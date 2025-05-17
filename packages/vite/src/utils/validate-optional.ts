export default function validateOptional<T>(
  validator: (value: unknown, contexts: readonly string[]) => T,
): (value: unknown, contexts: readonly string[]) => T | undefined {
  return (value: unknown, contexts: readonly string[]): T | undefined => {
    if (typeof value === 'undefined') {
      return;
    }

    return validator(value, contexts);
  };
}
