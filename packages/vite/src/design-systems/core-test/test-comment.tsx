import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { CommentProps } from '../core/comment-props.js';
import render from './render.js';

export default function testComment(
  Comment: ComponentType<CommentProps>,
): void {
  describe('Comment', (): void => {
    it('should be a comment', (): void => {
      const { getByName } = render(
        <Comment label="Test comment">Test comment content</Comment>,
      );

      getByName('comment', 'Test comment');
    });
  });
}
