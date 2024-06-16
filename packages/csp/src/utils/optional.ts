const isKeyOf = <T extends object>(
  key: number | string | symbol,
  obj: T,
): key is keyof T => key in obj;

export default function optional<K extends number | string | symbol, V>(
  obj: object,
  key: K,
  validator: (value: unknown) => value is V,
): obj is Record<K, V | undefined> {
  if (!isKeyOf(key, obj)) {
    return true;
  }

  return validator(obj[key]);
}
