export default function mapEntryToKey<T>([key]: readonly [T, unknown]): T {
  return key;
}
