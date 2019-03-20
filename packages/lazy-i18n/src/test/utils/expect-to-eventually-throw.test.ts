/// <reference types="jest" />
import expectToEventuallyThrow from './expect-to-eventually-throw.js';

describe('expectToEventuallyThrow', (): void => {
  it('should throw if its promise function does not', async (): Promise<void> => {
    await expect(async (): Promise<void> => {
      await expectToEventuallyThrow(
        async (): Promise<void> => Promise.resolve(),
        new Error(),
      );
    }).rejects.toThrow('Expected function to throw.');
  });
});
