describe('ts', (): void => {
  it('should not throw', async (): Promise<void> => {
    await import('./ts.js');
  });
});
