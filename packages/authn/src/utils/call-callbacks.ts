export default function callCallbacks<A extends readonly unknown[]>(
  callbacks: readonly ((...args: A) => void)[],
  ...args: A
): void {
  for (const callback of callbacks) {
    callback(...args);
  }
}
