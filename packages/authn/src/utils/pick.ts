export default function pick<T, K extends keyof T>(key: K): (t: T) => T[K] {
  return function mapObjectToValue(t: T): T[K] {
    return t[key];
  };
}
