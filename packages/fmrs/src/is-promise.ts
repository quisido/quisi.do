export default function isPromise(value: unknown): value is Promise<unknown> {
  return value instanceof Promise;
}
