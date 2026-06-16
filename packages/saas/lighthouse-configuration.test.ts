import { describe, expect, it } from 'vitest';
import lighthouseConfigSource from './lighthouse.config.ts?raw';

describe('Lighthouse config', (): void => {
  it('should block LogRocket requests that fail during CI audits', (): void => {
    expect(lighthouseConfigSource).toContain('https://r.logr-in.com/*');
  });
});
