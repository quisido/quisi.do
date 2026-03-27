import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Comment } from './index.js';

describe('Comment', (): void => {
  it('should be a comment', (): void => {
    const { getByRole } = render(
      <Comment label="Test comment">Test comment content</Comment>,
    );

    getByRole('comment', { name: 'Test comment' });
  });
});
