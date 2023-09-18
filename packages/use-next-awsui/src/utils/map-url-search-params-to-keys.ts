export default function mapUrlSearchParamsToKeys(
  urlSearchParams: Readonly<URLSearchParams>,
): string[] {
  const keys: string[] = [];

  urlSearchParams.forEach((_value: string, key: string): void => {
    keys.push(key);
  });

  return keys;
}
