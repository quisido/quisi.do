describe('js', (): void => {
  it('should not throw', async (): Promise<void> => {
    await import('./js.js');
  });
});
