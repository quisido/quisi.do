import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Feed } from './index.js';

describe('Feed', (): void => {
  it('should be a feed', (): void => {
    const { getByRole } = render(<Feed articles={[]} />);

    getByRole('feed', { name: 'Test feed' });
  });

  // TODO: The feed also lets authors inform assistive technologies when additions and removals are occurring so assistive technologies can more reliably update their reading view without disrupting reading or degrading performance.

  // TODO: Test aria-busy when articles are appending or prepending

  describe('articles', (): void => {
    it('should be focusable', (): void => {
      // TODO
    });
  });
});
