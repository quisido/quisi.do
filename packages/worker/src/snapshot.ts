import { Snapshot } from '@quisido/proposal-async-context';

export default async function snapshot<P, A extends readonly unknown[], R>(
  promise: Promise<P>,
  handler: (value: P, ...args: A) => R,
  ...args: A
): Promise<R> {
  const snapshot: Snapshot = new Snapshot();
  const value: P = await promise;
  return snapshot.run(handler, value, ...args);
}
