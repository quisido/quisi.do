interface Serializable<T> {
  readonly serialize: () => T;
}
export default function serialize<T>(obj: Serializable<T>): T {
  return obj.serialize();
}
