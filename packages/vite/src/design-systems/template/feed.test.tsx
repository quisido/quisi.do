import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Feed } from './index.js';

describe('Feed', (): void => {
  it('should support labels', (): void => {
    const { getByRole } = render(<Feed articles={[]} label="Test label" />);

    getByRole('feed', { name: 'Test label' });
  });

  it('should support labelled by', (): void => {
    const { getByRole } = render(
      <>
        <span id="test-id">Test labelled by</span>
        <Feed articles={[]} labelledBy="test-id" />
      </>,
    );

    getByRole('feed', { name: 'Test labelled by' });
  });

  // TODO: The feed also lets authors inform assistive technologies when additions and removals are occurring so assistive technologies can more reliably update their reading view without disrupting reading or degrading performance.

  // TODO: Test aria-busy when articles are appending or prepending

  describe('articles', (): void => {
    it('should be focusable', (): void => {
      // TODO
    });
  });
});
