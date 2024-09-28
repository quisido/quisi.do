import { Snapshot } from '@quisido/proposal-async-context';

export default async function snapshot<T, P, A extends readonly unknown[], R>(
  this: T,
  promise: Promise<P>,
  handler: (this: T, value: P, ...args: A) => R,
  ...args: A
): Promise<R> {
  const snapshot: Snapshot = new Snapshot();
  const value: P = await promise;
  return snapshot.run((): R => {
    return handler.call(this, value, ...args);
  });
}
