import { describe, expect, it } from 'vitest';
import mapGitHubShaToVersion from './map-github-sha-to-version.js';

describe('mapGitHubShaToVersion', (): void => {
  it('should convert to base 36 and strip trailing zeros', (): void => {
    expect(
      mapGitHubShaToVersion('000f3f5e6cc58f5106e5deb9e8caf3be1e1727fe'),
    ).toBe('9at3u3bqugc');

    expect(
      mapGitHubShaToVersion('135314872f0151ba911c888df082b9adfe375e11'),
    ).toBe('30mn721728i');
  });
});
