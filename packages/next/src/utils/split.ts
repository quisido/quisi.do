export default function split(
  value: string,
  delimeter: string,
): [string, ...(string | undefined)[]] {
  const [first, ...rest] = value.split(delimeter);
  return [first!, ...rest];
}
