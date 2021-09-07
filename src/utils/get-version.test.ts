import getVersion from './get-version';

describe('getVersion', (): void => {
  afterEach((): void => {
    delete process.env.REACT_APP_VERSION;
  });

  it('should return the REACT_APP_VERSION environment variable', (): void => {
    process.env.REACT_APP_VERSION = '1.0.0';
    expect(getVersion()).toBe('1.0.0');
  });

  it('should end in -alpha in development mode', (): void => {
    expect(getVersion()).toMatch(/-alpha$/);
  });
});
