import { describe, expect, it } from 'vitest';
import render from './render.js';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Comment } = await importTestedDesignSystem();

describe('Comment', (): void => {
  it('should be a comment', (): void => {
    const { getByName } = render(
      <Comment label="Test comment">Test comment content</Comment>,
    );

    const comment: HTMLElement = getByName('comment', 'Test comment');
    expect(comment).toHaveTextContent('Test comment content');
  });

  it('should support replies as semantic descendants', (): void => {
    const { getByName, getRoleCount } = render(
      <Comment label="Parent comment">
        Parent comment content
        <Comment label="Reply comment">Reply comment content</Comment>
      </Comment>,
    );

    const parentComment: HTMLElement = getByName('comment', 'Parent comment');
    const replyComment: HTMLElement = getByName('comment', 'Reply comment');
    expect(parentComment).toContainElement(replyComment);
    expect(getRoleCount('comment')).toBe(2);
  });

  it('should support explicit paginated hierarchy metadata', (): void => {
    const { getByName } = render(
      <Comment label="Paginated reply" level={3} positionInSet={2} setSize={5}>
        Paginated reply content
      </Comment>,
    );

    const comment: HTMLElement = getByName('comment', 'Paginated reply');
    expect(comment).toHaveAttribute('aria-level', '3');
    expect(comment).toHaveAttribute('aria-posinset', '2');
    expect(comment).toHaveAttribute('aria-setsize', '5');
  });

  it('should defer missing hierarchy metadata to user agents', (): void => {
    const { getByName } = render(
      <Comment label="Implicit hierarchy">Implicit hierarchy content</Comment>,
    );

    const comment: HTMLElement = getByName('comment', 'Implicit hierarchy');
    expect(comment).not.toHaveAttribute('aria-level');
    expect(comment).not.toHaveAttribute('aria-posinset');
    expect(comment).not.toHaveAttribute('aria-setsize');
  });
});
