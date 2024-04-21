/// <reference types="jest" />

export default async function expectToEventuallyThrow(
  fn: () => Promise<void>,
  err: unknown,
): Promise<void> {
  let didThrow = true;
  try {
    await fn();
    didThrow = false;
  } catch (actualErr: unknown) {
    expect(actualErr).toBe(err);
  }
  if (!didThrow) {
    throw new Error('Expected function to throw.');
  }
}
