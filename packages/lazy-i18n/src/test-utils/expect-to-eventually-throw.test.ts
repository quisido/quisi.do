import expectToEventuallyThrow from "./expect-to-eventually-throw.js";

describe('expectToEventuallyThrow', (): void => {
  it('should throw if its promise function does not', async (): Promise<void> => {
    await expect(async (): Promise<void> => {
      const TEST_ERROR: Error = new Error();
      expectToEventuallyThrow((): Promise<void> => Promise.reject(TEST_ERROR), TEST_ERROR);
    }).rejects.toThrowError();
  });
});
