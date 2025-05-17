import { afterEach, describe, expect, it } from 'vitest';
import getVersion from './get-version.js';

const setGitHubSha = (value: string | undefined): void => {
  Object.assign(import.meta.env, {
    GITHUB_SHA: value,
  });
};

const setNodeEnv = (value: string): void => {
  Object.assign(import.meta.env, {
    NODE_ENV: value,
  });
};

const unsetGitHubSha = (): void => {
  // @ts-expect-error `env` uses readonly properties for runtime code.
  delete import.meta.env.GITHUB_SHA;
};

describe('getVersion', (): void => {
  afterEach((): void => {
    unsetGitHubSha();
    setNodeEnv('test');
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
