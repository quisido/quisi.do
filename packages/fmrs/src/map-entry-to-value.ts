export default function mapEntryToValue<T>([, value]: readonly [
  unknown,
  T,
]): T {
  return value;
}
