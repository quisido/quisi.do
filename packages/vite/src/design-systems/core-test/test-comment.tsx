import { render } from '@testing-library/react';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { CommentProps } from '../core/comment-props.js';

export default function testComment(
  Comment: ComponentType<CommentProps>,
): void {
  describe('Comment', (): void => {
    it('should be a comment', (): void => {
      const { getByRole } = render(
        <Comment label="Test comment">Test comment content</Comment>,
      );

      getByRole('comment', { name: 'Test comment' });
    });
  });
}
