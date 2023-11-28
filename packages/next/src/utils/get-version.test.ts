/// <reference types="jest" />
import getVersion from './get-version.js';

const setGitHubSha = (value: string): void => {
  process.env['GITHUB_SHA'] = value;
};

const setNodeEnv = (value: string): void => {
  Object.assign(process.env, {
    NODE_ENV: value,
  });
};

describe('getVersion', (): void => {
  afterEach((): void => {
    setNodeEnv('test');
    delete process.env['GITHUB_SHA'];
  });

  it('should be the GitHub SHA', (): void => {
    setGitHubSha('000f3f5e6cc58f5106e5deb9e8caf3be1e1727fe');
    expect(getVersion()).toBe('9at3u3bqugc');

    setGitHubSha('135314872f0151ba911c888df082b9adfe375e11');
    expect(getVersion()).toBe('30mn721728i');
  });

  it('should be "gamma" in production builds', (): void => {
    setNodeEnv('production');
    expect(getVersion()).toBe('gamma');
  });

  it('should be "alpha" in development builds', (): void => {
    setNodeEnv('development');
    expect(getVersion()).toBe('alpha');
  });

  it('should default to "beta"', (): void => {
    expect(getVersion()).toBe('beta');
  });
});
