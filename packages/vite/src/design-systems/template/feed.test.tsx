import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Feed } from './index.js';

describe('Feed', (): void => {
  it('should be a feed', (): void => {
    const { getByRole } = render(<Feed label="Test feed">Test content</Feed>);

    getByRole('feed', { name: 'Test feed' });
  });

  // TODO: The feed also lets authors inform assistive technologies when additions and removals are occurring so assistive technologies can more reliably update their reading view without disrupting reading or degrading performance.

  // TODO: When articles are added or removed from either or both ends of a feed, authors SHOULD set aria-busy to true on the feed element before the changes are made and set it to false after the changes are complete.
});
