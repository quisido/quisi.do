describe('d.ts', (): void => {
  it('should not throw', async (): Promise<void> => {
    await import('./dts.js');
  });
});
