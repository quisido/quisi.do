import { describe, it } from 'vitest';
import render from './render.js';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Comment } = await importTestedDesignSystem();

describe('Comment', (): void => {
  it('should be a comment', (): void => {
    const { getByName } = render(
      <Comment label="Test comment">Test comment content</Comment>,
    );

    getByName('comment', 'Test comment');
  });
});
