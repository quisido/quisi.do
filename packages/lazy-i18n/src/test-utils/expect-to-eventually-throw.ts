export default async function expectToEventuallyThrow(
  f: () => Promise<void>,
  err: unknown,
): Promise<void> {
  let didThrow = true;
  try {
    await f();
    didThrow = false;
  } catch (actualErr: unknown) {
    expect(actualErr).toBe(err);
  }
  if (!didThrow) {
    throw new Error('Expected function to throw.');
  }
}
