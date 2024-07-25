import { Snapshot } from '@quisido/proposal-async-context';

export default async function catchSnapshot<T, U = T>(
  getPromise: () => Promise<T> | T,
  handleError: (err: unknown) => Promise<U> | U,
): Promise<T | U> {
  const snapshot: Snapshot = new Snapshot();
  try {
    return await getPromise();
  } catch (err: unknown) {
    return snapshot.run(handleError, err);
  }
}
