import expect from 'expect';
import getVersion from './get-version';

describe('getVersion', (): void => {
  afterEach((): void => {
    delete process.env.REACT_APP_GITHUB_SHA;
  });

  it('should return the REACT_APP_GITHUB_SHA environment variable', (): void => {
    process.env.REACT_APP_GITHUB_SHA =
      '000f3f5e6cc58f5106e5deb9e8caf3be1e1727fe';
    expect(getVersion()).toBe('9at3u3bqugc');

    process.env.REACT_APP_GITHUB_SHA =
      '135314872f0151ba911c888df082b9adfe375e11';
    expect(getVersion()).toBe('30mn721728i');
  });

  it('should be `alpha` in development mode', (): void => {
    expect(getVersion()).toBe('alpha');
  });
});
